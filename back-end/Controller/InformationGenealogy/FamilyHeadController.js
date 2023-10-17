const FamilyHeadManagementService = require('../../service/InformationGenealogy/ManagementFamilyHead')

var ListFamilyHead = async (req, res) => {   
    try {
        let CodeID = req.query.CodeID;
        let data = await FamilyHeadManagementService.getAllFamilyHead(CodeID);
        res.send(data);
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
    ListFamilyHead, removeRoleFamilyHead
}