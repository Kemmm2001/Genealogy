
// Import the database connection
const db = require("../../Models/ConnectDB");

// Create a new marriage record
const addMarriage = (data) => {
    return new Promise((resolve, reject) => {
        try {
            const { husbandID, wifeID, codeID } = data;
            const query = "INSERT INTO marriage (husbandID, wifeID, codeID) VALUES (?, ?, ?)";
            const values = [husbandID, wifeID, codeID];
            db.connection.query(query, values, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }else{
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
    try {
        const { husbandID, wifeID, codeID, marriageID } = data;
        const query = "UPDATE marriage SET husbandID = ?, wifeID = ?, codeID = ? WHERE marriageID = ?";
        const values = [husbandID, wifeID, codeID, marriageID];
        const result = db.connection.query(query, values);
        return result;
    } catch (error) {
        throw error;
    }
};

// Delete a marriage record
const deleteMarriage = async (marriageID) => {
    try {
        const query = "DELETE FROM marriage WHERE marriageID = ?";
        const values = [marriageID];
        const result = db.connection.query(query, values);
        return result;
    } catch (error) {
        throw error;
    }
};

// Get all marriage records
const getAllMarriages = async () => {
    try {
        const query = "SELECT * FROM marriage";
        const result = db.connection.query(query);
        return result;
    } catch (error) {
        throw error;
    }
};

// Get a marriage record by husbandID
const getMarriageByHusbandID = async (husbandID) => {
    try {
        const query = "SELECT * FROM marriage WHERE husbandID = ?";
        const values = [husbandID];
        const result = db.connection.query(query, values);
        return result;
    } catch (error) {
        throw error;
    }
};

// Get a marriage record by wifeID
const getMarriageByWifeID = async (wifeID) => {
    try {
        const query = "SELECT * FROM marriage WHERE wifeID = ?";
        const values = [wifeID];
        const result = db.connection.query(query, values);
        return result;
    } catch (error) {
        throw error;
    }
};

// Get a marriage record by codeID
const getMarriageByCodeID = async (codeID) => {
    try {
        const query = "SELECT * FROM marriage WHERE codeID = ?";
        const values = [codeID];
        const result = db.connection.query(query, values);
        return result;
    } catch (error) {
        throw error;
    }
};

// Get a marriage record by marriageID
const getMarriageByMarriageID = async (marriageID) => {
    try {
        const query = "SELECT * FROM marriage WHERE marriageID = ?";
        const values = [marriageID];
        const result = db.connection.query(query, values);
        return result;
    } catch (error) {
        throw error;
    }
};

// Get a marriage record by husbandID and wifeID
const getMarriageByHusbandIDAndWifeID = async (husbandID, wifeID) => {
    try {
        const query = "SELECT * FROM marriage WHERE husbandID = ? AND wifeID = ?";
        const values = [husbandID, wifeID];
        const result = db.connection.query(query, values);
        return result;
    } catch (error) {
        throw error;
    }
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
