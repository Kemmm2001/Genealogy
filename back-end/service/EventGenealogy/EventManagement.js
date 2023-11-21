const { promises } = require('nodemailer/lib/xoauth2');
const db = require('../../Models/ConnectDB')

function getAllEvent(CodeID) {
    return new Promise((resolve, reject) => {
        try {
            let query = `SELECT * FROM eventfamily where CodeID = '${CodeID}'`;
            db.connection.query(query, (err, result) => {
                if (err) {
                    console.log(err)
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        } catch (error) {
            console.log(error)
        }
    })
}

function getListEventRepetition() {
    return new Promise((resolve, reject) => {
        try {
            let query = 'SELECT * FROM genealogy.eventrepetition';
            db.connection.query(query, (err, result) => {
                if (!err && result.length > 0) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        } catch (error) {
            reject(error)
        }
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

async function getListEmail(ListMemberID) {
    let ListEmail = [];
    return new Promise((resolve, reject) => {
        let count = 0;
        for (let i = 0; i < ListMemberID.length; i++) {
            let query = `SELECT Email FROM genealogy.contact
            where MemberID = ${ListMemberID[i]}`;
            db.connection.query(query, (err, result) => {
                if (!err && result.length > 0 && result[0].Email != null) {
                    ListEmail.push(result[0].Email);
                } else {
                    reject(err)
                }
                count++;
                if (count === ListMemberID.length) {
                    resolve(ListEmail);
                }
            });
        }
    });
}

async function InsertNewEvent(objData) {
    return new Promise((resolve, reject) => {
        try {
            let query = `INSERT INTO eventfamily (EventName,CodeID,Status,StartDate,EndDate, Description, IsImportant, Note,Place, RepeatID)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
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

            ]
            db.connection.query(query, values, (err) => {
                if (err) {
                    reject(false)
                } else {
                    resolve(true)
                }
            })
        } catch (error) {
            console.log(error);
            reject(false)
        }
    })
}

function getInformationEvent(EventID) {
    return new Promise((resolve, reject) => {
        try {
            let query = `SELECT * FROM genealogy.eventfamily where EventID = ${EventID}`;
            db.connection.query(query, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}
function searchEvent(CodeID, keySearch) {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM genealogy.eventfamily where CodeID = ${CodeID} and EventName like '%${keySearch}%'`;
        console.log(query)
        db.connection.query(query, (err, result) => {
            if (!err && result.length > 0) {
                resolve(result)
                console.log('result' + result)
            } else {
                reject(err)
            }
        })
    })
}

async function UpdateEvent(objData) {
    return new Promise((resolve, reject) => {
        try {
            let query = `UPDATE eventfamily SET EventName = ?, Status = ?, StartDate = ?, EndDate = ?, Description = ?,IsImportant = ?, Note = ?, Place = ?, 
        RepeatID = ? WHERE EventID = ?`;
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
                objData.EventID,
            ]
            db.connection.query(query, values, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(true)
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}
async function RemoveEvent(EventID) {
    return new Promise((resolve, reject) => {
        try {
            let query = `DELETE FROM eventfamily WHERE EventID = ${EventID}`;
            db.connection.query(query, (err) => {
                if (err) {
                    reject(false)
                } else {
                    resolve(true)
                }
            })
        } catch (error) {
            reject(error)
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

async function filterEvent(filterOptions) {
    return new Promise((resolve, reject) => {
        try {
            // Xây dựng câu truy vấn SQL cho bảng eventfamily
            let eventQuery = 'SELECT * FROM eventfamily WHERE 1=1';

            // Xây dựng điều kiện lọc cho bảng eventfamily
            if (filterOptions.Status) {
                eventQuery += ` AND Status = '${filterOptions.Status}'`;
            }
            if (filterOptions.RepeatID) {
                eventQuery += ` AND RepeatID = '${filterOptions.RepeatID}'`;
            }
            if (filterOptions.CodeID) {
                eventQuery += ` AND CodeID = ${filterOptions.CodeID}`;
            }
            db.connection.query(eventQuery, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })

        } catch (error) {
            console.error('Lỗi khi lọc sự kiện:', error);
            reject(error)
        }
    })
}

module.exports = {
    getAllEvent, InsertNewEvent, UpdateEvent, RemoveEvent, GetBirthDayInMonth,
    GetDeadDayInMonth, searchEvent, filterEvent, getListPhone, getListEventRepetition, getInformationEvent, getListEmail
}