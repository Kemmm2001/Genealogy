const ContactManagementService = require('../../service/FamilyGenealogy/ContactManagement');
const Response = require("../../Utils/Response");


//Nguyễn Lê Hùng
var ViewContactMember = async (req, res) => {
    try {

        let memberId = req.query.memberId;
        let member = await ContactManagementService.findMember(memberId);
        if (member.length > 0) {
            let data = await ContactManagementService.GetContactByMemberID(memberId);
            res.send(data);
        } else {
            return res.send(Response.dataNotFoundResponse(null, 'không tìm thấy member'))
        }
    } catch (e) {
        console.log(e)
    }
}
//Nguyễn Lê Hùng
var InsertContactMember = async (req, res) => {
    try {
        let objData = {};
        let member = await ContactManagementService.findMember(req.body.memberId);
        console.log(member)
        if (member.length > 0) {
            objData.memberId = req.body.memberId;
            objData.Address = req.body.Address;
            objData.Phone = req.body.Phone;
            objData.Email = req.body.Email;
            objData.FacebookUrl = req.body.FacebookUrl;
            objData.Zalo = req.body.Zalo;
            let result = await ContactManagementService.InsertContactMember(objData);
            if (result) {
                return res.send(Response.successResponse())
            } else {
                return res.send(Response.internalServerErrorResponse())
            }
        } else {
            return res.send(Response.dataNotFoundResponse(null, 'không tìm thấy member'))
        }
    } catch (e) {
        console.log(e)
    }

}
//Nguyễn Lê Hùng
var updateContactMember = async (req, res) => {
    try {
        let objData = {};
        let member = await ContactManagementService.findMember(req.body.MemberID);
        if (member.length > 0) {
            objData.memberId = req.body.MemberID;
            objData.Address = req.body.Address;
            objData.Phone = req.body.Phone;
            objData.Email = req.body.Email;
            objData.FacebookUrl = req.body.FacebookUrl;
            objData.Zalo = req.body.Zalo;
            let GetConTactByMemberID = await ContactManagementService.GetContactByMemberID(req.body.MemberID);
            if (GetConTactByMemberID.length > 0) {
                let result = await ContactManagementService.UpdateContactByID(objData);
                if (result) {
                    return res.send(Response.successResponse(null, 'Update successfully'))
                } else {
                    return res.send(Response.internalServerErrorResponse())
                }
            } else {
                let result = await ContactManagementService.InsertContactMember(objData)
                if (result) {
                    return res.send(Response.successResponse(null, 'Update successfully'))
                } else {
                    return res.send(Response.internalServerErrorResponse())
                }
            }
        } else {
            return res.send(Response.dataNotFoundResponse(null, 'Không tìm thấy member'))
        }
    } catch (e) {
        return res.send(Response.dataNotFoundResponse())
    }
}
//Nguyễn Lê Hùng
var removeContactMember = async (req, res) => {
    try {
        let member = await ContactManagementService.findMember(req.body.MemberID);
        if (member.length > 0) {
            let memberID = req.query.MemberID;
            let data = await ContactManagementService.RemoveContactByID(memberID);
            if (data) {
                return res.send(Response.successResponse())
            } else {
                return res.send(Response.dataNotFoundResponse())
            }
        } else {
            return res.send(Response.dataNotFoundResponse(null, 'Không tìm thấy member'))
        }
    } catch (e) {
        return res.send(Response.dataNotFoundResponse(e))
    }
}



module.exports = {
    ViewContactMember, InsertContactMember, updateContactMember, removeContactMember
}