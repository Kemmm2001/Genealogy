const FamilyTreeService = require("../../service/FamilyGenealogy/ViewFamilyTree");
const Response = require("../../Utils/Response");
const CoreFunction = require("../../Utils/CoreFunction");
const { Code } = require("mongodb");

// Ví dụ
var AllReligion = async (req, res) => {
    try {
        let data = await FamilyTreeService.getAllReligion();
        res.send(data);
    } catch (e) {
        res.send(e);
    }
};
//Nguyễn Lê Hùng
var getlistMemberToSendMessage = async (req, res) => {
    try {
        let CodeID = req.query.CodeID;
        let data = await FamilyTreeService.getlistMemberToSendMessage(CodeID);
        console.log('data: ' + req.query.CodeID)
        if (data) {
            return res.send(Response.successResponse(data));
        } else {
            return res.send(Response.dataNotFoundResponse())
        }
    } catch (error) {
        return res.send(Response.dataNotFoundResponse(error))
    }
}
//Nguyễn Lê Hùng
var AllNationality = async (req, res) => {
    try {
        let data = await FamilyTreeService.getAllNationality();
        res.send(data)
    } catch (e) {
        res.send(e);
    }
}
//Nguyễn Lê Hùng
var GetIdPaternalAncestor = async (req, res) => {
    try {
        let CodeId = req.query.CodeId;
        let data = await FamilyTreeService.GetIdPaternalAncestor(CodeId);
        res.send(data)
    } catch (error) {
        console.log(error)
    }
}
//Nguyễn Lê Hùng
var getAllUnspecifiedMembers = async (req, res) => {
    try {
        let CodeID = req.query.CodeID;
        let data = await FamilyTreeService.getListUnspecifiedMembers(CodeID);
        res.send(data)
    } catch (err) {
        res.send(err);
    }
}

//Nguyễn Lê Hùng
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
//Nguyễn Lê Hùng
var removeRelationship = async (req, res) => {
    try {
        let currentID = req.body.CurrentID;
        let memberToRemove = req.body.RemoveID;
        let action = req.body.action;
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
//Nguyễn Lê Hùng
var getListMessage = async (req, res) => {
    try {
        let CodeID = req.query.CodeID;
        let data = await FamilyTreeService.getListMessage(CodeID);
        if (data) {
            return res.send(Response.successResponse(data))
        } else {
            res.send(Response.dataNotFoundResponse());
        }
    } catch (error) {
        console.log(error);
        res.send(Response.internalServerErrorResponse(error));
    }
}
//Nguyễn Lê Hùng
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

//Nguyễn Lê Hùng
var getFamilyHead = async (req, res) => {
    try {
        let CodeID = req.query.CodeID;
        let data = await FamilyTreeService.getFamilyHeadInGenealogy(CodeID);
        console.log('dataaaaaaaaaa: ' + data)
        if (data) {
            return res.send(Response.successResponse(data))
        } else {
            return res.send(Response.dataNotFoundResponse())
        }
    } catch (error) {
        return res.send(Response.dataNotFoundResponse(error))
    }
}

//Nguyễn Lê Hùng
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

//Nguyễn Lê Hùng

//Nguyễn Lê Hùng
var setRole = async (req, res) => {
    try {
        console.log("vào api này")
        let memberId = req.body.memberId;
        let CodeId = req.body.CodeId;
        console.log('memberId: ' + memberId)
        console.log('CodeId: ' + CodeId)
        //Check gender member
        let gender = await FamilyTreeService.getGenderMember(memberId);
        console.log('gender: ' + gender)
        if (gender) {
            if (gender.Male == 0) {
                return res.send(Response.internalServerErrorResponse(null, 'Khong thể đặt con gái làm cụ tổ'))
            }
        } else {
            return res.send(Response.dataNotFoundResponse(null, 'Không tìm thấy member'))
        }

        let existingPaternalAncestor = await FamilyTreeService.getRoleExist(CodeId, 1);
        if (existingPaternalAncestor.length > 0) {
            return res.send(Response.dataNotFoundResponse(null, 'thành viên đã là  cụ tổ'));
        } else {
            console.log("Thành viên chưa phải  cụ tổ")
            let remove = await FamilyTreeService.removePaternalAncestor(existingPaternalAncestor.MemberID);
            let insertMemberRole = await FamilyTreeService.setRoleMember(memberId);
            let turnOff = await FamilyTreeService.turnOffSQL_SAFE_UPDATES();
            let resetAll = await FamilyTreeService.ResetAllGenerationMember(CodeId);           
            let settAll = await FamilyTreeService.setAllGenerationMember(memberId, 1, CodeId);            
            let resetFatherIDandMotherID = await FamilyTreeService.setFatherIDAndMotherID(CodeId);
            let turnOn = await FamilyTreeService.turnOnSQL_SAFE_UPDATES();
            console.log('settAll: ' + settAll)
            console.log('remove: ' + remove)
            console.log('insertMemberRole: ' + insertMemberRole)
            console.log('turnOff: ' + turnOff)
            console.log('resetAll: ' + resetAll)
            console.log('turnOn: ' + turnOn)

            console.log('resetFatherIDandMotherID: ' + resetFatherIDandMotherID)
            if (!remove || !insertMemberRole || !turnOff || !resetAll || !turnOn || !settAll || !resetFatherIDandMotherID) {
                return res.send(Response.internalServerErrorResponse())
            }
            return res.send(Response.successResponse(null, 'đặt  cụ tổ thành công'));
        }

    } catch (e) {
        res.send(e);
    }
}


//Nguyễn Lê Hùng
var informationMember = async (req, res) => {
    let id = req.query.memberId
    let data = {}
    try {
        data.infor = await FamilyTreeService.getInforMember(id);
        data.contact = await FamilyTreeService.getContactMember(id);
        data.job = await FamilyTreeService.getJobMember(id);
        data.education = await FamilyTreeService.getEducationMember(id);
        data.event = await FamilyTreeService.getEventMember(id);
        let ManagerFamilyTree = await FamilyTreeService.getMarried(id)
        console.log('ManagerFamilyTree: ' + ManagerFamilyTree)
        if (ManagerFamilyTree) {
            data.MarriageNumber = ManagerFamilyTree
        }
        if (data) {
            return res.send(Response.successResponse(data))
        } else {
            return res.send(Response.dataNotFoundResponse())
        }
    } catch (e) {
        return res.send(Response.internalServerErrorResponse())
    }
}

module.exports = {
    AllReligion, informationMember, AllNationality, setRole, AllMemberInGenelogy, getAllUnspecifiedMembers,
    GetIdPaternalAncestor, getRelationShipMember, getListMessage, removeRelationship, getListHistoryEmail, getFamilyHead,
    getlistMemberToSendMessage
};