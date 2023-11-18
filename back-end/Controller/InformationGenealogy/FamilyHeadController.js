const FamilyHeadManagementService = require('../../service/InformationGenealogy/ManagementFamilyHead')
const Response = require("../../Utils/Response");

var ListFamilyHead = async (req, res) => {
    try {
        let CodeID = req.query.CodeID;
        let data = await FamilyHeadManagementService.getAllFamilyHead(CodeID);
        if (data) {
            return res.send(Response.successResponse(data))
        } else {
            return res.send(Response.dataNotFoundResponse())
        }
    } catch (error) {
        console.log(error)
    }
}


var ListFamilyHeadCanAdd = async (req, res) => {
    try {
        let CodeID = req.query.CodeID;
        let data = await FamilyHeadManagementService.getListFamilyHeadCanAdd(CodeID);
        if (data) {
            return res.send(Response.successResponse(data));
        } else {
            return res.send(Response.dataNotFoundResponse())
        }
    } catch (error) {
        console.log(error)
    }
}


var removeRoleFamilyHead = async (req, res) => {
    try {
        let memberId = req.query.memberId;
        await FamilyHeadManagementService.removeFamilyHead(memberId);
        res.send("remove successfuly");
    } catch (e) {
        res.send(e)
    }
}



module.exports = {
    ListFamilyHead, removeRoleFamilyHead, ListFamilyHeadCanAdd
}