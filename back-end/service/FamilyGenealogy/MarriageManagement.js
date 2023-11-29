
// Import the database connection
const db = require("../../Models/ConnectDB");

// Create a new marriage record
const addMarriage = (data) => {
    return new Promise((resolve, reject) => {
        try {
            const { husbandID, wifeID, codeID, MarriageNumber } = data;
            const query = "INSERT INTO marriage (husbandID, wifeID, codeID, MarriageNumber) VALUES (?,?, ?, ?)";
            const values = [husbandID, wifeID, codeID, MarriageNumber];
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
                    resolve(result);
                }
            });
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
};

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
};
