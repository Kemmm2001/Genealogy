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
        const familyMembers = await queryDatabase(memberIDs);
        const memberIdToIndexMap = await createMemberIdToIndexMap(familyMembers);

        const educations = await queryEducationDatabase(memberIDs);
        const jobs = await queryJobDatabase(memberIDs);
        const contacts = await queryContactDatabase(memberIDs);
        const marriages = await queryMarriageDatabase(memberIDs);

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


async function queryDatabase( memberIDs) {
    return new Promise((resolve, reject) => {
        const query = `SELECT MemberID, FatherID, MotherID, MemberName, NickName, BirthOrder, Origin, NationalityID, ReligionID, Dob, LunarDob, BirthPlace, IsDead, Dod, LunarDod, PlaceOfDeath, GraveSite, Note, Generation, BloodType, Male, Image, RoleID FROM genealogy.familymember WHERE MemberID IN (${memberIDs.join(',')})`;

        db.connection.query(query, (err, rows) => {
            if (err) {
                console.error(`Lỗi truy vấn bảng familymember`, err);
                reject({ error: `Lỗi truy vấn bảng familymember`, originalError: err });
            } else {
                resolve(rows);
            }
        });
    });
}

async function queryContactDatabase(memberIDs) {
    return new Promise((resolve, reject) => {
        const query = `SELECT MemberID, Address, Phone, Email, FacebookUrl, Zalo FROM genealogy.contact WHERE MemberID IN (${memberIDs.join(',')})`;
        db.connection.query(query, (err, rows) => {
            if (err) {
                console.error('Lỗi truy vấn bảng genealogy.contact:', err);
                reject({ error: 'Lỗi truy vấn bảng genealogy.contact', originalError: err });
            } else {
                resolve(rows);
            }
        });
    });
}

async function queryEducationDatabase(memberIDs) {
    return new Promise((resolve, reject) => {
        const query = `SELECT MemberID, School, Description, StartDate, EndDate FROM genealogy.education WHERE MemberID IN (${memberIDs.join(',')})`;
        db.connection.query(query, (err, rows) => {
            if (err) {
                console.error('Lỗi truy vấn bảng genealogy.education:', err);
                reject({ error: 'Lỗi truy vấn bảng genealogy.education', originalError: err });
            } else {
                resolve(rows);
            }
        });
    });
}

