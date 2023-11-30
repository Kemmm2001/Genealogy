const { get } = require('mongoose');
const db = require('../../Models/ConnectDB');


function getGenerationByID(MemberId) {
    return new Promise((resolve, reject) => {
        let query = `select Generation,Male from familymember
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


async function checkMaternalOrPaternal(MemberID) {
    try {
        let getParent = await getParentId(MemberID);
        if (getParent.FatherID == null && getParent.MotherID != null) {
            return false
        } else if (getParent.FatherID != null && getParent.MotherID == null) {
            return true
        } else {
            let Father = await getParentId(getParent.FatherID);
            if (Father.FatherID != null || Father.MotherID != null) {
                return true;
            } else {
                return false;
            }
        }
    } catch (error) {
        console.log(error)
    }
}

function getMarriageNumber(husbandID, wifeID) {
    return new Promise((resolve, reject) => {
        try {
            let query = ` select MarriageNumber from marriage where husbandID = ${husbandID} and wifeID = ${wifeID}`;
            db.connection.query(query, (err, result) => {
                if (!err) {
                    resolve(result[0].MarriageNumber)
                }
            })
        } catch (error) {
            console.log(error)
        }
    })
}

function checkBrideOrGroom(MemberID) {
    return new Promise((resolve, reject) => {
        try {
            let query = `SELECT * FROM familymember WHERE MemberID = ${MemberID}`;
            console.log('MemberID:MemberID' + MemberID)
            db.connection.query(query, (err, result) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    if (result.length === 0) {
                        reject("Member not found");
                    } else {
                        let member = result[0];
                        if (member.FatherID !== null || member.MotherID !== null) {
                            console.log('FatherID: ' + member.FatherID)
                            console.log('MotherID: ' + member.MotherID)
                            resolve(MemberID);
                        } else {
                            let getMarriedIDQuery = (member.Male === 1) ?
                                `SELECT wifeID AS marriedID FROM genealogy.marriage WHERE husbandID = ${MemberID}` :
                                `SELECT husbandID AS marriedID FROM genealogy.marriage WHERE wifeID = ${MemberID}`;
                            db.connection.query(getMarriedIDQuery, (err, marriedResult) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    if (marriedResult.length === 0) {
                                        reject("Not married");
                                    } else {
                                        console.log('result' + marriedResult[0].marriedID)
                                        resolve(marriedResult[0].marriedID);
                                    }
                                }
                            });
                        }
                    }
                }
            });
        } catch (error) {
            console.error(error);
            reject(error);
        }
    });
}

function getParentId(MemberId) {
    return new Promise((resolve, reject) => {
        let query = `SELECT FatherID, MotherID FROM familymember WHERE MemberID = ${MemberId}`;
        db.connection.query(query, (err, result) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(result[0]); // Lấy cả FatherID và MotherID
            }
        });
    });
}

async function getIdToCompare(NumberIterations, MemberId) {
    if (NumberIterations < 0) NumberIterations = -NumberIterations;
    try {
        let currentMemberId = MemberId;

        for (let i = 0; i < NumberIterations; i++) {
            const parentInfo = await getParentId(currentMemberId);

            if (!parentInfo) {
                // Không có thông tin về cha hoặc mẹ, có thể dừng lại
                break;
            }

            // Lựa chọn FatherID hoặc MotherID tùy thuộc vào yêu cầu
            currentMemberId = parentInfo.FatherID || parentInfo.MotherID;

            if (!currentMemberId) {
                // Không có FatherID hoặc MotherID, có thể dừng lại
                break;
            }
        }

        return currentMemberId;
    } catch (error) {
        console.error(error);
        throw error;
    }
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
        let query = `select BirthOrder from familymember
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

PaternalFamily = [
    {
        name: "Kị Ông",
        id: 0
    },
    {
        name: "Kị Bà",
        id: 1
    },
    {
        name: "Cụ Ông",
        id: 2
    },
    {
        name: "Cụ Bà",
        id: 3
    },
    {
        name: "Ông",
        id: 4
    },
    {
        name: "Bà",
        id: 5
    },
    {
        name: "Bác trai",
        id: 6
    },
    {
        name: "Bác gái",
        id: 7
    },
    {
        name: "Bố",
        id: 8
    },
    {
        name: "Mẹ",
        id: 9
    },
    {
        name: "Chú",
        id: 10
    },
    {
        name: "Thím",
        id: 11
    },
    {
        name: "Cô",
        id: 12
    },
    {
        name: "Dượng",
        id: 13
    },
    {
        name: "Cậu",
        id: 14
    },
    {
        name: "Mợ",
        id: 15
    },
    {
        name: "Dì",
        id: 16
    },
    {
        name: "Dượng",
        id: 17
    },
    {
        name: "Anh",
        id: 18
    },

    {
        name: "Chị",
        id: 19
    },
    {
        name: "Con",
        id: 20
    },
    {
        name: "Cháu",
        id: 21
    },
]



function setResult(objResult, index1, index2) {
    objResult.result1 = PaternalFamily[index1].name;
    objResult.result2 = PaternalFamily[index2].name;
}

async function getResultCompareWithMemberID1SameID2(DefferenceGeneration, Gender1, Gender2) {
    let objResult = {};

    let mapping = {
        '-1': [20, Gender2 === 1 ? 8 : 9],
        '1': [Gender1 === 1 ? 8 : 9, 20],
        '-2': [21, Gender2 === 1 ? 4 : 5],
        '2': [Gender1 === 1 ? 4 : 5, 21],
        '-3': [21, Gender2 === 1 ? 2 : 3],
        '3': [Gender1 === 1 ? 2 : 3, 21],
        '-4': [21, Gender2 === 1 ? 0 : 1, 21],
        '4': [Gender1 === 1 ? 0 : 1, 21],
    };

    if (mapping[DefferenceGeneration]) {
        let [index1, index2] = mapping[DefferenceGeneration];
        console.log('index1: ' + index1)
        console.log('index2: ' + index2)
        setResult(objResult, index1, index2);
    }

    return objResult;
}
const generationMappings = {
    '-4': [21, (gender) => gender === 1 ? 0 : 1], '4': [(gender) => gender === 1 ? 0 : 1, 21],
    '-3': [21, (gender) => gender === 1 ? 2 : 3], '3': [(gender) => gender === 1 ? 2 : 3, 21],
    '-2': [21, (gender) => gender === 1 ? 4 : 5], '2': [(gender) => gender === 1 ? 4 : 5, 21],
    '-1': [20, (gender) => gender === 1 ? 8 : 9], '1': [(gender) => gender === 1 ? 8 : 9, 20],
    '0': [16, 15],
};

async function getResultCompareInFamily(DefferenceGeneration, Gender1, Gender2) {
    let objResult = {};

    if (generationMappings[DefferenceGeneration]) {
        const mapping = generationMappings[DefferenceGeneration];
        const index1 = typeof mapping[0] === 'function' ? mapping[0](Gender1) : mapping[0];
        const index2 = typeof mapping[1] === 'function' ? mapping[1](Gender2) : mapping[1];
        setResult(objResult, index1, index2);
    }

    return objResult;
}

async function getResultCompareToMember(DefferenceGeneration, Generation1, Generation2, Flag1, Flag2, Gender1, Gender2) {
    console.log('DefferenceGeneration: ' + DefferenceGeneration);
    console.log('Generation1: ' + Generation1.BirthOrder);
    console.log('Generation2: ' + Generation2.BirthOrder);

}
async function checkMarriageRelationship(memberId1, memberId2) {
    const query = `SELECT * FROM genealogy.marriage WHERE (husbandID = ${memberId1} AND wifeID = ${memberId2}) 
    OR (wifeID = ${memberId1} AND husbandID = ${memberId2})`;
    return new Promise((resolve, reject) => {
        db.connection.query(query, (err, result) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(result.length > 0);
            }
        });
    });
}

async function GetResultCompare(MemberId1, MemberId2, DifferenceGeneration, Flag1, Flag2, Gender1, Gender2, resultCheck) {
    console.log("MemberId1: " + MemberId1);
    console.log("MemberId2: " + MemberId2);
    console.log('DifferenceGeneration: ' + DifferenceGeneration);
    console.log('Flag1: ' + Flag1)
    console.log('Flag2: ' + Flag2)
    console.log('Gender1: ' + Gender1)
    console.log('Gender2: ' + Gender2)
    console.log('resultCheck: ' + resultCheck)
    try {
        if (MemberId1 == MemberId2) {
            let result = await getResultCompareWithMemberID1SameID2(DifferenceGeneration, Gender1, Gender2);
            console.log("Kết quả:", result);
            return result;
        }
        let checkMarriage = await checkMarriageRelationship(MemberId1, MemberId2)
        if (checkMarriage) {
            let result = await getResultCompareInFamily(DifferenceGeneration, Gender1, Gender2);
            console.log("Kết quả:", result);
            return result;
        }
        let [result1, result2] = await Promise.all([
            getParentId(MemberId1),
            getParentId(MemberId2)
        ]);

        if (!result1 || !result2) {
            let errorMsg = "Không tìm thấy thông tin cho MemberId1 hoặc MemberId2.";
            console.log(errorMsg);
            return errorMsg;
        }

        let parentID1 = result1.FatherID !== null ? result1.FatherID : result1.MotherID;
        let parentID2 = result2.FatherID !== null ? result2.FatherID : result2.MotherID;

        if (parentID1 !== parentID2) {
            return await GetResultCompare(parentID1, parentID2, DifferenceGeneration, Flag1, Flag2, Gender1, Gender2, resultCheck);
        } else {
            if (resultCheck === undefined) {
                resultCheck = true; // Đánh dấu đã lên đời
            }
            let getGeneration1 = await getBirthOrderByID(MemberId1);
            let getGeneration2 = await getBirthOrderByID(MemberId2);
            console.log('getGeneration1: ' + getGeneration1.BirthOrder)
            console.log('getGeneration2: ' + getGeneration2.BirthOrder)
            if (resultCheck && getGeneration1 !== getGeneration2) {
                if (result1.FatherID != null && result2.FatherID != null && result1.MotherID != null && result2.MotherID) {

                } else {
                    console.log("Đã vào đây else");
                }
                // const result = await getResultCompareToMember(DifferenceGeneration, getGeneration1, getGeneration2, Flag1, Flag2, Gender1, Gender2);

                // return result;
            } else {
                // Chưa lên đời hoặc đã lên đời nhưng hai người cùng đời
                return "Không có sự chênh lệch đời hoặc đã lên đời nhưng cùng đời.";
            }
        }

    } catch (error) {
        console.log("Lỗi:", error);
        return "Có lỗi xảy ra";
    }
}

module.exports = {
    getGenerationByID, GetResultCompare, getIdToCompare, isInLaw, checkBrideOrGroom, checkMaternalOrPaternal
}