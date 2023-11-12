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
        name: "Ông",
        id: 0
    },
    {
        name: "Bà",
        id: 1
    },
    {
        name: "Ông Con nhà bác",
        id: 2
    },
    {
        name: "Bà con nhà bác",
        id: 3
    },
    {
        name: "Ông con nhà chú",
        id: 4
    },
    {
        name: "Bà con nhà chú",
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
        name: "Dượng(Chú)",
        id: 11
    },
    {
        name: "Cô",
        id: 12
    },
    {
        name: "Thím",
        id: 13
    },
    {
        name: "Anh",
        id: 14
    },
    {
        name: "Chị",
        id: 15
    },
    {
        name: "Em",
        id: 16
    },
    {
        name: "Cháu",
        id: 17
    },
    {
        name: "Con",
        id: 18
    }

]

function setResult(objResult, index1, index2) {
    objResult.result1 = PaternalFamily[index1].name;
    objResult.result2 = PaternalFamily[index2].name;
}

async function getResultCompareToMember(DefferenceGeneration, Generation1, Generation2, Flag1, Flag2, Gender1, Gender2) {
    console.log('Generation1: ' + Generation1.BirthOrder)
    console.log('Generation2: ' + Generation2.BirthOrder)
    console.log('DifferenceGeneration: ' + DefferenceGeneration)
    let objResult = {}
    if (DefferenceGeneration === 0) {
        if (Generation1.BirthOrder > Generation2.BirthOrder) {
            if (Gender1 == 1) {
                setResult(objResult, 16, 15);
            } else {
                setResult(objResult, 16, 14);
            }
            return objResult;
        } else {
            if (Gender1 == 1) {
                setResult(objResult, 14, 16);
            } else {
                setResult(objResult, 15, 16);
            }
            return objResult;
        }
    } else if (DefferenceGeneration < 0) {
        if (DefferenceGeneration == 1 || DefferenceGeneration == -1) {
            if (Generation1.BirthOrder > Generation2.BirthOrder) {
                if (Gender2 == 1) {
                    setResult(objResult, 17, 6);
                } else {
                    setResult(objResult, 17, 7);
                }
                return objResult;
            } else if (Generation1.BirthOrder < Generation2.BirthOrder) {
                if (Flag2 == true) {
                    if (Gender2 == 1) {
                        setResult(objResult, 17, 13);
                    } else {
                        setResult(objResult, 17, 11);
                    }
                } else {
                    if (Gender2 == 1) {
                        setResult(objResult, 17, 12);
                    } else {
                        setResult(objResult, 17, 10);
                    }
                }
                return objResult;
            } else if (Generation1.BirthOrder == Generation2.BirthOrder) {
                if (Gender2 == 1) {
                    setResult(objResult, 18, 8);
                } else {
                    setResult(objResult, 18, 9);
                }
                return objResult;
            }
        }
        if (DefferenceGeneration == 2 || DefferenceGeneration == -2) {
            if (Generation1.BirthOrder > Generation2.BirthOrder) {
                if (Gender2 == 1) {
                    setResult(objResult, 17, 3);
                } else {
                    setResult(objResult, 17, 2);
                }
                return objResult;
            } else if (Generation1.BirthOrder < Generation2.BirthOrder) {
                if (Gender2 == 1) {
                    setResult(objResult, 17, 5);
                } else {
                    setResult(objResult, 17, 4);
                }
                return objResult;
            }
            else if (Generation1.BirthOrder == Generation2.BirthOrder) {
                if (Gender2 == 1) {
                    setResult(objResult, 17, 1);
                } else {
                    setResult(objResult, 17, 0);
                }
                return objResult;
            }
        }
    }
    else if (DefferenceGeneration > 0) {
        if (DefferenceGeneration == 1 || DefferenceGeneration == -1) {
            if (Generation1.BirthOrder > Generation2.BirthOrder) {
                if (Flag1 == true) {
                    if (Gender1 == 1) {
                        objResult.result1 = PaternalFamily[13].name;
                        objResult.result2 = PaternalFamily[17].name;
                    } else {
                        objResult.result1 = PaternalFamily[10].name;
                        objResult.result2 = PaternalFamily[17].name;
                    }
                }
                return objResult;
            } else if (Generation1.BirthOrder < Generation2.BirthOrder) {
                if (Gender1 == 1) {
                    objResult.result1 = PaternalFamily[6].name;
                    objResult.result2 = PaternalFamily[17].name;
                }
                else {
                    objResult.result1 = PaternalFamily[7].name;
                    objResult.result2 = PaternalFamily[17].name;
                }
                return objResult;
            } else if (Generation1.BirthOrder == Generation2.BirthOrder) {
                if (Gender1 == 1) {
                    setResult(objResult, 18, 8);
                } else {
                    setResult(objResult, 18, 9);
                }
                return objResult;
            }
        }
        if (DefferenceGeneration == 2 || DefferenceGeneration == -2) {
            if (Generation1.BirthOrder > Generation2.BirthOrder) {
                if (Gender1 == 1) {
                    objResult.result1 = PaternalFamily[5].name;
                    objResult.result2 = PaternalFamily[17].name;
                } else {
                    objResult.result1 = PaternalFamily[4].name;
                    objResult.result2 = PaternalFamily[17].name;
                }
                return objResult;
            } else if (Generation1.BirthOrder < Generation2.BirthOrder) {
                if (Gender1 == 1) {
                    objResult.result1 = PaternalFamily[3].name;
                    objResult.result2 = PaternalFamily[17].name;
                } else {
                    objResult.result1 = PaternalFamily[2].name;
                    objResult.result2 = PaternalFamily[17].name;
                }
                return objResult;
            }
            else if (Generation1.BirthOrder == Generation2.BirthOrder) {
                if (Gender1 == 1) {
                    setResult(objResult, 1, 17);
                } else {
                    setResult(objResult, 0, 17);
                }
                return objResult;
            }
        }
    }
    return "Không xác định";
}

async function GetResultCompare(MemberId1, MemberId2, DifferenceGeneration, Flag1, Flag2, Gender1, Gender2) {
    try {
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
            return await GetResultCompare(parentID1, parentID2, DifferenceGeneration, Flag1, Flag2);
        } else {
            const getGeneration1 = await getBirthOrderByID(MemberId1);
            const getGeneration2 = await getBirthOrderByID(MemberId2);

            const result = await getResultCompareToMember(DifferenceGeneration, getGeneration1, getGeneration2, Flag1, Flag2, Gender1, Gender2);
            console.log("Kết quả:", result);
            return result;
        }
    } catch (error) {
        console.log("Lỗi:", error);
        return "Có lỗi xảy ra";
    }
}

module.exports = {
    getGenerationByID, GetResultCompare, getIdToCompare, isInLaw
}