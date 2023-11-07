const { promises } = require('nodemailer/lib/xoauth2');
const db = require('../../Models/ConnectDB')

function getAllEvent(CodeID) {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM eventfamily where CodeID = ${CodeID}`;
        db.connection.query(query, (err, result) => {
            if (err) {
                console.log(err)
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

async function getListPhone(ListMemberID) {
    let ListPhone = [];
    return new Promise((resolve, reject) => {
        let count = 0; // Biến đếm để theo dõi số truy vấn đã hoàn thành
        for (let i = 0; i < ListMemberID.length; i++) {
            let query = `SELECT Phone FROM genealogy.contact
            where MemberID = ${ListMemberID[i]}`;
            db.connection.query(query, (err, result) => {
                if (!err && result.length > 0 && result[0].Phone != null) {
                    ListPhone.push(result[0].Phone);
                }
                count++;
                if (count === ListMemberID.length) {                   
                    resolve(ListPhone);
                }
            });
        }
    });
}

async function InsertNewEvent(objData) {
    let query = `INSERT INTO eventfamily (EventName,CodeID,Status,StartDate,EndDate, Description, IsImportant, Note,Place, RepeatID,IsSolarCalendar,eventfamilycol)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    let values = [
        objData.EventName,
        objData.CodeID,
        objData.Status,
        objData.StartDate,
        objData.EndDate,
        objData.Description,
        objData.IsImportant,
        objData.Note,
        objData.Place,
        objData.RepeatID,
        objData.IsSolarCalendar,
        objData.eventfamilycol,
    ]
    db.connection.query(query, values, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Insert Successfully");
        }
    })
}

async function UpdateEvent(objData) {
    let query = `UPDATE eventfamily SET EventName = ?, Status = ?, StartDate = ?, EndDate = ?, Description = ?,IsImportant = ?, Note = ?, Place = ?, 
    RepeatID = ?, IsSolarCalendar = ?, eventfamilycol = ? WHERE EventID = ?`;
    let values = [
        objData.EventName,
        objData.Status,
        objData.StartDate,
        objData.EndDate,
        objData.Description,
        objData.IsImportant,
        objData.Note,
        objData.Place,
        objData.RepeatID,
        objData.IsSolarCalendar,
        objData.eventfamilycol,
        objData.EventID,
    ]
    db.connection.query(query, values, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Update successfully")
        }
    })
}
async function RemoveEvent(EventID) {
    let query = `DELETE FROM eventfamily WHERE EventID = ${EventID}`;
    db.connection.query(query, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("remove successfully")
        }
    })
}

function GetBirthDayInMonth(CodeID) {
    return new Promise((resolve, reject) => {
        let currentDate = new Date();
        let currentMonth = currentDate.getMonth() + 1;
        let query = `SELECT * FROM familymember
        WHERE MONTH(dob) = ${currentMonth}
        and CodeID = ${CodeID}`;
        db.connection.query(query, (err, result) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
}

function GetDeadDayInMonth(CodeID) {
    return new Promise((resolve, reject) => {
        let currentDate = new Date();
        let currentMonth = currentDate.getMonth() + 1;
        let query = `SELECT * FROM familymember
        WHERE MONTH(dod) = ${currentMonth}
        and CodeID = ${CodeID}`;
        db.connection.query(query, (err, result) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
}
async function searchEvent(searchTerm) {
    return new Promise((resolve, reject) => {
        const query = `
        SELECT * FROM eventfamily
        WHERE EventName LIKE ?
        `;

        const values = [`%${searchTerm}%`];

        db.connection.query(query, values, (err, result) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

async function filterEvent(filterOptions) {
    try {
        // Xây dựng câu truy vấn SQL cho bảng eventfamily
        let eventQuery = 'SELECT * FROM eventfamily WHERE 1=1';

        // Xây dựng điều kiện lọc cho bảng eventfamily
        if (filterOptions.startDate) {
            eventQuery += ` AND StartDate >= '${filterOptions.startDate}'`;
        }
        if (filterOptions.endDate) {
            eventQuery += ` AND EndDate <= '${filterOptions.endDate}'`;
        }
        if (filterOptions.CodeID) {
            eventQuery += ` AND CodeID = ${filterOptions.CodeID}`;
        }
        // Các điều kiện lọc khác tùy theo cần thiết

        // Thực hiện truy vấn SQL cho bảng eventfamily
        const eventResults = await db.connection.query(eventQuery);

        return eventResults;
    } catch (error) {
        console.error('Lỗi khi lọc sự kiện:', error);
        throw error;
    }
}

module.exports = {
    getAllEvent, InsertNewEvent, UpdateEvent, RemoveEvent, GetBirthDayInMonth, GetDeadDayInMonth, searchEvent, filterEvent, getListPhone
}