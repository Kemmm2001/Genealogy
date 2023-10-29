const EducationManagementService = require('../../service/FamilyGenealogy/EducationManagement')

var ViewEducation = async (req, res) => {
    try {
        let memberId = req.query.memberId;
        let data = await EducationManagementService.getEducationByMemberId(memberId);
        res.send(data)
    } catch (e) {
        console.log(e)
    }
}
var InsertEducationMember = async (req, res) => {
    try {
        let ObjData = {}
        ObjData.MemberID = req.body.MemberID;
        ObjData.School = req.body.School;
        ObjData.Description = req.body.Description;
        ObjData.StartDate = req.body.StartDate;
        ObjData.EndDate = req.body.EndDate;
        let data = await EducationManagementService.InsertEducation(ObjData);
        res.send(data)
    } catch (e) {
        console.log(e)
    }
}

var UpdateEducationMember = async (req, res) => {
    try {
        let ObjData = {}
        ObjData.School = req.body.School;
        ObjData.Description = req.body.Description;
        ObjData.StartDate = req.body.StartDate;
        ObjData.EndDate = req.body.EndDate;
        ObjData.EducationID = req.body.EducationID;
        let data = await EducationManagementService.UpdateEducation(ObjData);
        res.send(data)
    } catch (e) {
        console.log(e)
    }
}

var RemoveEducationMember = async (req, res) => {
    try {
        let EducationID = req.query.EducationID;
        await EducationManagementService.RemoveEducation(EducationID);
    } catch (e) {
        console.log(e)
    }
}

var RemoveListEducationMember = async (req, res) => {
    try {
        let memberID = req.query.memberID;
        await EducationManagementService.RemoveListEducation(memberID);
    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    ViewEducation, InsertEducationMember, UpdateEducationMember, RemoveEducationMember,RemoveListEducationMember
}