const db = require("../../Models/ConnectDB")

//Nguyễn Lê Hùng
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
//Nguyễn Lê Hùng
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
//Nguyễn Lê Hùng
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
//Nguyễn Lê Hùng
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
//Nguyễn Lê Hùng
async function DeleteListJobByID(memberId) {
    return new Promise((resolve, reject) => {
        try {
            let findMember = `SELECT * FROM genealogy.job where MemberID = ${memberId};`
            db.connection.query(findMember, (err, result) => {
                if (!err && result.length > 0) {
                    let query = `DELETE FROM job WHERE MemberID = ${memberId}`
                    db.connection.query(query, (err) => {
                        if (err) {
                            reject(false)
                        } else {
                            resolve(true)
                        }
                    });
                } else {
                    resolve(true)
                }
            })
        } catch (error) {
            reject(false)
        }
    })

}


module.exports = {
    GetAllJobByMemberID, AddJobByMemberID, UpdateJobByID, DeleteJobByID, DeleteListJobByID
}