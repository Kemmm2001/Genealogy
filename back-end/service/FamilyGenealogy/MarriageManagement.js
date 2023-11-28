
// Import the database connection
const db = require("../../Models/ConnectDB");

// Create a new marriage record
const addMarriage = async (data) => {
    try {
        const { husbandID, wifeID, codeID } = data;
        const query = "INSERT INTO Marriage (husbandID, wifeID, codeID) VALUES (?, ?, ?)";
        const values = [husbandID, wifeID, codeID];
        const result = await db.connection.query(query, values);
        return result;
    } catch (error) {
        throw error;
    }
};

// Update a marriage record
const updateMarriage = async (data) => {
    try {
        const { husbandID, wifeID, codeID, marriageID } = data;
        const query = "UPDATE Marriage SET husbandID = ?, wifeID = ?, codeID = ? WHERE marriageID = ?";
        const values = [husbandID, wifeID, codeID, marriageID];
        const result = await db.connection.query(query, values);
        return result;
    } catch (error) {
        throw error;
    }
};

// Delete a marriage record
const deleteMarriage = async (marriageID) => {
    try {
        const query = "DELETE FROM Marriage WHERE marriageID = ?";
        const values = [marriageID];
        const result = await db.connection.query(query, values);
        return result;
    } catch (error) {
        throw error;
    }
};

// Get all marriage records
const getAllMarriages = async () => {
    try {
        const query = "SELECT * FROM Marriage";
        const result = await db.connection.query(query);
        return result;
    } catch (error) {
        throw error;
    }
};

// Get a marriage record by husbandID
const getMarriageByHusbandID = async (husbandID) => {
    try {
        const query = "SELECT * FROM Marriage WHERE husbandID = ?";
        const values = [husbandID];
        const result = await db.connection.query(query, values);
        return result;
    } catch (error) {
        throw error;
    }
};

// Get a marriage record by wifeID
const getMarriageByWifeID = async (wifeID) => {
    try {
        const query = "SELECT * FROM Marriage WHERE wifeID = ?";
        const values = [wifeID];
        const result = await db.connection.query(query, values);
        return result;
    } catch (error) {
        throw error;
    }
};

// Get a marriage record by codeID
const getMarriageByCodeID = async (codeID) => {
    try {
        const query = "SELECT * FROM Marriage WHERE codeID = ?";
        const values = [codeID];
        const result = await db.connection.query(query, values);
        return result;
    } catch (error) {
        throw error;
    }
};

// Get a marriage record by marriageID
const getMarriageByMarriageID = async (marriageID) => {
    try {
        const query = "SELECT * FROM Marriage WHERE marriageID = ?";
        const values = [marriageID];
        const result = await db.connection.query(query, values);
        return result;
    } catch (error) {
        throw error;
    }
};

// Get a marriage record by husbandID and wifeID
const getMarriageByHusbandIDAndWifeID = async (husbandID, wifeID) => {
    try {
        const query = "SELECT * FROM Marriage WHERE husbandID = ? AND wifeID = ?";
        const values = [husbandID, wifeID];
        const result = await db.connection.query(query, values);
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
