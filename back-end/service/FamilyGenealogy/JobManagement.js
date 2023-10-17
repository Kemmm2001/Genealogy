const db = require("../../Models/ConnectDB")


function GetAllJobByMemberID(memberId) {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM job where MemberID = ${memberId}`
        db.connection.query(query, (err, result) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(result)
            }
        })
    })
}
async function AddJobByMemberID(ObjData) {
    let query = `INSERT INTO job (MemberID, Organization, OrganizationAddress, Role, JobName, StartDate, EndDate) 
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;
    let values = [
        ObjData.memberId,
        ObjData.Organization,
        ObjData.OrganizationAddress,
        ObjData.Role,
        ObjData.JobName,
        ObjData.StartDate,
        ObjData.EndDate
    ];

    db.connection.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            return;
        } else {
            console.log('Insert Successfully');
        }
    });
}

async function UpdateJobByID(ObjData) {
    const query = `UPDATE job 
                   SET Organization = ?, OrganizationAddress = ?, Role = ?, JobName = ?, StartDate = ?, EndDate = ? 
                   WHERE JobID = ?`;
    const values = [
        ObjData.Organization,
        ObjData.OrganizationAddress,
        ObjData.Role,
        ObjData.JobName,
        ObjData.StartDate,
        ObjData.EndDate,
        ObjData.JobID
    ];

    db.connection.query(query, values, (err, result) => {
        if (err) {
            console.error(err);

            return;
        } else {
            console.log('Update Successfully');
        }
    });
}

async function DeleteJobByID(JobID) {
    let query = `DELETE FROM job WHERE JobID = ${JobID}`
    db.connection.query(query, (err, result) => {
        if (err) {
            console.error(err);

            return;
        } else {
            console.log('Delete Successfully');
        }
    });
}


module.exports = {
    GetAllJobByMemberID, AddJobByMemberID, UpdateJobByID, DeleteJobByID
}