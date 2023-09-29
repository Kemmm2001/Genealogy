const FamilyTreeService = require("../../service/FamilyGenealogy/ViewFamilyTree");

// Ví dụ
//method get là req.query.
//method post là req.body.
var AllReligion = async (req, res) => {
    try {
        let data = await FamilyTreeService.getAllReligion();
        console.log(data)
        res.send(data);
    } catch (e) {
        res.send(e);
    }
};
var informationMember = async (req, res) => {
    let id = req.query.memberId
    let data = {}
    try {
        data.infor = await FamilyTreeService.getInforMember(id);
        console.log(data)
        data.contact = await FamilyTreeService.getContactMember(id);
        data.job = await FamilyTreeService.getJobMember(id);
        data.education = await FamilyTreeService.getEducationMember(id);
        data.event = await FamilyTreeService.getEventMember(id);
        res.send(data)
    } catch (e) {
        res.send(e);
    }
}



module.exports = {
    AllReligion, informationMember
};