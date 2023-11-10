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

async function isInLaw(MemberID) {
    return new Promise((resolve, reject) => {
        let query = `select ParentID,MarriageID from familymember WHERE MemberID = ${MemberID}`;
        db.connection.query(query, (err, result) => {
            if (err) {
                console.log(err)
                reject(err)
            } else {
                resolve(result[0])
            }
        })
    })
}


function getBirthOrderByID(MemberId) {
    return new Promise((resolve, reject) => {
        let query = `select BirthOrder,Male from familymember
        where MemberID = ${MemberId}`;
        db.connection.query(query, (err, result) => {
            if (err) {
                console.log(err)
                reject(err)
            } else {
                resolve(result[0])
            }
        })
    })
}
const PaternalFamily = [
    { name: "Ông", id: 0 },
    { name: "Bà", id: 1 },
    { name: "Ông Con nhà bác", id: 2 },
    { name: "Bà con nhà bác", id: 3 },
    { name: "Ông con nhà chú", id: 4 },
    { name: "Bà con nhà chú", id: 5 },
    { name: "Bác trai", id: 6 },
    { name: "Bác gái", id: 7 },
    { name: "Bố", id: 8 },
    { name: "Mẹ", id: 9 },
    { name: "Chú", id: 10 },
    { name: "Dượng(Chú)", id: 11 },
    { name: "Cô", id: 12 },
    { name: "Thím", id: 13 },
    { name: "Anh", id: 14 },
    { name: "Chị", id: 15 },
    { name: "Em", id: 16 },
    { name: "Cháu", id: 17 }
];

async function getResultCompareToMember(DefferenceGeneration, Generation1, Generation2, Flag1, Flag2) {
    let objResult = {};

    const setResult = (result1, result2) => {
        objResult.result1 = result1;
        objResult.result2 = result2;
    };

    const getMemberName = (index) => {
        return PaternalFamily[index].name;
    };

    const getResultForSameGeneration = (index1, index2) => {
        setResult(getMemberName(index1), getMemberName(index2));
    };

    switch (DefferenceGeneration) {
        case 0:
            if (Generation1.BirthOrder > Generation2.BirthOrder) {
                setResult(
                    Generation1.Male ? getMemberName(14) : getMemberName(15),
                    getMemberName(16)
                );
            } else {
                setResult(
                    Generation1.Male ? getMemberName(16) : getMemberName(16),
                    Generation1.Male ? getMemberName(14) : getMemberName(15)
                );
            }
            break;
        case 1:
        case -1:
            if (Generation1.BirthOrder > Generation2.BirthOrder) {
                setResult(getMemberName(17), Flag2 ? getMemberName(7) : getMemberName(13));
            } else if (Generation1.BirthOrder < Generation2.BirthOrder) {
                setResult(getMemberName(17), Flag2 ? getMemberName(13) : getMemberName(11));
            }
            break;

        case 2:
        case -2:
            if (Generation1.BirthOrder > Generation2.BirthOrder) {
                setResult(getMemberName(17), getMemberName(Generation2.Male ? 2 : 3));
            } else if (Generation1.BirthOrder < Generation2.BirthOrder) {
                setResult(getMemberName(17), getMemberName(Generation2.Male ? 4 : 5));
            }
            break;
        default:
            return "Không xác định";
    }

    return objResult;
}

async function GetResultCompare(MemberId1, MemberId2, DifferenceGeneration, Flag1, Flag2) {
    try {
        // Parallelize asynchronous calls
        const [result1, result2] = await Promise.all([
            GetParentId(MemberId1),
            GetParentId(MemberId2)
        ]);

        if (!result1[0] || !result2[0]) {
            const errorMsg = "Không tìm thấy thông tin cho MemberId1 hoặc MemberId2.";
            console.log(errorMsg);
            return errorMsg;
        }
        const parentID1 = result1[0].ParentID;
        const parentID2 = result2[0].ParentID;

        if (parentID1 !== parentID2) {
            // Recursively call with parent IDs
            return await GetResultCompare(parentID1, parentID2, DifferenceGeneration, Flag1, Flag2);
        } else {
            const getGeneration1 = await getBirthOrderByID(MemberId1);
            const getGeneration2 = await getBirthOrderByID(MemberId2);

            const result = await getResultCompareToMember(DifferenceGeneration, getGeneration1, getGeneration2, Flag1, Flag2);
            console.log("Kết quả:", result);
            return result;
        }
    } catch (error) {
        // Add more detailed error information
        console.log("Lỗi:", error);
        return "Có lỗi xảy ra";
    }
}

module.exports = {
    getGenerationByID, GetResultCompare, getIdToCompare, isInLaw
}