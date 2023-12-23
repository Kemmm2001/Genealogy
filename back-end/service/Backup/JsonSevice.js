const db = require("../../Models/ConnectDB");
const Excel = require('exceljs');
const { v4: uuidv4 } = require('uuid');

async function createMemberIdToIndexMap(familyMembers) {
    let memberIdToIndex = {};

    familyMembers.forEach((row, index) => {
        memberIdToIndex[row['MemberID']] = index + 1;
    });

    return memberIdToIndex;
}
async function exportData(memberIDs) {
    try {
        const familyMembers = await queryDatabase('genealogy.familymember', memberIDs);
        const memberIdToIndexMap = await createMemberIdToIndexMap(familyMembers);

        const educations = await queryDatabase('genealogy.education', memberIDs);
        const jobs = await queryDatabase('genealogy.job', memberIDs);
        const contacts = await queryDatabase('genealogy.contact', memberIDs);
        const marriages = await queryDatabase('genealogy.marriage', memberIDs);

        const workbook = new Excel.Workbook();
        await addDataToSheet(workbook, 'Family Member Data', familyMembers, memberIdToIndexMap);
        await addDataToSheet(workbook, 'Education Data', educations, memberIdToIndexMap);
        await addDataToSheet(workbook, 'Job Data', jobs, memberIdToIndexMap);
        await addDataToSheet(workbook, 'Contact Data', contacts, memberIdToIndexMap);
        await addDataToSheet(workbook, 'Marriage Data', marriages, memberIdToIndexMap);

        const fileName = `/uploads/excel/Backup/all_members_${uuidv4()}.xlsx`;
        await workbook.xlsx.writeFile(fileName);
        console.log(`Tất cả dữ liệu đã được xuất thành công vào file ${fileName}`);

        return { success: true, fileName: fileName };
    } catch (error) {
        console.error('Lỗi khi xử lý dữ liệu:', error);
        throw error;
    }
}

async function addDataToSheet(workbook, sheetName, data, memberIdToIndexMap) {
    const worksheet = workbook.addWorksheet(sheetName);

    if (data.length > 0) {
        const headers = Object.keys(data[0]);
        worksheet.addRow(headers);


        data.forEach((row, index) => {
            const rowIndex = index + 1;
            const rowValues = headers.map(header => {
                // Kiểm tra nếu giá trị hiện tại là một đối tượng Date
                if (typeof row[header] === 'object' && row[header] instanceof Date) {
                    // Format ngày thành chuỗi 'yyyy-mm-dd'
                    const year = row[header].getFullYear();
                    const month = `${row[header].getMonth() + 1}`.padStart(2, '0');
                    const day = `${row[header].getDate()}`.padStart(2, '0');
                    return `${year}-${month}-${day}`;
                }
                return row[header];
            });

            if (sheetName === 'Family Member Data') {

                rowValues[headers.indexOf('MemberID')] = rowIndex;

                if (row['FatherID'] && memberIdToIndexMap[row['FatherID']]) {
                    rowValues[headers.indexOf('FatherID')] = memberIdToIndexMap[row['FatherID']];
                }
                if (row['MotherID'] && memberIdToIndexMap[row['MotherID']]) {
                    rowValues[headers.indexOf('MotherID')] = memberIdToIndexMap[row['MotherID']];

                }

            } else if (sheetName === 'Marriage Data') {
                if (row['husbandID'] && memberIdToIndexMap[row['husbandID']]) {
                    rowValues[headers.indexOf('husbandID')] = memberIdToIndexMap[row['husbandID']];
                }
                if (row['wifeID'] && memberIdToIndexMap[row['wifeID']]) {
                    rowValues[headers.indexOf('wifeID')] = memberIdToIndexMap[row['wifeID']];
                }
            } else {
                if (row['MemberID'] && memberIdToIndexMap[row['MemberID']]) {
                    rowValues[headers.indexOf('MemberID')] = memberIdToIndexMap[row['MemberID']];
                }
            }
            worksheet.addRow(rowValues);
        });
    }
}


