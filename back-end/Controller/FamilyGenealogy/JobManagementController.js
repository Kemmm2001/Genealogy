const JobManagementService = require('../../service/FamilyGenealogy/JobManagement')
const Response = require("../../Utils/Response");


//Nguyễn Lê Hùng
var ViewJobMember = async (req, res) => {
    try {
        let MemberId = req.query.MemberId;
        let member = await JobManagementService.findMember(MemberId)
        if (member.length > 0) {
            let data = await JobManagementService.GetAllJobByMemberID(MemberId);
            return res.send(Response.successResponse(data))
        } else {
            return res.send(Response.dataNotFoundResponse(null, 'Không tìm thấy member'))
        }
    } catch (e) {
        return res.send(Response.dataNotFoundResponse())
    }
}
//Nguyễn Lê Hùng
var InsertJobMember = async (req, res) => {
    try {
        let ObjData = {};      
        let member = await JobManagementService.findMember(req.body.memberId);        
        if (member.length > 0) {
            ObjData.memberId = req.body.memberId;
            ObjData.Organization = req.body.Organization;
            ObjData.OrganizationAddress = req.body.OrganizationAddress;
            ObjData.Role = req.body.Role;
            ObjData.JobName = req.body.JobName;
            ObjData.StartDate = req.body.StartDate;
            ObjData.EndDate = req.body.EndDate;
            let result = await JobManagementService.AddJobByMemberID(ObjData);
            if (result) {
                return res.send(Response.successResponse(null, 'Thêm thông tin nghề nghiệp thành công'))
            } else {
                return res.send(Response.internalServerErrorResponse())
            }
        } else {
            return res.send(Response.dataNotFoundResponse(null, 'Không tìm thấy member'))
        }
    } catch (e) {
        return res.send(Response.dataNotFoundResponse())
    }
}
//Nguyễn Lê Hùng
var UpdateJobMember = async (req, res) => {
    try {
        let ObjData = {};
        let job = await JobManagementService.findJob(req.body.JobID);
        console.log('job: ' + job.length)
        if (job.length > 0) {
            ObjData.JobID = req.body.JobID;
            ObjData.Organization = req.body.Organization;
            ObjData.OrganizationAddress = req.body.OrganizationAddress;
            ObjData.Role = req.body.Role;
            ObjData.JobName = req.body.JobName;
            ObjData.StartDate = req.body.StartDate;
            ObjData.EndDate = req.body.EndDate;
            let result = await JobManagementService.UpdateJobByID(ObjData);
            if (result) {
                return res.send(Response.successResponse(null, "Sửa thông tin nghề nghiệp thành công"))
            } else {
                return res.send(Response.internalServerErrorResponse())
            }
        } else {
            return res.send(Response.dataNotFoundResponse(null, 'Không tìm thấy job'))
        }
    } catch (e) {
        return res.send(Response.internalServerErrorResponse())
    }
}
//Nguyễn Lê Hùng
var RemoveJobMember = async (req, res) => {
    try {
        let JobID = req.query.JobID;
        let job = await JobManagementService.findJob(JobID);
        if (job.length > 0) {
            let result = await JobManagementService.DeleteJobByID(JobID);
            if (result) {
                return res.send(Response.successResponse(null, 'Xóa thông tin nghề nghiệp thành công'))
            } else {
                return res.send(Response.internalServerErrorResponse())
            }
        } else {
            return res.send(Response.dataNotFoundResponse(null, 'Không tìm thấy job'))
        }
    } catch (e) {
        return res.send(Response.internalServerErrorResponse())
    }
}
//Nguyễn Lê Hùng
var RemoveListJobMember = async (req, res) => {
    try {
        let memberID = req.query.MemberID;
        let member = await JobManagementService.findMember(memberID);
        if (member.length > 0) {
            let data = await JobManagementService.DeleteListJobByID(memberID);
            if (data) {
                return res.send(Response.successResponse())
            } else {
                return res.send(Response.dataNotFoundResponse())
            }
        } else {
            return res.send(Response.dataNotFoundResponse(null, 'Không tìm thấy member'))
        }
    } catch (error) {
        return res.send(Response.dataNotFoundResponse())
    }
}


module.exports = {
    ViewJobMember, InsertJobMember, UpdateJobMember, RemoveJobMember, RemoveListJobMember
}