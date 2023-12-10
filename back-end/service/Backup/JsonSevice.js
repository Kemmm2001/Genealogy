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

    await queryWithPromise('DELETE FROM marriage WHERE husbandID = ? OR wifeID = ?', [memberID, memberID]);

    const tableNames = ['familymember', 'contact', 'education', 'job'];
    for (const tableName of tableNames) {
        await queryWithPromise(`DELETE FROM ${tableName} WHERE memberID = ?`, [memberID]);
    }
}
async function importData(file) {
    try {
        const workbook = new Excel.Workbook();
        await workbook.xlsx.readFile(file);

        const familyWorksheet = workbook.getWorksheet('Family Member Data');
        const promises = [];

        // Truncate tables for each member before insertion
        familyWorksheet.eachRow(async (row, rowNumber) => {
            if (rowNumber > 1) {
                const values = row.values;
                const memberID = values[1];
                const truncatePromise = truncateTablesForMember(memberID);
                promises.push(truncatePromise);
            }
        });

        // Wait for all truncate operations to complete
        await Promise.all(promises);

        // Insert data to tables
        const insertPromises = [
            insertDataToTable(familyWorksheet, 'genealogy.familymember'),
            insertDataToTable(workbook.getWorksheet('Contact Data'), 'genealogy.contact'),
            insertDataToTable(workbook.getWorksheet('Education Data'), 'genealogy.education'),
            insertDataToTable(workbook.getWorksheet('Job Data'), 'genealogy.job'),
            insertDataToTable(workbook.getWorksheet('Marriage Data'), 'genealogy.marriage')
        ];

        // Wait for all insert operations to complete
        await Promise.all(insertPromises);

        return { success: true };
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


module.exports = { exportData, importData };
