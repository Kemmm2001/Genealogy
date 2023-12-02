const JobManagementService = require('../../service/FamilyGenealogy/JobManagement')
const Response = require("../../Utils/Response");


//Nguyễn Lê Hùng
var ViewJobMember = async (req, res) => {
    try {
        let MemberId = req.query.MemberId;
        let data = await JobManagementService.GetAllJobByMemberID(MemberId)
        res.send(data);
    } catch (e) {
        console.log(e)
    }
}
//Nguyễn Lê Hùng
var InsertJobMember = async (req, res) => {
    try {
        let ObjData = {};
        ObjData.memberId = req.body.memberId;
        ObjData.Organization = req.body.Organization;
        ObjData.OrganizationAddress = req.body.OrganizationAddress;
        ObjData.Role = req.body.Role;
        ObjData.JobName = req.body.JobName;
        ObjData.StartDate = req.body.StartDate;
        ObjData.EndDate = req.body.EndDate;
        await JobManagementService.AddJobByMemberID(ObjData);
        res.send("Insert successfully")
    } catch (e) {
        console.log(e);
    }
}
//Nguyễn Lê Hùng
var UpdateJobMember = async (req, res) => {
    try {
        let ObjData = {};
        ObjData.JobID = req.body.JobID;
        ObjData.Organization = req.body.Organization;
        ObjData.OrganizationAddress = req.body.OrganizationAddress;
        ObjData.Role = req.body.Role;
        ObjData.JobName = req.body.JobName;
        ObjData.StartDate = req.body.StartDate;
        ObjData.EndDate = req.body.EndDate;
        await JobManagementService.UpdateJobByID(ObjData);
        res.send("Update successfully")
    } catch (e) {
        console.log(e);
    }
}
//Nguyễn Lê Hùng
var RemoveJobMember = async (req, res) => {
    try {
        let JobID = req.query.JobID;
        await JobManagementService.DeleteJobByID(JobID);
        res.send("Remove successfully")
    } catch (e) {
        console.log(e);
    }
}
//Nguyễn Lê Hùng
var RemoveListJobMember = async (req, res) => {
    try {
        let memberID = req.query.MemberID;
        let data = await JobManagementService.DeleteListJobByID(memberID);
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
    ViewJobMember, InsertJobMember, UpdateJobMember, RemoveJobMember, RemoveListJobMember
}