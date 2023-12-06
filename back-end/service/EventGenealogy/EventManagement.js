const { promises } = require('nodemailer/lib/xoauth2');
const db = require('../../Models/ConnectDB')

//Nguyễn Lê Hùng
function getAllEvent(CodeID) {
    return new Promise((resolve, reject) => {
        try {
            let query = `SELECT * FROM eventfamily WHERE CodeID = ${CodeID}`;
            db.connection.query(query, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

//Nguyễn Lê Hùng
function getEventAttendance(EventID) {
    return new Promise((resolve, reject) => {
        try {
            let query = `SELECT ea.*, f.MemberName
            FROM genealogy.eventattendance as ea
            INNER JOIN familymember as f ON ea.MemberID = f.MemberID
            WHERE ea.EventID = ${EventID}`;
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
//Nguyễn Lê Hùng
function getListEmailAndMemberID(ListMemberID) {
    return new Promise((resolve, reject) => {
        try {
            let query = `SELECT MemberID, Email FROM contact WHERE MemberID IN (${ListMemberID})`;
            db.connection.query(query, (err, result) => {
                if (!err && result.length > 0) {
                    let filteredResult = result.filter(item => item.Email !== null);
                    console.log(filteredResult);
                    resolve(filteredResult);
                } else {
                    reject(err)
                }
            })
        } catch (error) {
            reject(err)
        }
    })
}

//Nguyễn Lê Hùng
function updateStatusEvent(EventID) {
    return new Promise((resolve, reject) => {
        try {
            let query = `UPDATE eventfamily SET Status = '0' WHERE EventID = ${EventID}`
            db.connection.query(query, (err, result) => {
                if (err) {
                    reject(false)
                } else {
                    resolve(result)
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}


//Nguyễn Lê Hùng
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

    try {
        console.log('length: ' + ListMemberID.length)

        for (let i = 0; i < ListMemberID.length; i++) {
            let query = `SELECT Email FROM genealogy.contact
            where MemberID = ${ListMemberID[i]}`;
            const result = await new Promise((resolve, reject) => {
                db.connection.query(query, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });

            if (result.length > 0 && result[0].Email != null) {
                console.log('result: ' + result[0].Email)
                ListEmail.push(result[0].Email);
            }
        }

        return ListEmail;

    } catch (error) {
        throw error;
    }
}

async function InsertNewEvent(objData) {
    return new Promise((resolve, reject) => {
        try {
            let query = `INSERT INTO eventfamily (EventName,CodeID,Status,StartDate,EndDate, Description, IsImportant, Note,Place)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
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
            let query = `UPDATE eventfamily SET EventName = ?, Status = ?, StartDate = ?, EndDate = ?, Description = ?,IsImportant = ?, Note = ?, Place = ?
        WHERE EventID = ?`;
            let values = [
                objData.EventName,
                objData.Status,
                objData.StartDate,
                objData.EndDate,
                objData.Description,
                objData.IsImportant,
                objData.Note,
                objData.Place,
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
            let query = `DELETE from genealogy.eventattendance where EventID = ${EventID}`;
            db.connection.query(query, (err) => {
                if (!err) {
                    let query = `DELETE FROM eventfamily WHERE EventID = ${EventID}`;
                    db.connection.query(query, (err) => {
                        if (err) {
                            reject(false)
                        } else {
                            resolve(true)
                        }
                    })
                } else {
                    reject(false)
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

function getCodeID(eventID) {
    return new Promise((resolve, reject) => {
        try {
            let query = `SELECT CodeID FROM genealogy.eventfamily WHERE EventID = ${eventID}`;
            db.connection.query(query, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}


module.exports = {
    getAllEvent, InsertNewEvent, UpdateEvent, RemoveEvent, GetBirthDayInMonth,
    GetDeadDayInMonth, searchEvent, filterEvent, getListPhone, getInformationEvent, getListEmail, getCodeID, updateStatusEvent, getEventAttendance, getListEmailAndMemberID
}