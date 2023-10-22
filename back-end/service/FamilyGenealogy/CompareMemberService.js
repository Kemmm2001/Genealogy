const db = require('../../Models/ConnectDB');

function getGenerationByID(MemberId) {
    return new Promise((resolve, reject) => {
        let query = `select Generation from familymember
        where MemberID = ${MemberId}`;
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

function GetParentId(MemberId) {
    return new Promise((resolve, reject) => {
        let query = `SELECT ParentID FROM familymember WHERE MemberID = ${MemberId}`;
        db.connection.query(query, (err, result) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

function getIdToCompare(NumberIterations, MemberId) {
    if (NumberIterations < 0) NumberIterations = -NumberIterations;
    return new Promise(async (resolve, reject) => {
        let currentMemberId = MemberId;
        for (let i = 0; i < NumberIterations; i++) {
            try {
                const queryResult = await GetParentId(currentMemberId);
                currentMemberId = queryResult[0].ParentID;
            } catch (error) {
                reject(error);
                return;
            }
        }
        resolve(currentMemberId);
    });

}
function getBirthOrderByID(MemberId) {
    return new Promise((resolve, reject) => {
        let query = `select BirthOrder from familymember
        where MemberID = ${MemberId}`;
        db.connection.query(query, (err, result) => {
            if (err) {
                console.log(err)
                reject(err)
            } else {
                resolve(result[0].BirthOrder)
            }
        })
    })
}

async function getResultCompareToMember(DefferenceGeneration, Generation1, Generation2) {
    console.log(Generation1)
    console.log(Generation2)
    console.log(DefferenceGeneration)
    if (DefferenceGeneration === 0) {
        if (Generation1 > Generation2) {
            return "anh - em";
        } else {
            return "em - anh";
        }
    } else if (DefferenceGeneration < 0) {
        if (DefferenceGeneration == 1 || DefferenceGeneration == -1) {
            if (Generation1 > Generation2) {
                return "cháu - bác";
            } else if (Generation1 < Generation2) {
                return "cháu - chú";
            }
        }
    }
    return "Không xác định"; // Trả về một giá trị mặc định nếu không thoả mãn điều kiện nào
}

async function GetResultCompare(MemberId1, MemberId2, DefferenceGeneration) {
    try {
        const result1 = await GetParentId(MemberId1);
        const result2 = await GetParentId(MemberId2);

        if (!result1[0] || !result2[0]) {
            console.log("Không tìm thấy thông tin cho MemberId1 hoặc MemberId2.");
            return "Không tìm thấy thông tin cho MemberId1 hoặc MemberId2.";
        }

        console.log("result1: " + result1[0].ParentID);
        console.log("result2: " + result2[0].ParentID);

        if (result1[0].ParentID !== result2[0].ParentID) {
            return await GetResultCompare(result1[0].ParentID, result2[0].ParentID, DefferenceGeneration);
        } else {
            const getGeneration1 = await getBirthOrderByID(MemberId1);
            const getGeneration2 = await getBirthOrderByID(MemberId2);
            const result = await getResultCompareToMember(DefferenceGeneration, getGeneration1, getGeneration2);
            console.log("Kết quả:", result);
        }
    } catch (error) {
        console.log("Lỗi:", error);
        return "Có lỗi xảy ra";
    }
}
module.exports = {
    getGenerationByID, GetResultCompare, getIdToCompare
}