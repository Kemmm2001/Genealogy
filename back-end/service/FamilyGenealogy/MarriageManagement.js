const db = require("../../Models/ConnectDB");

// nguyễn anh tuấn
// Create a new marriage record
const addMarriage = (data) => {
    return new Promise((resolve, reject) => {
        try {
            const { husbandID, wifeID, codeID, marriageNumber } = data;
            const query = "INSERT INTO marriage (husbandID, wifeID, codeID, MarriageNumber) VALUES (?,?, ?, ?)";
            const values = [husbandID, wifeID, codeID, marriageNumber];
            db.connection.query(query, values, (err, result) => {
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

// nguyễn anh tuấn
// Update a marriage record
const updateMarriage = async (data) => {
    return new Promise((resolve, reject) => {
        try {
            const { husbandID, wifeID, codeID, MarriageNumber, marriageID } = data;
            const query = "UPDATE marriage SET husbandID = ?, wifeID = ?, codeID = ?, MarriageNumber = ? WHERE marriageID = ?";
            const values = [husbandID, wifeID, codeID, MarriageNumber, marriageID];
            db.connection.query(query, values, (err, result) => {
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
};

// nguyễn anh tuấn
// Delete a marriage record
const deleteMarriage = async (marriageID) => {
    return new Promise((resolve, reject) => {
        try {
            const query = "DELETE FROM marriage WHERE marriageID = ?";
            const values = [marriageID];
            db.connection.query(query, values, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    console.log(`Deleted successfully a marriage with id = ${marriageID}`);
                    resolve(result);
                }
            });
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};

// nguyễn anh tuấn
// Get all marriage records
const getAllMarriages = async () => {
    return new Promise((resolve, reject) => {
        try {
            const query = "SELECT * FROM marriage";
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
};

// nguyễn anh tuấn
// Get a marriage record by husbandID
const getMarriageByHusbandID = async (husbandID) => {
    return new Promise((resolve, reject) => {
        try {
            const query = "SELECT * FROM marriage WHERE husbandID = ?";
            const values = [husbandID];
            db.connection.query(query, values, (err, result) => {
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
};

// nguyễn anh tuấn
// Get a marriage record by wifeID
const getMarriageByWifeID = async (wifeID) => {
    return new Promise((resolve, reject) => {
        try {
            const query = "SELECT * FROM marriage WHERE wifeID = ?";
            const values = [wifeID];
            db.connection.query(query, values, (err, result) => {
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
};

// nguyễn anh tuấn
// Get a marriage record by codeID
const getMarriageByCodeID = async (codeID) => {
    return new Promise((resolve, reject) => {
        try {
            const query = "SELECT * FROM marriage WHERE codeID = ?";
            const values = [codeID];
            db.connection.query(query, values, (err, result) => {
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
};

// nguyễn anh tuấn
// Get a marriage record by marriageID
const getMarriageByMarriageID = async (marriageID) => {
    return new Promise((resolve, reject) => {
        try {
            const query = "SELECT * FROM marriage WHERE marriageID = ?";
            const values = [marriageID];
            db.connection.query(query, values, (err, result) => {
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
};
const getMarriagesByMarriageID = async (listMarriageID) => {
   // truyền vào list id, dùng câu lệnh mysql in
    // SELECT * FROM marriage WHERE marriageID IN (1, 2, 3)
    return new Promise((resolve, reject) => {
        try {
            const query = "SELECT * FROM marriage WHERE marriageID IN (?)";
            const values = [listMarriageID];
            db.connection.query(query, values, (err, result) => {
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
};
// nguyễn anh tuấn
// Get a marriage record by husbandID or wifeID
const getMarriageByHusbandIDOrWifeID = async (husbandID, wifeID) => {
    return new Promise((resolve, reject) => {
        try {
            const query = "SELECT * FROM marriage WHERE husbandID = ? OR wifeID = ?";
            const values = [husbandID, wifeID];
            db.connection.query(query, values, (err, result) => {
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
};


// nguyễn anh tuấn
// Get a marriage record by husbandID and wifeID
const getMarriageByHusbandIDAndWifeID = async (husbandID, wifeID) => {
    return new Promise((resolve, reject) => {
        try {
            const query = "SELECT * FROM marriage WHERE husbandID = ? AND wifeID = ?";
            const values = [husbandID, wifeID];
            db.connection.query(query, values, (err, result) => {
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
};

// nguyễn anh tuấn
// lấy số lần kết hôn của chồng
const getHusbandMaxMarriageNumber = async (husbandID, codeID) => {
    return new Promise((resolve, reject) => {
        try {
            const query = "SELECT MAX(MarriageNumber) AS MaxMarriageNumber FROM marriage WHERE husbandID = ? AND codeID = ?";
            const values = [husbandID, codeID];
            db.connection.query(query, values, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(result[0].MaxMarriageNumber);
                }
            });
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};

// nguyễn anh tuấn
// lấy số lần kết hôn của vợ
const getWifeMaxMarriageNumber = async (wifeID, codeID) => {
    return new Promise((resolve, reject) => {
        try {
            const query = "SELECT MAX(MarriageNumber) AS MaxMarriageNumber FROM marriage WHERE wifeID = ? AND codeID = ?";
            const values = [wifeID, codeID];
            db.connection.query(query, values, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(result[0].MaxMarriageNumber);
                }
            });
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};


// Export the CRUD operations
module.exports = {
    addMarriage,
    updateMarriage,
    deleteMarriage,
    getAllMarriages,
    getMarriageByHusbandID,
    getMarriageByWifeID,
    getMarriageByCodeID,
    getMarriageByMarriageID,
    getMarriageByHusbandIDAndWifeID,
    getMarriageByHusbandIDOrWifeID,
    getHusbandMaxMarriageNumber,
    getWifeMaxMarriageNumber,
    getMarriagesByMarriageID
};
