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



module.exports = {
    getAllEvent, InsertNewEvent, UpdateEvent, RemoveEvent, GetBirthDayInMonth, GetDeadDayInMonth
}