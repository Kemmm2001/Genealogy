const EducationManagementService = require('../../service/FamilyGenealogy/EducationManagement')
const Response = require("../../Utils/Response");
//Nguyễn Lê Hùng
var ViewEducation = async (req, res) => {
    try {
        let memberId = req.query.memberId;
        let data = await EducationManagementService.getEducationByMemberId(memberId);
        res.send(data)
    } catch (e) {
        console.log(e)
    }
}
//Nguyễn Lê Hùng
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


//Nguyễn Lê Hùng
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

//Nguyễn Lê Hùng
var RemoveEducationMember = async (req, res) => {
    try {
        let EducationID = req.query.EducationID;
        await EducationManagementService.RemoveEducation(EducationID);
    } catch (e) {
        console.log(e)
    }
}

//Nguyễn Lê Hùng
var RemoveListEducationMember = async (req, res) => {
    try {
        let memberID = req.query.MemberID;
        let data = await EducationManagementService.RemoveListEducation(memberID);
        if (data) {
            return res.send(Response.successResponse())
        } else {
            return res.send(Response.dataNotFoundResponse())
        }
    } catch (error) {
        return res.send(Response.dataNotFoundResponse(error))
    }
}



module.exports = {
    ViewEducation, InsertEducationMember, UpdateEducationMember, RemoveEducationMember, RemoveListEducationMember
}