async function queryJobDatabase(memberIDs) {
    return new Promise((resolve, reject) => {
        const query = `SELECT MemberID, Organization, OrganizationAddress, Role, JobName, StartDate, EndDate FROM genealogy.job WHERE MemberID IN (${memberIDs.join(',')})`;
        db.connection.query(query, (err, rows) => {
            if (err) {
                console.error('Lỗi truy vấn bảng genealogy.job:', err);
                reject({ error: 'Lỗi truy vấn bảng genealogy.job', originalError: err });
            } else {
                resolve(rows);
            }
        });
    });
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

async function queryMarriageDatabase(memberIDs) {
    return new Promise((resolve, reject) => {
        const query = `SELECT husbandID, wifeID,CodeID,MarriageNumber 
                FROM marriage WHERE husbandID IN (${memberIDs.join(',')}) OR wifeID IN (${memberIDs.join(',')})`;
        db.connection.query(query, (err, rows) => {
            if (err) {
                console.error('Error querying table marriage:', err);
                reject({ error: 'Error querying table marriage', originalError: err });
            } else {
                resolve(rows);
            }
        });
    });
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


async function importData(file, codeID) {
    try {
        const workbook = new Excel.Workbook();
        await workbook.xlsx.readFile(file);

        const familyWorksheet = workbook.getWorksheet('Family Member Data');
        const contactWorksheet = workbook.getWorksheet('Contact Data');
        const educationWorksheet = workbook.getWorksheet('Education Data');
        const jobWorksheet = workbook.getWorksheet('Job Data');

        let arrayInsert = await insertDataToTable(familyWorksheet, 'genealogy.familymember', codeID)
        console.log("arr :" + arrayInsert)

        await insertDataToTable2(contactWorksheet, 'genealogy.contact', arrayInsert)
        await insertDataToTable2(educationWorksheet, 'genealogy.education', arrayInsert)
        await insertDataToTable2(jobWorksheet, 'genealogy.job', arrayInsert)
        await insertDataToTableMarriage(workbook.getWorksheet('Marriage Data'), 'genealogy.marriage', arrayInsert)

        return true;
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
        let columnsToInsert = headers.filter(header => header !== 'MemberID');
        columnsToInsert.push('CodeID')
        console.log(columnsToInsert)
        let queries = [];
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
            formattedValues.push(codeID)

            const query = `INSERT INTO ${tableName} (${columnsToInsert.join(',')}) VALUES (${formattedValues.join(',')})`;

            if (isFamilyMemberTable) {
                queries.push(query);
                console.log(query)
                // Lưu ánh xạ MemberID và index tương ứng
                memberIDIndexMap[row.values[1]] = rowNumber;
            } else {
                queries.push(query);
            }
        }
        let arrayInsert = []
        // Thực hiện chèn vào database
        const results = await Promise.all(queries.map(query =>
            queryWithPromise(query)
                .then(result => {
                    arrayInsert.push(result.insertId);
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


        return arrayInsert;
    } catch (error) {
        console.error('Error inserting data into table', tableName, error);
        throw error;
    }
}


async function insertDataToTable2(worksheet, tableName, insertArr) {
    try {
        // Khai báo biến headers là mảng các tiêu đề cột lấy từ hàng 1 của worksheet
        const headers = worksheet.getRow(1).values;
        // Khai báo biến columnsToInsert là mảng các tiêu đề cột khác rỗng
        const columnsToInsert = headers.filter(header => header !== '');
        // Khai báo mảng trống để chứa các câu lệnh INSERT
        const queries = [];
        // Khai báo mảng trống để chứa dữ liệu các hàng
        const worksheetData = [];
        // In ra mảng các tiêu đề cột cần insert
        console.log("Column to insert : " + columnsToInsert)
        // Duyệt từ hàng 2 đến hàng cuối cùng
        for (let rowNumber = 2; rowNumber <= worksheet.rowCount; rowNumber++) {
            // Lấy dữ liệu hàng hiện tại
            let row = worksheet.getRow(rowNumber);
            // Khai báo mảng để chứa dữ liệu đã định dạng của hàng
            let formattedValues = [];
            // In ra độ dài mảng headers
            console.log("header length : " + headers.length)
            // Duyệt từ cột 1 đến cột cuối cùng
            for (let i = 1; i <= headers.length - 1; i++) {
                // Lấy giá trị của ô hiện tại
                let cellValue = row.getCell(i).value;
                // Khai báo biến chứa giá trị đã định dạng
                let formattedValue = '';
                // Kiểm tra giá trị ô
                // Nếu null hoặc rỗng thì gán là NULL
                if (cellValue === null || cellValue === '') {
                    formattedValue = 'NULL';
                    // Nếu là chuỗi thì thêm dấu nháy kép
                } else if (typeof cellValue === 'string') {
                    formattedValue = `'${cellValue.replace(/'/g, "''")}'`;
                    // Nếu là ngày thì định dạng ngày
                } else if (cellValue instanceof Date) {
                    let formattedDate = `${cellValue.getFullYear()}-${(cellValue.getMonth() + 1).toString().padStart(2, '0')}-${cellValue.getDate().toString().padStart(2, '0')}`;
                    formattedValue = `'${formattedDate}'`;
                    // Ngược lại giữ nguyên giá trị
                } else {
                    formattedValue = cellValue;
                }
                // Thêm giá trị đã định dạng vào mảng
                formattedValues.push(formattedValue);
            }
            // In ra mảng giá trị đã định dạng
            console.log("formattedValues : " + formattedValues)
            // Thêm mảng giá trị đã định dạng của hàng vào mảng chứa dữ liệu
            worksheetData.push(formattedValues);
        }
        // In ra mảng chứa dữ liệu đã định dạng
        console.log("worksheetData : " + worksheetData)
        // In ra độ dài mảng chứa dữ liệu
        console.log("worksheetData length: " + worksheetData.length)
        // Duyệt mảng chứa dữ liệu
        for (let j = 0; j < worksheetData.length; j++) {
            // Duyệt mảng chứa các giá trị index cần insert
            for (let k = 0; k < insertArr.length; k++) {
                // Nếu giá trị index đầu tiên của hàng = vị trí trong mảng insert
                if (worksheetData[j][0] == (k + 1)) {
                    // Gán giá trị tại vị trí đó trong mảng insert thay cho index
                    worksheetData[j][0] = insertArr[k];
                    // Thoát vòng lặp for k
                    break;
                }
            }

        }
        console.log("columnsToInsert : " + columnsToInsert)
        console.log("worksheetData : " + worksheetData)
        // Construct and push the INSERT query
        for (let k = 0; k < worksheetData.length; k++) {
            let query = `INSERT INTO ${tableName} (${columnsToInsert}) VALUES (${worksheetData[k]})`;
            console.log("query: " + query);
            queries.push(query);

        }
        // Thực hiện chèn vào cơ sở dữ liệu
        let results = await Promise.all(queries.map(query =>
            queryWithPromise(query)
                .then(result => {
                    return result;
                })
                .catch(error => {
                    console.error("Error inserting row:", error);
                    throw error;
                })
        ));

        return { results };
    } catch (error) {
        console.error('Error inserting data into table', tableName, error);
    }
}


async function updateFatherMotherID(codeID) {
    try {

        const memberIDIndexMap = await createMemberIDIndexMap(codeID);
        console.log(memberIDIndexMap)
        const databaseMembers = await queryFamilyMembers(codeID);
        databaseMembers.forEach((member, index) => {
            const dbMemberID = member['MemberID'];
            memberIDIndexMap[index + 1] = dbMemberID;
        });

        const updateQueries = [];

        databaseMembers.forEach((member, index) => {
            const dbMemberID = member['MemberID'];
            const newMemberID = memberIDIndexMap[index + 1];

            const fatherID = member['FatherID'];
            const motherID = member['MotherID'];

            if (fatherID !== null && memberIDIndexMap[fatherID]) {
                const newFatherID = memberIDIndexMap[fatherID];
                const fatherUpdateQuery = `UPDATE genealogy.familymember SET FatherID = ${newFatherID} WHERE MemberID = ${newMemberID}`;
                updateQueries.push(fatherUpdateQuery);
            }

            if (motherID !== null && memberIDIndexMap[motherID]) {
                const newMotherID = memberIDIndexMap[motherID];
                const motherUpdateQuery = `UPDATE genealogy.familymember SET MotherID = ${newMotherID} WHERE MemberID = ${newMemberID}`;
                updateQueries.push(motherUpdateQuery);
            }
        });
        console.log("Execute update queries")
        // Execute update queries
        await Promise.all(updateQueries.map(query =>
            queryWithPromise(query)
                .then(result => {
                    return result;
                })
                .catch(error => {
                    console.error("Error updating row:", error);
                    throw error;
                })
        ));

        console.log('FatherID and MotherID updated successfully.');

    } catch (error) {
        console.error('Error updating Family Member IDs:', error);
        throw error;
    }
}

async function insertDataToTableMarriage(worksheet, tableName, insertArr) {
    try {
        console.log("Bắt đầu insert marriage")
        // Khai báo biến headers là mảng các tiêu đề cột lấy từ hàng 1 của worksheet
        const headers = worksheet.getRow(1).values;
        // Khai báo biến columnsToInsert là mảng các tiêu đề cột khác rỗng
        const columnsToInsert = headers.filter(header => header !== '');
        // Khai báo mảng trống để chứa các câu lệnh INSERT
        const queries = [];
        // Khai báo mảng trống để chứa dữ liệu các hàng
        const worksheetData = [];
        // In ra mảng các tiêu đề cột cần insert
        console.log("Column to insert : " + columnsToInsert)
        // Duyệt từ hàng 2 đến hàng cuối cùng
        for (let rowNumber = 2; rowNumber <= worksheet.rowCount; rowNumber++) {
            // Lấy dữ liệu hàng hiện tại
            let row = worksheet.getRow(rowNumber);
            // Khai báo mảng để chứa dữ liệu đã định dạng của hàng
            let formattedValues = [];
            // In ra độ dài mảng headers
            console.log("header length : " + headers.length)
            // Duyệt từ cột 1 đến cột cuối cùng
            for (let i = 1; i <= headers.length - 1; i++) {
                // Lấy giá trị của ô hiện tại
                let cellValue = row.getCell(i).value;
                // Khai báo biến chứa giá trị đã định dạng
                let formattedValue = '';
                // Kiểm tra giá trị ô
                // Nếu null hoặc rỗng thì gán là NULL
                if (cellValue === null || cellValue === '') {
                    formattedValue = 'NULL';
                    // Nếu là chuỗi thì thêm dấu nháy kép
                } else if (typeof cellValue === 'string') {
                    formattedValue = `'${cellValue.replace(/'/g, "''")}'`;
                    // Nếu là ngày thì định dạng ngày
                }
                else {
                    formattedValue = cellValue;
                }
                // Thêm giá trị đã định dạng vào mảng
                formattedValues.push(formattedValue);
            }
            // In ra mảng giá trị đã định dạng
            console.log("formattedValues : " + formattedValues)
            // Thêm mảng giá trị đã định dạng của hàng vào mảng chứa dữ liệu
            worksheetData.push(formattedValues);
        }
        // In ra mảng chứa dữ liệu đã định dạng
        console.log("worksheetData : " + worksheetData)
        // In ra độ dài mảng chứa dữ liệu
        console.log("worksheetData length: " + worksheetData.length)
        // Duyệt mảng chứa dữ liệu
        for (let j = 0; j < worksheetData.length; j++) {
            // Duyệt mảng chứa các giá trị index cần insert
            for (let k = 0; k < insertArr.length; k++) {
                // Nếu giá trị index đầu tiên của hàng = vị trí trong mảng insert
                if (worksheetData[j][0] == (k + 1)) {
                    // Gán giá trị tại vị trí đó trong mảng insert thay cho index
                    worksheetData[j][0] = insertArr[k];
                    // Thoát vòng lặp for k
                    break;
                }
            }

        }
        // Duyệt mảng chứa dữ liệu
        for (let j = 0; j < worksheetData.length; j++) {
            // Duyệt mảng chứa các giá trị index cần insert
            for (let k = 0; k < insertArr.length; k++) {
                // Nếu giá trị index đầu tiên của hàng = vị trí trong mảng insert
                if (worksheetData[j][1] == (k + 1)) {
                    // Gán giá trị tại vị trí đó trong mảng insert thay cho index
                    worksheetData[j][1] = insertArr[k];
                    // Thoát vòng lặp for k
                    break;
                }
            }

        }
        console.log("columnsToInsert : " + columnsToInsert)
        console.log("worksheetData : " + worksheetData)
        // Construct and push the INSERT query
        for (let k = 0; k < worksheetData.length; k++) {
            let query = `INSERT INTO ${tableName} (${columnsToInsert}) VALUES (${worksheetData[k]})`;
            console.log("query: " + query);
            queries.push(query);

        }
        // Thực hiện chèn vào cơ sở dữ liệu
        let results = await Promise.all(queries.map(query =>
            queryWithPromise(query)
                .then(result => {
                    return result;
                })
                .catch(error => {
                    console.error("Error inserting row:", error);
                    throw error;
                })
        ));

        return { results };
    }
    catch (error) {
        console.error('Error inserting data into table', tableName, error);
    }
}


// Hàm truy vấn danh sách Family Members sau khi đã insert
async function queryFamilyMembers(codeID) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT MemberID, FatherID, MotherID FROM genealogy.familymember where CodeID = ? Order by MemberID';

        db.connection.query(query, [codeID], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

async function createMemberIDIndexMap(codeID) {
    const memberIDIndexMap = {};
    const databaseMembers = await queryFamilyMembers(codeID);

    databaseMembers.forEach((member, index) => {
        const dbMemberID = member['MemberID'];
        memberIDIndexMap[index + 1] = dbMemberID;
    });

    return memberIDIndexMap;
}
module.exports = { exportData, clearTree, importData, createMemberIdToIndexMap, queryContactDatabase, queryMarriageDatabase };
