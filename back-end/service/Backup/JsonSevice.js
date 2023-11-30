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

async function importData(file) {
    try {
        // Mở file excel
        const workbook = new Excel.Workbook();
        await workbook.xlsx.readFile(file.path);

        // Xóa dữ liệu hiện có từ các bảng
        await truncateTables(['familymember', 'contact', 'education', 'job']);

        // Đọc dữ liệu từ file excel và insert vào các bảng
        await insertDataToTable(workbook.getWorksheet('Family Member Data'), 'familymember');
        await insertDataToTable(workbook.getWorksheet('Contact Data'), 'contact');
        await insertDataToTable(workbook.getWorksheet('Education Data'), 'education');
        await insertDataToTable(workbook.getWorksheet('Job Data'), 'job');

        return { success: true };
    } catch (error) {
        console.error('Lỗi khi xử lý dữ liệu:', error);
        throw error;
    }
}

async function truncateTables(tableNames) {
    for (const tableName of tableNames) {
         db.connection.query(`TRUNCATE TABLE ${tableName}`);
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