async function queryDatabase(tableName, memberIDs) {
    if (tableName === 'genealogy.marriage') {
        // Construct a query to fetch marriages related to the provided memberIDs
        const query = `SELECT * FROM ${tableName} WHERE husbandID IN (${memberIDs.join(',')}) OR wifeID IN (${memberIDs.join(',')})`;

        return new Promise((resolve, reject) => {
            db.connection.query(query, (err, rows) => {
                if (err) {
                    console.error(`Lỗi truy vấn bảng ${tableName}:`, err);
                    reject({ error: `Lỗi truy vấn bảng ${tableName}`, originalError: err });
                } else {
                    resolve(rows);
                }
            });
        });
    } else {
        // For other tables, maintain the original query logic
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM ${tableName} WHERE MemberID IN (${memberIDs.join(',')})`;

            db.connection.query(query, (err, rows) => {
                if (err) {
                    console.error(`Lỗi truy vấn bảng ${tableName}:`, err);
                    reject({ error: `Lỗi truy vấn bảng ${tableName}`, originalError: err });
                } else {
                    resolve(rows);
                }
            });
        });
    }
}


function queryWithPromise(query, params = []) {
    return new Promise((resolve, reject) => {
        db.connection.query(query, params, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

async function truncateTablesForMember(memberID) {
    try {
        await queryWithPromise('DELETE FROM marriage WHERE husbandID = ? OR wifeID = ?', [memberID, memberID]);

        const tableNames = ['familymember', 'contact', 'education', 'job'];
        let successCount = 0; // Tạo biến đếm

        for (const tableName of tableNames) {
            const result = await queryWithPromise(`DELETE FROM ${tableName} WHERE memberID = ?`, [memberID]);
            console.log(`Deleted from ${tableName}. Result:`, result);

            if (result.affectedRows > 0) {
                successCount++; // Tăng biến đếm nếu có hàng bị xóa
            }
        }

        // Nếu không có bảng nào cần xóa, trả về false
        if (successCount === 0) {
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error truncating tables for member:', error);
        throw error;
    }
}

async function clearTree(memberIDs) {
    try {
        const truncatePromises = [];

        // Loop through each member ID to truncate tables
        for (const memberID of memberIDs) {
            const truncatePromise = truncateTablesForMember(memberID);
            truncatePromises.push(truncatePromise);
        }

        // Wait for all truncate operations to complete
        const results = await Promise.all(truncatePromises);

        // Kiểm tra kết quả từ mỗi lời hứa
        for (const result of results) {
            if (!result) {
                return false; // Nếu một bảng không xóa được, trả về false
            }
        }
        return true; // Nếu tất cả đều xóa thành công
    } catch (error) {
        console.error('Error clearing tables:', error);
        throw error;
    }
}

async function updateCodeIDForMember(memberID, newCodeID) {
    try {
        const updateResult = await queryWithPromise('UPDATE genealogy.familymember SET codeID = ? WHERE memberID = ?', [newCodeID, memberID]);
        console.log('Updated codeID for memberID in familymember table:', updateResult);

        return updateResult !== null && updateResult !== undefined; // Kiểm tra xem truy vấn đã thành công không
    } catch (error) {
        console.error('Error updating codeID for member in familymember table:', error);
        throw error;
    }
}


async function importData(file) {
    try {
        const workbook = new Excel.Workbook();
        await workbook.xlsx.readFile(file);

        const familyWorksheet = workbook.getWorksheet('Family Member Data');
        const codeIDFromExcel = familyWorksheet.getRow(2).getCell(22).value;
        const insertPromises = [
            insertDataToTable(familyWorksheet, 'genealogy.familymember', codeIDFromExcel),
            // insertDataToTable(workbook.getWorksheet('Contact Data'), 'genealogy.contact'),
            // insertDataToTable(workbook.getWorksheet('Education Data'), 'genealogy.education'),
            // insertDataToTable(workbook.getWorksheet('Job Data'), 'genealogy.job'),
            // insertDataToTable(workbook.getWorksheet('Marriage Data'), 'genealogy.marriage')
        ]

        const insertResults = await Promise.all(insertPromises);
        const allInsertsSuccessful = insertResults.every(result => result.every(res => res));

        if (!allInsertsSuccessful) {
            return false;
        }
        console.log(allInsertsSuccessful)
        return allInsertsSuccessful;
    } catch (error) {
        console.error('Lỗi khi xử lý dữ liệu:', error);
        throw error;
    }
}



async function insertDataToTable(worksheet, tableName, codeID) {
    try {
        const headers = worksheet.getRow(1).values.filter(header => header !== '');
        const isFamilyMemberTable = tableName === 'genealogy.familymember';

        // Lấy danh sách các cột cần chèn ngoại trừ cột MemberID
        const columnsToInsert = headers.filter(header => header !== 'MemberID');

        const queries = [];
        const memberIDIndexMap = {}; // Ánh xạ MemberID và index tương ứng

        for (let rowNumber = 2; rowNumber <= worksheet.rowCount; rowNumber++) {
            const row = worksheet.getRow(rowNumber);
            const formattedValues = [];

            for (let i = 1; i <= headers.length; i++) {
                // Bỏ qua cột MemberID khi tạo giá trị format
                if (headers[i - 1] !== 'MemberID') {
                    const cellValue = row.getCell(i).value;
                    let formattedValue = '';

                    if (cellValue === null || cellValue === '') {
                        formattedValue = 'NULL';
                    } else if (typeof cellValue === 'string') {
                        formattedValue = `'${cellValue.replace(/'/g, "''")}'`;
                    } else if (cellValue instanceof Date) {
                        const formattedDate = `${cellValue.getFullYear()}-${(cellValue.getMonth() + 1).toString().padStart(2, '0')}-${cellValue.getDate().toString().padStart(2, '0')}`;
                        formattedValue = `'${formattedDate}'`;
                    } else {
                        formattedValue = cellValue;
                    }

                    formattedValues.push(formattedValue);
                }
            }

            const query = `INSERT INTO ${tableName} (${columnsToInsert.join(',')}) VALUES (${formattedValues.join(',')})`;

            if (isFamilyMemberTable) {
                queries.push(query);

                // Lưu ánh xạ MemberID và index tương ứng
                memberIDIndexMap[row.values[1]] = rowNumber;
            } else {
                queries.push(query);
            }
        }

        // Thực hiện chèn vào database
        const results = await Promise.all(queries.map(query =>
            queryWithPromise(query)
                .then(result => {
                    console.log("Inserted row:", result);
                    return result;
                })
                .catch(error => {
                    console.error("Error inserting row:", error);
                    throw error;
                })
        ));

        // Nếu là bảng familymember, thực hiện cập nhật FatherID và MotherID
        if (isFamilyMemberTable) {
            // Thực hiện cập nhật FatherID và MotherID
            await updateFatherMotherID(codeID);
        }

        return results;
    } catch (error) {
        console.error('Error inserting data into table', tableName, error);
        throw error;
    }
}


