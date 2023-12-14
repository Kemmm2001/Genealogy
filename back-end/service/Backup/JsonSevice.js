const db = require("../../Models/ConnectDB");
const Excel = require('exceljs');
const { v4: uuidv4 } = require('uuid');
async function exportData(memberIDs) {
    try {
        const familyMembers = await queryDatabase('genealogy.familymember', memberIDs);
        const educations = await queryDatabase('genealogy.education', memberIDs);
        const jobs = await queryDatabase('genealogy.job', memberIDs);
        const contacts = await queryDatabase('genealogy.contact', memberIDs);
        const marriages = await queryDatabase('genealogy.marriage', memberIDs);

        const workbook = new Excel.Workbook();
        await addDataToSheet(workbook, 'Family Member Data', familyMembers);
        await addDataToSheet(workbook, 'Education Data', educations);
        await addDataToSheet(workbook, 'Job Data', jobs);
        await addDataToSheet(workbook, 'Contact Data', contacts);
        await addDataToSheet(workbook, 'Marriage Data', marriages);

        const fileName = `/uploads/excel/Backup/all_members_${uuidv4()}.xlsx`;
        await workbook.xlsx.writeFile(fileName);
        console.log(`Tất cả dữ liệu đã được xuất thành công vào file ${fileName}`);

        return { success: true, fileName: fileName };
    } catch (error) {
        console.error('Lỗi khi xử lý dữ liệu:', error);
        throw error;
    }
}

async function addDataToSheet(workbook, sheetName, data) {
    const worksheet = workbook.addWorksheet(sheetName);

    if (data.length > 0) {
        const headers = Object.keys(data[0]);
        worksheet.addRow(headers);

        data.forEach(row => {
            const rowValues = headers.map(header => {
                // Check if the current value is a Date object
                if (row[header] instanceof Date) {
                    // Format the date as yyyy-mm-dd
                    const year = row[header].getFullYear();
                    const month = `${row[header].getMonth() + 1}`.padStart(2, '0');
                    const day = `${row[header].getDate()}`.padStart(2, '0');
                    return `${year}-${month}-${day}`;
                }
                return row[header];
            });
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


async function importData(file, codeID) {
    try {
        const workbook = new Excel.Workbook();
        await workbook.xlsx.readFile(file);

        const familyWorksheet = workbook.getWorksheet('Family Member Data');

        const truncatePromises = [];
        for (let rowNumber = 2; rowNumber <= familyWorksheet.rowCount; rowNumber++) {
            const row = familyWorksheet.getRow(rowNumber);
            const values = row.values;
            const memberID = values[1];
            const truncatePromise = truncateTablesForMember(memberID);
            truncatePromises.push(truncatePromise);
        }

        const truncateResults = await Promise.all(truncatePromises);
        const allTruncatesSuccessful = truncateResults.every(result => result);

        if (!allTruncatesSuccessful) {
            return false;
        }

        const insertPromises = [
            insertDataToTable(familyWorksheet, 'genealogy.familymember'),
            insertDataToTable(workbook.getWorksheet('Contact Data'), 'genealogy.contact'),
            insertDataToTable(workbook.getWorksheet('Education Data'), 'genealogy.education'),
            insertDataToTable(workbook.getWorksheet('Job Data'), 'genealogy.job'),
            insertDataToTable(workbook.getWorksheet('Marriage Data'), 'genealogy.marriage')
        ];

        const insertResults = await Promise.all(insertPromises);
        const allInsertsSuccessful = insertResults.every(result => result.every(res => res));

        if (!allInsertsSuccessful) {
            return false;
        }

        const codeIDFromExcel = familyWorksheet.getRow(2).getCell(22).value;
        if (codeIDFromExcel === codeID) {
            const updateCodeIDPromises = [];
            for (let rowNumber = 2; rowNumber <= familyWorksheet.rowCount; rowNumber++) {
                const row = familyWorksheet.getRow(rowNumber);
                const values = row.values;
                const memberID = values[1];
                const updatePromise = updateCodeIDForMember(memberID, codeID);
                updateCodeIDPromises.push(updatePromise);
            }

            const updateResults = await Promise.all(updateCodeIDPromises);
            const allUpdatesSuccessful = updateResults.every(result => result);

            return allUpdatesSuccessful;
        }

        return allInsertsSuccessful;
    } catch (error) {
        console.error('Lỗi khi xử lý dữ liệu:', error);
        throw error;
    }
}



async function insertDataToTable(worksheet, tableName) {
    try {
        const headers = worksheet.getRow(1).values.filter(header => header !== '');

        const queries = [];

        for (let rowNumber = 2; rowNumber <= worksheet.rowCount; rowNumber++) {
            const row = worksheet.getRow(rowNumber);
            const formattedValues = [];

            for (let i = 1; i <= headers.length; i++) {
                const cellValue = row.getCell(i).value;
                let formattedValue = '';

                if (cellValue === null || cellValue === '') {
                    formattedValue = 'NULL';
                } else if (typeof cellValue === 'string') {
                    // Escape single quotes in string values
                    formattedValue = `'${cellValue.replace(/'/g, "''")}'`;
                } else if (cellValue instanceof Date) {
                    const formattedDate = `${cellValue.getFullYear()}-${(cellValue.getMonth() + 1).toString().padStart(2, '0')}-${cellValue.getDate().toString().padStart(2, '0')}`;
                    formattedValue = `'${formattedDate}'`;
                }
                else {
                    formattedValue = cellValue;
                }

                formattedValues.push(formattedValue);
            }

            const query = `INSERT INTO ${tableName} (${headers.join(',')}) VALUES (${formattedValues.join(',')})`;
            console.log(query)
            queries.push(query);
        }

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

        return results;
    } catch (error) {
        console.error('Error inserting data into table', tableName, error);
        throw error;
    }
}


module.exports = { exportData, clearTree, importData };
