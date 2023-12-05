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

        const promises = [];

        familyWorksheet.eachRow(async (row, rowNumber) => {
            if (rowNumber > 1) {
                const values = row.values;
                const memberID = values[1];
                await truncateTablesForMember(memberID);
            }
        });

        promises.push(insertDataToTable(familyWorksheet, 'familymember'));
        promises.push(insertDataToTable(contactWorksheet, 'contact'));
        promises.push(insertDataToTable(educationWorksheet, 'education'));
        promises.push(insertDataToTable(jobWorksheet, 'job'));

        // Chờ cho tất cả các promises hoàn thành
        await Promise.all(promises);

        return { success: true };
    } catch (error) {
        console.error('Lỗi khi xử lý dữ liệu:', error);
        throw error;
    }
}


async function insertDataToTable(worksheet, tableName) {
    const headers = worksheet.getRow(1).values.filter(header => header !== ''); // Lấy các headers từ hàng đầu tiên và loại bỏ các header trống

    for (let rowNumber = 2; rowNumber <= worksheet.rowCount; rowNumber++) {
        const row = worksheet.getRow(rowNumber);

        const formattedValues = [];
        for (let i = 1; i <= headers.length; i++) {
            const cellValue = row.getCell(i).value;
            let formattedValue = '';

            // Kiểm tra và xử lý các giá trị để đảm bảo đúng cú pháp trong câu truy vấn SQL
            if (cellValue === null || cellValue === '') {
                formattedValue = 'NULL';
            } else if (typeof cellValue === 'string') {
                formattedValue = `'${cellValue.replace(/'/g, "''")}'`;
            } else {
                formattedValue = cellValue;
            }

            formattedValues.push(formattedValue);
        }

        const query = `INSERT INTO ${tableName} (${headers.join(',')}) VALUES (${formattedValues.join(',')})`;
        console.log(query)
        try {
            // Thực hiện truy vấn SQL bằng await để đảm bảo thứ tự chạy của các truy vấn
            const results = await new Promise((resolve, reject) => {
                db.connection.query(query, (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });
            console.log("Inserted row:", results); // Log kết quả của việc chèn dòng dữ liệu
        } catch (error) {
            console.error("Error inserting row:", error); // Bắt lỗi nếu có lỗi xảy ra khi chèn dữ liệu
        }
    }
}


module.exports = { exportData, importData };
