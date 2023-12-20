const { get, set } = require('mongoose');
const db = require('../../Models/ConnectDB');

//Nguyễn Lê Hùng
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

//Nguyễn Lê Hùng
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

//Nguyễn Lê Hùng
function checkBrideOrGroom(MemberID) {
    return new Promise((resolve, reject) => {
        try {
            let query = `SELECT * FROM familymember WHERE MemberID = ${MemberID}`;
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
//Nguyễn Lê Hùng
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
//Nguyễn Lê Hùng
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

//Nguyễn Lê Hùng
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
//Nguyễn Lê Hùng
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
    {
        name: "Em",
        id: 22
    },
    {
        name: "Chồng",
        id: 23
    },
    {
        name: "Vợ",
        id: 24
    }
]

//Nguyễn Lê Hùng
async function getResultCompareToMember(DefferenceGeneration, Generation1, Generation2, Flag, Gender1, Gender2, resultCheck) {
    let objResult = {};
    console.log('DefferenceGeneration: ' + DefferenceGeneration)
    console.log('resultCheck: ' + resultCheck)
    console.log('Gender1: ' + Gender1)


    if (DefferenceGeneration == -1) {
        let index1 = 21;
        let index2;
        if (resultCheck) {
            if (Gender2 == 1) {
                index2 = calculateIndex(Generation1, Generation2, Flag, 13, 10, 7, 6);
            } else {
                index2 = calculateIndex(Generation1, Generation2, Flag, 11, 12, 6, 7);
            }
        } else {
            if (Gender2 == 1) {
                index2 = calculateIndex(Generation1, Generation2, Flag, 17, 14, 7, 6);
            } else {
                index2 = calculateIndex(Generation1, Generation2, Flag, 15, 16, 6, 7);
            }
        }
        setResult(objResult, index1, index2);
        return objResult;
    } else if (DefferenceGeneration == 1) {
        let index1;
        let index2 = 21;
        if (resultCheck) {
            if (Gender1 == 1) {
                index1 = calculateIndex(Generation1, Generation2, Flag, 6, 7, 17, 10);
            } else {
                index1 = calculateIndex(Generation1, Generation2, Flag, 7, 6, 11, 12);
            }
        } else {
            if (Gender1 == 1) {
                index1 = calculateIndex(Generation1, Generation2, Flag, 7, 6, 16, 14);
            } else {
                console.log("vào else này")
                index1 = calculateIndex(Generation1, Generation2, Flag, 7, 6, 14, 16);
            }
        }
        setResult(objResult, index1, index2);
        return objResult;
    } else if (DefferenceGeneration == -2) {
        let index1 = 21;
        let index2;
        if (Gender2 == 1) {
            index2 = calculateIndex(Generation1, Generation2, Flag, 4, 4, 4, 4);
        } else {
            index2 = calculateIndex(Generation1, Generation2, Flag, 5, 5, 5, 5);
        }
        setResult(objResult, index1, index2);
        return objResult;
    } else if (DefferenceGeneration == 2) {
        let index2 = 21;
        let index1;
        if (Gender1 == 1) {
            index1 = calculateIndex(Generation1, Generation2, Flag, 4, 4, 4, 4);
        } else {
            index1 = calculateIndex(Generation1, Generation2, Flag, 5, 5, 5, 5);
        }
        setResult(objResult, index1, index2);
        return objResult;
    } else if (DefferenceGeneration == -3) {
        let index1 = 21;
        let index2;
        if (Gender2 == 1) {
            index2 = calculateIndex(Generation1, Generation2, Flag, 2, 2, 2, 2);
        } else {
            index2 = calculateIndex(Generation1, Generation2, Flag, 3, 3, 3, 3);
        }
        setResult(objResult, index1, index2);
        return objResult;
    } else if (DefferenceGeneration == 3) {
        let index2 = 21;
        let index1;
        if (Gender1 == 1) {
            index1 = calculateIndex(Generation1, Generation2, Flag, 2, 2, 2, 2);
        } else {
            index1 = calculateIndex(Generation1, Generation2, Flag, 3, 3, 3, 3);
        }
        setResult(objResult, index1, index2);
        return objResult;
    } else if (DefferenceGeneration == -4) {
        let index1 = 21;
        let index2;
        if (Gender2 == 1) {
            index2 = calculateIndex(Generation1, Generation2, Flag, 0, 0, 0, 0);
        } else {
            index2 = calculateIndex(Generation1, Generation2, Flag, 1, 1, 1, 1);
        }
        setResult(objResult, index1, index2);
        return objResult;
    } else if (DefferenceGeneration == 4) {
        let index2 = 21;
        let index1;
        if (Gender1 == 1) {
            index1 = calculateIndex(Generation1, Generation2, Flag, 0, 0, 0, 0);
        } else {
            index1 = calculateIndex(Generation1, Generation2, Flag, 1, 1, 1, 1);
        }
        setResult(objResult, index1, index2);
        return objResult;

    } else if (DefferenceGeneration == 0) {
        if (Generation1 < Generation2) {
            if (Gender1 == 1) {
                setResult(objResult, 18, 22);
            } else {
                setResult(objResult, 19, 22);
            }
        } else {
            if (Gender2 == 1) {
                setResult(objResult, 22, 18);
            } else {
                setResult(objResult, 22, 19);
            }
        }
        return objResult;
    }
}
//Nguyễn Lê Hùng
function calculateIndex(Generation1, Generation2, Flag, lessFlag, lessNoFlag, greaterFlag, greaterNoFlag) {
    if (Generation1 < Generation2) {
        console.log("Vào nhỏ hơn")
        return Flag ? lessFlag : lessNoFlag;
    } else {
        console.log("Vào Lớn hơn")
        return Flag ? greaterFlag : greaterNoFlag;
    }
}


//Nguyễn Lê Hùng
function setResult(objResult, index1, index2) {
    objResult.result1 = PaternalFamily[index1].name;
    objResult.result2 = PaternalFamily[index2].name;
}
//Nguyễn Lê Hùng
async function getResultCompareWithMemberID1SameID2(DefferenceGeneration, Gender1, Gender2) {
    let objResult = {};

    let mapping = {
        '0': [Gender1 === 1 ? 23 : 24, Gender2 === 1 ? 23 : 24],
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
    //Nguyễn Lê Hùng

    return objResult;
}
//Nguyễn Lê Hùng
const generationMappings = {
    '-4': [21, (gender) => gender === 1 ? 0 : 1], '4': [(gender) => gender === 1 ? 0 : 1, 21],
    '-3': [21, (gender) => gender === 1 ? 2 : 3], '3': [(gender) => gender === 1 ? 2 : 3, 21],
    '-2': [21, (gender) => gender === 1 ? 4 : 5], '2': [(gender) => gender === 1 ? 4 : 5, 21],
    '-1': [20, (gender) => gender === 1 ? 8 : 9], '1': [(gender) => gender === 1 ? 8 : 9, 20],
    '0': [23, 24, (gender) => gender === 1 ? [23, 24] : [24, 23]],
};
//Nguyễn Lê Hùng
async function getResultCompareInFamily(DefferenceGeneration, Gender1, Gender2) {
    let objResult = {};

    if (generationMappings[DefferenceGeneration]) {
        const mapping = generationMappings[DefferenceGeneration];
        const index1 = typeof mapping[0] === 'function' ? mapping[0](Gender1) : mapping[0];
        const index2 = typeof mapping[1] === 'function' ? mapping[1](Gender2) : mapping[1];

        if (typeof mapping[2] === 'function') {
            const [result1, result2] = mapping[2](Gender1);
            setResult(objResult, result1, result2);
        } else {
            setResult(objResult, index1, index2);
        }
    } else {
        // Mặc định khi không có logic điều kiện
        setResult(objResult, 23, 24);
    }

    return objResult;
}
//Nguyễn Lê Hùng
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

//nguyễn lê hùng
async function getDateOfBirth(MemberID) {
    return new Promise((resolve, reject) => {
        try {
            let query = `SELECT Dob FROM genealogy.familymember where MemberID = ${MemberID}`;
            db.connection.query(query, (err, result) => {
                if (!err && result[0].Dob) {
                    resolve(result[0].Dob)
                } else {
                    resolve(false)
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}

async function getMarried(memberID) {
    return new Promise((resolve, reject) => {
        try {
            let query = `SELECT * FROM genealogy.marriage where husbandID = ${memberID} or wifeID = ${memberID}`;
            db.connection.query(query, (err, result) => {
                if (!err && result.length > 0) {
                    resolve(result[0])
                } else {
                    resolve(false)
                }
            })
        } catch (error) {
            resolve(error)
        }
    })
}

async function getChild(memberID) {
    return new Promise((resolve, reject) => {
        try {
            let query = `SELECT * FROM genealogy.familymember where FatherID = ${memberID} or MotherID = ${memberID}`;
            db.connection.query(query, (err, result) => {
                if (!err && result.length > 0) {
                    resolve(result)
                } else {
                    resolve(false)
                }
            })
        } catch (error) {
            resolve(error)
        }
    })
}


//Nguyễn Lê Hùng
async function GetResultCompare(MemberId1, MemberId2, DifferenceGeneration, Flag, Gender1, Gender2, resultCheck, currentIdMember1, currentIdMember2) {
    console.log('MemberId1: ' + MemberId1)
    console.log('MemberId2: ' + MemberId2)
    console.log('currentIdMember1: ' + currentIdMember1)
    console.log('currentIdMember2: ' + currentIdMember2)
    console.log('DifferenceGeneration: ' + DifferenceGeneration)
    try {
        if (MemberId1 == MemberId2) {
            let result = {};
            if (DifferenceGeneration == -1) {
                let result = await getParentId(currentIdMember1);
                if (currentIdMember2 != result.FatherID && currentIdMember2 != result.MotherID) {
                    result.result1 = "Con";
                    if (result.FatherID == null && result.MotherID == null) {
                        if (Gender1 == 1) {
                            result.result1 = "Con rể";
                        } else {
                            result.result1 = "Con dâu";
                        }
                    }
                    let idChild1 = await getMarried(currentIdMember1);
                    let idChild2 = await getChild(currentIdMember2);
                    if (idChild1 && idChild2) {
                        if (idChild2.some(child => (idChild1.husbandID && idChild1.husbandID === child.MemberID) || (idChild1.wifeID && idChild1.wifeID === child.MemberID))) {
                            if (Gender2 == 1) {
                                result.result2 = "Bố";
                            } else {
                                result.result2 = "Mẹ";
                            }
                        } else {
                            if (Gender2 == 1) {
                                result.result2 = "Bố dượng";
                            } else {
                                result.result2 = "Mẹ Kế";
                            }
                        }

                        return result;
                    }
                }

            } else if (DifferenceGeneration == 1) {
                let result = await getParentId(currentIdMember2);
                if (currentIdMember1 != result.FatherID && currentIdMember1 != result.MotherID) {
                    result.result2 = "Con";
                    console.log(result + JSON.stringify(result, null, 2))
                    if (result.FatherID == null && result.MotherID == null) {
                        if (Gender2 == 1) {
                            result.result2 = "Con rể";
                        } else {
                            result.result2 = "Con dâu";
                        }

                    }
                    let idChild1 = await getMarried(currentIdMember2);
                    let idChild2 = await getChild(currentIdMember1);
                    console.log('idChild1: ' + idChild1)
                    console.log('idChild2: ' + JSON.stringify(idChild2, null, 2))
                    if (idChild1 && idChild2) {
                        if (idChild2.some(child => (idChild1.husbandID && idChild1.husbandID === child.MemberID) || (idChild1.wifeID && idChild1.wifeID === child.MemberID))) {
                            console.log("vào if")
                            if (Gender1 == 1) {
                                result.result1 = "Bố";
                            } else {
                                result.result1 = "Mẹ";
                            }
                        } else {
                            console.log("vào else")
                            if (Gender1 == 1) {
                                result.result1 = "Bố dượng";
                            } else {
                                result.result1 = "Mẹ Kế";
                            }
                        }

                        return result;
                    }
                }

            }
            result = await getResultCompareWithMemberID1SameID2(DifferenceGeneration, Gender1, Gender2);
            console.log('DifferenceGeneration: ' + DifferenceGeneration)
            console.log("Vào == nhau")
            console.log("Kết quả:", result);
            return result;
        }
        let checkMarriage = await checkMarriageRelationship(MemberId1, MemberId2)
        if (checkMarriage) {
            let result = await getResultCompareInFamily(DifferenceGeneration, Gender1, Gender2);
            console.log('DifferenceGeneration: ' + DifferenceGeneration)
            console.log("vào check married")
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
            return await GetResultCompare(parentID1, parentID2, DifferenceGeneration, Flag, Gender1, Gender2, resultCheck);
        } else {
            console.log("Vào else này ")
            let getGeneration1 = await getBirthOrderByID(MemberId1);
            let getGeneration2 = await getBirthOrderByID(MemberId2);
            getGeneration1 = getGeneration1.BirthOrder
            getGeneration2 = getGeneration2.BirthOrder

            if (result1.FatherID != null && result2.FatherID != null && result1.MotherID != null && result2.MotherID != null) {
                if (result1.FatherID == result2.FatherID && result1.MotherID == result2.MotherID) {
                    let result = await getResultCompareToMember(DifferenceGeneration, getGeneration1, getGeneration2, Flag, Gender1, Gender2, resultCheck);
                    console.log("vào if 1")
                    console.log("Kết quả:", result);
                    return result;
                } else {
                    console.log("vào if 2")
                    let BirthOrder1 = await getDateOfBirth(MemberId1);
                    let BirthOrder2 = await getDateOfBirth(MemberId2);
                    if (!BirthOrder1 || !BirthOrder2) {
                        let result = {};
                        result.result1 = "Không có dữ liệu ngày sinh để xác định mối quan hệ";
                        result.result2 = "Không đủ dữ liệu ngày sinh để xác định mối quan hệ";
                        return result;
                    } else {
                        let result = await getResultCompareToMember(DifferenceGeneration, BirthOrder1, BirthOrder2, Flag, Gender1, Gender2, resultCheck);
                        console.log("Kết quả:", result);
                        return result;
                    }

                }
            } else {
                console.log("vào else 2")
                console.log('FatherID1: ' + result1.FatherID)
                console.log('FatherID2: ' + result2.FatherID)
                console.log('MotherID1: ' + result1.MotherID)
                console.log('MotherID2: ' + result2.MotherID)
                if (result1.FatherID == result2.FatherID) {
                    if (result1.MotherID == result2.MotherID) {
                        let result = await getResultCompareToMember(DifferenceGeneration, getGeneration1, getGeneration2, Flag, Gender1, Gender2, resultCheck);
                        console.log("Kết quả:", result);
                        return result;
                    } else {
                        let result = {};
                        result.result1 = "Không đủ dữ liệu để xác định mối quan hệ";
                        result.result2 = "Không đủ dữ liệu để xác định mối quan hệ";
                        return result;
                    }
                } else if (result1.MotherID == result2.MotherID) {
                    if (result1.FatherID == result2.FatherID) {
                        let result = await getResultCompareToMember(DifferenceGeneration, getGeneration1, getGeneration2, Flag, Gender1, Gender2, resultCheck);
                        console.log("Kết quả:", result);
                        return result;
                    } else {
                        let result = {};
                        result.result1 = "Không đủ dữ liệu để xác định mối quan hệ";
                        result.result2 = "Không đủ dữ liệu để xác định mối quan hệ";
                        return result;
                    }
                }
            }

        }

    } catch (error) {
        console.log("Lỗi:", error);
        return "Có lỗi xảy ra";
    }
}

module.exports = {
    getGenerationByID, GetResultCompare, getIdToCompare, checkBrideOrGroom, checkMaternalOrPaternal
}