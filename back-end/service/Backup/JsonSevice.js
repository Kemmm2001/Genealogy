const db = require("../../Models/ConnectDB");
const Excel = require('exceljs');

async function exportData(memberIDs) {
    try {
        const familyMembers = await queryDatabase('genealogy.familymember', memberIDs);
        const educations = await queryDatabase('genealogy.education', memberIDs);
        const jobs = await queryDatabase('genealogy.job', memberIDs);
        const contacts = await queryDatabase('genealogy.contact', memberIDs);

        const workbook = new Excel.Workbook();
        await addDataToSheet(workbook, 'Family Member Data', familyMembers);
        await addDataToSheet(workbook, 'Education Data', educations);
        await addDataToSheet(workbook, 'Job Data', jobs);
        await addDataToSheet(workbook, 'Contact Data', contacts);

        const fileName = `all_members_data.xlsx`;
        await workbook.xlsx.writeFile(fileName);
        console.log(`Tất cả dữ liệu đã được xuất thành công vào file ${fileName}`);

        return { success: true };
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
            const rowValues = headers.map(header => row[header]);
            worksheet.addRow(rowValues);
        });
    }
}

async function queryDatabase(tableName, memberIDs) {
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
    const tableNames = ['familymember', 'contact', 'education', 'job'];
    for (const tableName of tableNames) {
        await queryWithPromise(`DELETE FROM ${tableName} WHERE memberID = ?`, [memberID]);
    }
}

async function importData(file) {
    try {
        // Mở file excel
        const workbook = new Excel.Workbook();
        await workbook.xlsx.readFile(file);

        // Đọc dữ liệu từ file excel và insert vào các bảng
        const familyWorksheet = workbook.getWorksheet('Family Member Data');
        const contactWorksheet = workbook.getWorksheet('Contact Data');
        const educationWorksheet = workbook.getWorksheet('Education Data');
        const jobWorksheet = workbook.getWorksheet('Job Data');

        familyWorksheet.eachRow(async (row, rowNumber) => {
            if (rowNumber > 1) {
                const values = row.values;
                const memberID = values[1];
                await truncateTablesForMember(memberID);

               
            }
        });

        //  await insertDataToTable(familyWorksheet, 'familymember');
        //  await insertDataToTable(contactWorksheet, 'contact');
        //  await insertDataToTable(educationWorksheet, 'education');
        //  await insertDataToTable(jobWorksheet, 'job');

        return { success: true };
    } catch (error) {
        console.error('Lỗi khi xử lý dữ liệu:', error);
        throw error;
    }
}


async function insertDataToTable(worksheet, tableName) {
    const headers = worksheet.getRow(1).values; // Assumed headers are in the first row

    worksheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) {
            const values = row.values;
            const query = `INSERT INTO ${tableName} (${headers.join(',')}) VALUES (${values.map(v => typeof v === 'string' ? `'${v}'` : v).join(',')})`;
            db.connection.query(query);
        }
    });
}

module.exports = { exportData, importData };
