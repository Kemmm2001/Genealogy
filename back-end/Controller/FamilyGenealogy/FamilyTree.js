const FamilyTreeService = require("../../service/FamilyGenealogy/ViewFamilyTree");
const Response = require("../../Utils/Response");

// Ví dụ
var AllReligion = async (req, res) => {
    try {
        let data = await FamilyTreeService.getAllReligion();
        res.send(data);
    } catch (e) {
        res.send(e);
    }
};
var AllNationality = async (req, res) => {
    try {
        let data = await FamilyTreeService.getAllNationality();
        res.send(data)
    } catch (e) {
        res.send(e);
    }
}
var GetIdPaternalAncestor = async (req, res) => {
    try {
        let CodeId = req.query.CodeId;
        let data = await FamilyTreeService.GetIdPaternalAncestor(CodeId);
        res.send(data)
    } catch (error) {
        console.log(error)
    }
}

var getAllUnspecifiedMembers = async (req, res) => {
    try {
        let CodeID = req.query.CodeID;
        let data = await FamilyTreeService.getListUnspecifiedMembers(CodeID);
        res.send(data)
    } catch (err) {
        res.send(err);
    }
}
var getRelationShipMember = async (req, res) => {
    try {
        let memberID = req.query.memberID;
        let CodeID = req.query.CodeID;
        let data = await FamilyTreeService.RelationShipMember(CodeID, memberID);
        if (data == null || data.length == 0) {
            return res.send(Response.dataNotFoundResponse());
        }
        return res.send(Response.successResponse(data));
    } catch (error) {
        console.log("Error: " + error);
        return res.send(Response.internalServerErrorResponse(error));
    }
}

var removeRelationship = async (req, res) => {
    try {
        let currentID = req.body.CurrentID;
        let memberToRemove = req.body.RemoveID;
        let action = req.body.action;
        console.log('currentID: ' + currentID)
        console.log('memberToRemove: ' + memberToRemove)
        if (action == 'RemoveChild') {
            let data = await FamilyTreeService.RemoveRelationshipChild(memberToRemove);
            if (data == true) {
                return res.send(Response.successResponse());
            } else {
                return res.send(Response.internalServerErrorResponse());
            }
        } else if (action == 'RemoveMarried') {
            let data = await FamilyTreeService.RemoveRelationshipMarried(currentID, memberToRemove)            
            if (data == true) {
                return res.send(Response.successResponse());
            } else {
                return res.send(Response.internalServerErrorResponse());
            }
        } else if (action == 'RemoveParent') {
            let data = await FamilyTreeService.RemoveRelationshipParent(currentID, memberToRemove);
            if (data == true) {
                return res.send(Response.successResponse());
            } else {
                return res.send(Response.internalServerErrorResponse());
            }
        }
    } catch (error) {
        console.log(error)
        return res.send(Response.internalServerErrorResponse(error));
    }
}

var getListMessage = async (req, res) => {
    try {
        let CodeID = req.query.CodeID;
        let data = await FamilyTreeService.getListMessage(CodeID);
        res.send(data);
    } catch (error) {
        console.log(error);
        res.send(Response.internalServerErrorResponse(error));
    }
}

var getListHistoryEmail = async (req, res) => {
    try {
        let CodeID = req.query.CodeID;
        let data = await FamilyTreeService.getListNotificationEmail(CodeID);
        if (data) {
            return res.send(Response.successResponse(data))
        } else {
            return res.send(Response.dataNotFoundResponse());
        }
    } catch (error) {
        return res.send(Response.dataNotFoundResponse(error));
    }
}




var AllMemberInGenelogy = async (req, res) => {
    try {
        let CodeID = req.query.CodeID;
        let data = await FamilyTreeService.ViewFamilyTree(CodeID);
        if (data) {
            data.forEach((item) => {
                if (item.dod === '1-1-1970') {
                    item.dod = null;
                }
                if (item.dob === '1-1-1970') {
                    item.dob = null;
                }
            });
            return res.send(Response.successResponse(data));
        } else {
            return res.send(Response.dataNotFoundResponse());
        }
    } catch (e) {
        return res.send(Response.dataNotFoundResponse(e));
    }
}


var AllMemberRole = async (req, res) => {
    try {
        let id = req.query.memberId
        let data = await FamilyTreeService.getAllMemberRole(id);
        res.send(data)
    } catch (e) {
        res.send(e);
    }
}


var setRole = async (req, res) => {
    try {
        let memberId = req.body.memberId;
        let roleId = req.body.roleId;
        let CodeId = req.body.CodeId;
        if (roleId == 2) {
            let existingFamilyHead = await FamilyTreeService.getRoleExist(memberId, 2);
            if (existingFamilyHead.length > 0) {
                return res.send(Response.dataNotFoundResponse(null, 'thành viên đã là tộc trưởng'));
            } else {
                await FamilyTreeService.setRoleMember(memberId, roleId, CodeId);
                return res.send(Response.successResponse(null, 'thêm tộc trưởng thành công'));
            }
        } else if (roleId == 1) {
            let existingPaternalAncestor = await FamilyTreeService.getRoleExist(memberId, 1);
            if (existingPaternalAncestor.length > 0) {
                return res.send(Response.dataNotFoundResponse(null, 'thành viên đã là tổ phụ'));
            } else {
                await FamilyTreeService.removePaternalAncestor(CodeId);
                await FamilyTreeService.setRoleMember(memberId, roleId, CodeId);
                await FamilyTreeService.turnOffSQL_SAFE_UPDATES();
                await FamilyTreeService.ResetAllGenerationMember(CodeId);
                await FamilyTreeService.turnOnSQL_SAFE_UPDATES();
                await FamilyTreeService.setAllGenerationMember(memberId, 1);
                return res.send(Response.successResponse(null, 'thêm tổ phụ thành công'));
            }
        }
    } catch (e) {
        res.send(e);
    }
}



var informationMember = async (req, res) => {
    let id = req.query.memberId
    let data = {}
    try {
        data.infor = await FamilyTreeService.getInforMember(id);
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
    AllReligion, informationMember, AllNationality, AllMemberRole, setRole, AllMemberInGenelogy, getAllUnspecifiedMembers,
    GetIdPaternalAncestor, getRelationShipMember, getListMessage, removeRelationship, getListHistoryEmail
};