const ContactManagementService = require('../../service/FamilyGenealogy/ContactManagement');
const Response = require("../../Utils/Response");


//Nguyễn Lê Hùng
var ViewContactMember = async (req, res) => {
    try {
        let memberId = req.query.memberId;
        console.log(memberId)
        let data = await ContactManagementService.GetContactByMemberID(memberId);
        res.send(data);
    } catch (e) {
        console.log(e)
    }
}
//Nguyễn Lê Hùng
var InsertContactMember = async (req, res) => {
    try {
        let objData = {};
        objData.memberId = req.body.memberId;
        objData.Address = req.body.Address;
        objData.Phone = req.body.Phone;
        objData.Email = req.body.Email;
        objData.FacebookUrl = req.body.FacebookUrl;
        objData.Zalo = req.body.Zalo;
        await ContactManagementService.InsertContactMember(objData);
        res.send("Add successfully")
    } catch (e) {
        console.log(e)
    }

}
//Nguyễn Lê Hùng
var updateContactMember = async (req, res) => {
    try {
        let objData = {};
        objData.memberId = req.body.MemberID;
        objData.Address = req.body.Address;
        objData.Phone = req.body.Phone;
        objData.Email = req.body.Email;
        objData.FacebookUrl = req.body.FacebookUrl;
        objData.Zalo = req.body.Zalo;
        let GetConTactByMemberID = await ContactManagementService.GetContactByMemberID(req.body.MemberID);
        if (GetConTactByMemberID.length > 0) {
            await ContactManagementService.UpdateContactByID(objData);
        } else {
            await ContactManagementService.InsertContactMember(objData)
        }
        res.send("Update successfully")
    } catch (e) {
        console.log(e)
    }
}
//Nguyễn Lê Hùng
var removeContactMember = async (req, res) => {
    try {
        let memberID = req.query.MemberID;
        let data = await ContactManagementService.RemoveContactByID(memberID);
        if (data) {
            return res.send(Response.successResponse())
        } else {
            return res.send(Response.dataNotFoundResponse())
        }
    } catch (e) {
        return res.send(Response.dataNotFoundResponse(e))
    }
}



module.exports = {
    ViewContactMember, InsertContactMember, updateContactMember, removeContactMember
}