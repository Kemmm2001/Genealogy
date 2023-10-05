const FamilyTreeService = require("../../service/FamilyGenealogy/ViewFamilyTree");

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

var AllMemberInGenelogy = async (req, res) => {
    try {

    } catch (e) {

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
        if (roleId == 2) {
            let existingFamilyHead = await FamilyTreeService.getRoleExist(memberId, 2);
            if (existingFamilyHead.length > 0) {
                res.send("thành viên đã là tộc trưởng");
            } else {
                await FamilyTreeService.setRoleMember(memberId, roleId);
                res.send("set success");
            }
        } else if (roleId == 1) {
            let existingPaternalAncestor = await FamilyTreeService.getRoleExist(memberId, 1);
            if (existingPaternalAncestor.length > 0) {
                res.send("thành viên đã là tổ phụ");
            } else {
                await FamilyTreeService.removePaternalAncestor();
                await FamilyTreeService.setRoleMember(memberId, roleId);
                res.send("set success");
            }
        }
    } catch (e) {
        res.send(e);
    }
}

var removeRoleFamilyHead = async (req, res) => {
    try {
        let memberId = req.query.memberId;
        await FamilyTreeService.removeFamilyHead(memberId);
        res.send("remove successfuly");
    } catch (e) {
        res.send(e)
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
    AllReligion, informationMember, AllNationality, AllMemberRole, setRole, removeRoleFamilyHead
};