const ContactManagementService = require('../../service/FamilyGenealogy/ContactManagement');

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

var InsertContactMember = async (req, res) => {
    try {
        let objData = {};
        objData.memberId = req.body.memberId;
        objData.Address = req.body.Address;
        objData.Phone1 = req.body.Phone1;
        objData.Phone2 = req.body.Phone2;
        objData.Email1 = req.body.Email1;
        objData.Email2 = req.body.Email2;
        objData.FacebookUrl = req.body.FacebookUrl;
        objData.Zalo = req.body.Zalo;
        await ContactManagementService.InsertContactMember(objData);
        res.send("Add successfully")
    } catch (e) {
        console.log(e)
    }

}

var updateContactMember = async (req, res) => {
    try {
        let objData = {};
        objData.ContactID = req.body.ContactID;
        objData.Address = req.body.Address;
        objData.Phone1 = req.body.Phone1;
        objData.Phone2 = req.body.Phone2;
        objData.Email1 = req.body.Email1;
        objData.Email2 = req.body.Email2;
        objData.FacebookUrl = req.body.FacebookUrl;
        objData.Zalo = req.body.Zalo;
        await ContactManagementService.UpdateContactByID(objData);
        res.send("Update successfully")
    } catch (e) {
        console.log(e)
    }
}

var removeContactMember = async (req, res) => {
    try {
        let ContactID = req.query.ContactID;
        await ContactManagementService.RemoveContactByID(ContactID);
        res.send("remove successfully");
    } catch (e) {
        console.log(e)
    }
}



module.exports = {
    ViewContactMember, InsertContactMember, updateContactMember, removeContactMember
}