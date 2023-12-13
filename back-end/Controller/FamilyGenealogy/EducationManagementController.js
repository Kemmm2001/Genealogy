const EducationManagementService = require('../../service/FamilyGenealogy/EducationManagement')
const Response = require("../../Utils/Response");
//Nguyễn Lê Hùng
var ViewEducation = async (req, res) => {
    try {        
        let member = await EducationManagementService.findMember(req.query.memberId);        
        if (member.length > 0) {
            let memberId = req.query.memberId;
            let data = await EducationManagementService.getEducationByMemberId(memberId);
            console.log('data: ' + data[0])
            if (data.length > 0) {
                return res.send(Response.successResponse(data))
            } else {
                return res.send(Response.internalServerErrorResponse())
            }
        } else {
            return res.send(Response.internalServerErrorResponse())
        }
    } catch (e) {
        console.log(e)
    }
}
//Nguyễn Lê Hùng
var InsertEducationMember = async (req, res) => {
    try {
        let member = await EducationManagementService.findMember(req.body.MemberID)
        console.log('id: ' + req.body.MemberID)
        if (member.length > 0) {
            let ObjData = {}
            ObjData.MemberID = req.body.MemberID;
            ObjData.School = req.body.School;
            ObjData.Description = req.body.Description;
            ObjData.StartDate = req.body.StartDate;
            ObjData.EndDate = req.body.EndDate;
            let data = await EducationManagementService.InsertEducation(ObjData);
            if (data) {
                return res.send(Response.successResponse(data, 'Thêm thông tin giáo dục thành công'))
            } else {
                return res.send(Response.internalServerErrorResponse())
            }
        } else {
            return res.send(Response.dataNotFoundResponse(null, 'Không tìm thấy member'))
        }
    } catch (e) {
        console.log(e)
    }
}


//Nguyễn Lê Hùng
var UpdateEducationMember = async (req, res) => {
    try {
        let ObjData = {}
        let education = await EducationManagementService.findEducation(req.body.EducationID)
        if (education.length > 0) {
            ObjData.School = req.body.School;
            ObjData.Description = req.body.Description;
            ObjData.StartDate = req.body.StartDate;
            ObjData.EndDate = req.body.EndDate;
            ObjData.EducationID = req.body.EducationID;
            let data = await EducationManagementService.UpdateEducation(ObjData);
            if (data) {
                return res.send(Response.successResponse(null, "Sửa thông tin giáo dục thành công"))
            } else {
                return res.send(Response.internalServerErrorResponse())
            }
        } else {
            return res.send(Response.dataNotFoundResponse(null, 'Education ko tìm thấy'))
        }
    } catch (e) {
        console.log(e)
    }
}

//Nguyễn Lê Hùng
var RemoveEducationMember = async (req, res) => {
    try {
        let EducationID = req.query.EducationID;
        let education = await EducationManagementService.findEducation(EducationID);
        if (education.length > 0) {
            let result = await EducationManagementService.RemoveEducation(EducationID);
            if (result) {
                return res.send(Response.successResponse())
            } else {
                return res.send(Response.internalServerErrorResponse())
            }
        } else {
            return res.send(Response.dataNotFoundResponse(null, "Không tìm thấy education"))
        }

    } catch (e) {
        console.log(e)
    }
}

//Nguyễn Lê Hùng
var RemoveListEducationMember = async (req, res) => {
    try {
        let memberID = req.query.MemberID;
        let member = EducationManagementService.findMember(memberID);
        if (member.length > 0) {
            let data = await EducationManagementService.RemoveListEducation(memberID);
            if (data) {
                return res.send(Response.successResponse())
            } else {
                return res.send(Response.dataNotFoundResponse())
            }
        } else {
            return res.send(Response.dataNotFoundResponse(null, 'Không tìm thấy member'))
        }
    } catch (error) {
        return res.send(Response.dataNotFoundResponse(error))
    }
}



module.exports = {
    ViewEducation, InsertEducationMember, UpdateEducationMember, RemoveEducationMember, RemoveListEducationMember
}