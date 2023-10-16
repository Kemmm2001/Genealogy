const FamilyHeadManagementService = require('../../service/InformationGenealogy/ManagementFamilyHead')

var ListFamilyHead = async (req, res) => {
    console.log("đã vào");
    try {
        let CodeID = req.query.CodeID;
        let data = await FamilyHeadManagementService.getAllFamilyHead(CodeID);
        res.send(data);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    ListFamilyHead
}