async function updateFatherMotherID(codeID) {
    try {
        const memberIDIndexMap = {};

        // Get database MemberIDs after inserting from Excel
        const databaseMembers = await queryFamilyMembers(codeID);
        console.log('databaseMembers: ' + JSON.stringify(databaseMembers, null, 2))

        // Create a map between Excel index and Database MemberID
        databaseMembers.forEach((member, index) => {
            let dbMemberID = member['MemberID'];
            console.log('dbMemberID: ' + dbMemberID)
            memberIDIndexMap[index + 1] = dbMemberID; // Assuming the database index starts from 1
        });

        console.log('memberIDIndexMap: ' + JSON.stringify(memberIDIndexMap, null, 2))


        // Update FatherID and MotherID in the database using Excel's MemberID
        const updateQueries = [];

        databaseMembers.forEach((member, index) => {
            const dbMemberID = member['MemberID'];
            const newMemberID = memberIDIndexMap[index + 1];

            const fatherID = member['FatherID'];
            const motherID = member['MotherID'];

            if (fatherID !== null && memberIDIndexMap[fatherID]) {
                const newFatherID = memberIDIndexMap[fatherID];
                const fatherUpdateQuery = `UPDATE genealogy.familymember SET FatherID = ${newFatherID} WHERE MemberID = ${newMemberID}`;
                console.log('fatherUpdateQuery: ' + fatherUpdateQuery)
                updateQueries.push(fatherUpdateQuery);
            }

            if (motherID !== null && memberIDIndexMap[motherID]) {
                const newMotherID = memberIDIndexMap[motherID];
                const motherUpdateQuery = `UPDATE genealogy.familymember SET MotherID = ${newMotherID} WHERE MemberID = ${newMemberID}`;
                updateQueries.push(motherUpdateQuery);
            }
        });

        // Execute update queries
        // await Promise.all(updateQueries.map(query =>
        //     queryWithPromise(query)
        //         .then(result => {
        //             console.log("Updated row:", result);
        //             return result;
        //         })
        //         .catch(error => {
        //             console.error("Error updating row:", error);
        //             throw error;
        //         })
        // ));

        // console.log('FatherID and MotherID updated successfully.');

    } catch (error) {
        console.error('Error updating Family Member IDs:', error);
        throw error;
    }
}



// Hàm truy vấn danh sách Family Members sau khi đã insert
async function queryFamilyMembers(codeID) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT MemberID, FatherID, MotherID FROM genealogy.familymember where CodeID = ? Order By  MemberID';

        db.connection.query(query, [codeID], (error, results) => {
            if (error) {
                reject(error);
            } else {

                console.log("Results: " + JSON.stringify(results, null, 2))
                resolve(results);
            }
        });
    });
}


module.exports = { exportData, clearTree, importData, createMemberIdToIndexMap };