const FamilyManagementService = require("../../service/FamilyGenealogy/FamilyManagement");
const Response = require("../../Utils/Response");
const CoreFunction = require("../../Utils/CoreFunction");
const db = require('../../Models/ConnectDB');
const ManagementFamilyHead = require("../../service/InformationGenealogy/ManagementFamilyHead");
const ViewFamilyTree = require("../../service/FamilyGenealogy/ViewFamilyTree");
const MarriageManagement = require("../../service/FamilyGenealogy/MarriageManagement");
const ListAgeGroup = [
    {
        From: 0,
        End: 5,
        id: 0,
    },
    {
        From: 6,
        End: 17,
        id: 1,
    },
    {
        From: 18,
        End: 40,
        id: 2,
    },
    {
        From: 41,
        End: 60,
        id: 3,
    },
    {
        From: 61,
        End: 200,
        id: 4,
    },
]
//Nguyễn Lê Hùng
const ListBloodTypeGroup = [
    {
        BloodType: "Nhóm máu",
        id: null
    },
    {
        BloodType: "Nhóm máu A",
        id: "A"
    },
    {
        BloodType: "Nhóm máu B",
        id: "B"
    },
    {
        BloodType: "Nhóm máu AB",
        id: "AB"
    },
    {
        BloodType: "Nhóm máu O",
        id: "O"
    }
]
//Nguyễn Lê Hùng
var getListAgeGroup = async (req, res) => {
    res.send(ListAgeGroup)
}
//Nguyễn Lê Hùng
var getListBloodTypeGroup = async (req, res) => {
    res.send(ListBloodTypeGroup)
}

// nguyễn anh tuấn
var addMember = async (req, res) => {
    try {
        db.connection.beginTransaction();
        console.log('Request req.body: ', req.body);
        // các trường bắt buộc phải có trong req.body
        const requiredFields = [
            'MemberName',
            'BirthOrder',
            'IsDead',
            'CodeID',
            'Male',
            'Action'
        ];
        // Kiểm tra xem có đủ các trường của FamilyMember không
        const missingFields = CoreFunction.missingFields(requiredFields, req.body);
        console.log(missingFields);
        // trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            return res.send(Response.missingFieldsErrorResponse(missingFields));
        }
        console.log("Đã có đủ các trường bắt buộc");
        const action = ['AddParent', 'AddMarriage', 'AddNormal', 'AddFirst'];
        if (!action.includes(req.body.Action)) {

            return res.send(Response.badRequestResponse(null, "Action không hợp lệ"));
        }
        console.log("Action hợp lệ");
        // kiểm tra xem birthorder có phải là số không và có >= 1 không
        if (!CoreFunction.isDataNumberExist(req.body.BirthOrder) || req.body.BirthOrder < 1) {
            return res.send(Response.badRequestResponse(null, "Con thứ không hợp lệ, phải là số và lớn hơn hoặc bằng 1"));
        }
        // kiểm tra xem Dob, LunarDob, Dod, LunarDod có phải là ngày tháng không
        if ((CoreFunction.isDataStringExist(req.body.Dob) && !CoreFunction.isDataDateExist(req.body.Dob))
            || (CoreFunction.isDataStringExist(req.body.LunarDob) && !CoreFunction.isDataDateExist(req.body.LunarDob))
            || (CoreFunction.isDataStringExist(req.body.Dod) && !CoreFunction.isDataDateExist(req.body.Dod))
            || (CoreFunction.isDataStringExist(req.body.LunarDod) && !CoreFunction.isDataDateExist(req.body.LunarDod))) {
            return res.send(Response.badRequestResponse(null, "Ngày tháng không hợp lệ"));
        }
        let dataRes = {};
        let data = await FamilyManagementService.addMember(req.body);
        // trường hợp muốn thêm thành viên mà không có trong cây gia phả
        if (req.body.Action == 'AddNormal') {
            console.log("Đã vào trường hợp thêm thành viên mà không có trong cây gia phả");
            await FamilyManagementService.setGeneration(0, data.insertId);
            await FamilyManagementService.setRole(3, data.insertId);
        }
        // trường hợp muốn thêm thành viên đầu tiên ( tổ phụ tổ tiên)
        else if (req.body.Action == 'AddFirst') {
            await FamilyManagementService.setGeneration(1, data.insertId);
            await ManagementFamilyHead.addForefather(data.insertId, req.body.CodeID);
            await FamilyManagementService.setRole(1, data.insertId);
        }
        // trường hợp muốn thêm thành viên mà có trong cây gia phả
        else {
            console.log("Đã vào trường hợp thêm thành viên có trong cây gia phả");
            let currentMember, memberRole;
            currentMember = await FamilyManagementService.getMemberByMemberID(req.body.CurrentMemberID);
            console.log("currentMember: ", currentMember);
            if (!CoreFunction.isDataNumberExist(currentMember)) {
                return res.send(Response.dataNotFoundResponse(null, "Thành viên hiện tại đang không tồn tại"));
            }
            // trường hợp ở khác gia phả
            if (currentMember[0].CodeID != req.body.CodeID) {
                return res.send(Response.badRequestResponse(null, "Không thể thêm thành viên ở gia phả khác"));
            }
            memberRole = await ViewFamilyTree.getAllMemberRole(req.body.CurrentMemberID);
            console.log("memberRole: ", memberRole);
            // trường hợp muốn thêm cha mẹ
            if (req.body.Action == 'AddParent') {
                console.log("Đã vào trường hợp thêm cha mẹ");
                // nếu vào trường hợp thêm cha
                if (req.body.Male == 1) {
                    console.log("Đã vào trường hợp thêm cha");
                    // nếu đã có cha thì ko thêm
                    if (CoreFunction.isDataNumberExist(currentMember[0].FatherID)) {
                        let errorMessage = 'Thành viên này đã có cha';
                        return res.send(Response.badRequestResponse(null, errorMessage));
                    }
                    // nếu con đã có mẹ thì thêm mối quan hệ vợ chồng cho mẹ và cha của con
                    if (CoreFunction.isDataNumberExist(currentMember[0].MotherID)) {
                        // tìm số lần kết hôn của mẹ
                        let countMarriage = await MarriageManagement.getWifeMaxMarriageNumber(currentMember[0].MotherID, currentMember[0].CodeID);
                        console.log("countMarriage: ", countMarriage);
                        if (!CoreFunction.isDataNumberExist(countMarriage)) {
                            countMarriage = 0;
                        }
                        let objData = {
                            husbandID: data.insertId,
                            wifeID: currentMember[0].MotherID,
                            codeID: currentMember[0].CodeID,
                            marriageNumber: countMarriage + 1
                        }
                        await MarriageManagement.addMarriage(objData);
                    }
                    FamilyManagementService.insertFatherIDToMember(data.insertId, req.body.CurrentMemberID);
                }
                // nếu vào trường hợp thêm mẹ
                else if (req.body.Male == 0) {
                    console.log("Đã vào trường hợp thêm mẹ");
                    // nếu đã có mẹ thì ko thêm
                    if (CoreFunction.isDataNumberExist(currentMember[0].MotherID)) {
                        let errorMessage = 'Thành viên này đã có mẹ';
                        return res.send(Response.badRequestResponse(null, errorMessage));
                    }
                    // nếu con đã có cha thì thêm mối quan hệ vợ chồng cho mẹ và cha của con
                    if (CoreFunction.isDataNumberExist(currentMember[0].FatherID)) {
                        // tìm số lần kết hôn của cha
                        let countMarriage = await MarriageManagement.getHusbandMaxMarriageNumber(currentMember[0].FatherID, currentMember[0].CodeID);
                        console.log("countMarriage: ", countMarriage);
                        if (!CoreFunction.isDataNumberExist(countMarriage)) {
                            countMarriage = 0;
                        }
                        let objData = {
                            husbandID: currentMember[0].FatherID,
                            wifeID: data.insertId,
                            codeID: currentMember[0].CodeID,
                            marriageNumber: countMarriage + 1
                        }
                        await MarriageManagement.addMarriage(objData);
                    }
                    FamilyManagementService.insertMotherIDToMember(data.insertId, req.body.CurrentMemberID);
                }
                await FamilyManagementService.setGeneration(currentMember[0].Generation - 1, data.insertId);
            }
            // trường hợp muốn thêm vợ chồng
            else if (req.body.Action == 'AddMarriage') {
                console.log("Đã vào trường hợp thêm vợ chồng");
                let objData = {};
                // trường hợp giới tính giống nhau, thì trả về thông báo ko hỗ trợ
                if (req.body.Male == currentMember[0].Male) {
                    let errorMessage = 'Không hỗ trợ kết hôn đồng giới';
                    return res.send(Response.badRequestResponse(null, errorMessage));
                }
                // nếu vào trường hợp thêm chồng 
                if (req.body.Male == 1) {
                    console.log("Đã vào trường hợp thêm chồng");
                    // tìm số lần kết hôn của vợ
                    let countMarriage = await MarriageManagement.getWifeMaxMarriageNumber(req.body.CurrentMemberID, currentMember[0].CodeID);
                    console.log("countMarriage: ", countMarriage);
                    if (!CoreFunction.isDataNumberExist(countMarriage)) {
                        countMarriage = 0;
                    }
                    objData = {
                        husbandID: data.insertId,
                        wifeID: req.body.CurrentMemberID,
                        codeID: req.body.CodeID,
                        marriageNumber: countMarriage + 1
                    }
                }
                // nếu vào trường hợp thêm vợ
                else if (req.body.Male == 0) {
                    console.log("Đã vào trường hợp thêm vợ");
                    // tìm số lần kết hôn của chồng
                    let countMarriage = await MarriageManagement.getHusbandMaxMarriageNumber(req.body.CurrentMemberID, currentMember[0].CodeID);
                    console.log("countMarriage: ", countMarriage);
                    if (!CoreFunction.isDataNumberExist(countMarriage)) {
                        countMarriage = 0;
                    }
                    objData = {
                        husbandID: req.body.CurrentMemberID,
                        wifeID: data.insertId,
                        codeID: req.body.CodeID,
                        marriageNumber: countMarriage + 1
                    }
                }
                await FamilyManagementService.setGeneration(currentMember[0].Generation, data.insertId);
                await MarriageManagement.addMarriage(objData);
            }
            await FamilyManagementService.setRole(3, data.insertId);
        }
        // kết thúc phần thêm member theo action
        dataRes.MemberID = data.insertId;
        dataRes.affectedRows = data.affectedRows;
        return res.send(Response.successResponse(dataRes));
    } catch (e) {
        console.log("Error: " + e);

        return res.send(Response.internalServerErrorResponse());
    }
};

var addChild = async (req, res) => {
    try {
        db.connection.beginTransaction();
        console.log('Đã vào trường hợp thêm con cái');
        console.log('Request req.body: ', req.body);
        // các trường bắt buộc phải có trong req.body
        const requiredFields = [
            'MemberName',
            'BirthOrder',
            'IsDead',
            'CodeID',
            'Male'
        ];
        // Kiểm tra xem có đủ các trường của FamilyMember không
        const missingFields = CoreFunction.missingFields(requiredFields, req.body);
        console.log(missingFields);
        // trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            return res.send(Response.missingFieldsErrorResponse(missingFields));
        }
        console.log("Đã có đủ các trường bắt buộc");
        // kiểm tra xem birthorder có phải là số không và có >= 1 không
        if (!CoreFunction.isDataNumberExist(req.body.BirthOrder) || req.body.BirthOrder < 1) {
            return res.send(Response.badRequestResponse(null, "Con thứ không hợp lệ, phải là số và lớn hơn hoặc bằng 1"));
        }
        // kiểm tra xem Dob, LunarDob, Dod, LunarDod có phải là ngày tháng không
        if ((CoreFunction.isDataStringExist(req.body.Dob) && !CoreFunction.isDataDateExist(req.body.Dob))
            || (CoreFunction.isDataStringExist(req.body.LunarDob) && !CoreFunction.isDataDateExist(req.body.LunarDob))
            || (CoreFunction.isDataStringExist(req.body.Dod) && !CoreFunction.isDataDateExist(req.body.Dod))
            || (CoreFunction.isDataStringExist(req.body.LunarDod) && !CoreFunction.isDataDateExist(req.body.LunarDod))) {
            return res.send(Response.badRequestResponse(null, "Ngày tháng không hợp lệ"));
        }
        let data = await FamilyManagementService.addMember(req.body);
        let fatherData, motherData;
        // nếu cả FatherID và MotherID đều null ở req.body thì không thể thêm con
        if (!CoreFunction.isDataNumberExist(req.body.FatherID) && !CoreFunction.isDataNumberExist(req.body.MotherID)) {
            let errorMessage = 'Không thể thêm con cái nếu không có cha hoặc mẹ';
            return res.send(Response.badRequestResponse(null, errorMessage));
        }
        // còn nếu vào trường hợp có FatherID ở req.body
        if (CoreFunction.isDataNumberExist(req.body.FatherID)) {
            fatherData = await FamilyManagementService.getMemberByMemberID(req.body.FatherID);
            // nếu father ko tồn tại thì ko thể thêm con
            if (!CoreFunction.isDataNumberExist(fatherData)) {
                let errorMessage = 'Không thể thêm con cái nếu cha không tồn tại';
                return res.send(Response.badRequestResponse(null, errorMessage));
            }
            // nếu father là nữ thì không thể thêm con 
            if (fatherData[0].Male == 0) {
                let errorMessage = 'Không thể thêm con cái nếu cha là nữ';
                return res.send(Response.badRequestResponse(null, errorMessage));
            }
            // thêm cha vào FatherID của con
            FamilyManagementService.insertFatherIDToMember(fatherData[0].MemberID, data.insertId);
        }
        // còn nếu vào trường hợp có MotherID ở req.body
        if (CoreFunction.isDataNumberExist(req.body.MotherID)) {
            motherData = await FamilyManagementService.getMemberByMemberID(req.body.MotherID);
            // nếu mother ko tồn tại thì ko thể thêm con
            if (!CoreFunction.isDataNumberExist(motherData)) {
                let errorMessage = 'Không thể thêm con cái nếu mẹ không tồn tại';
                return res.send(Response.badRequestResponse(null, errorMessage));
            }
            // nếu mother là nam thì không thể thêm con
            if (motherData[0].Male == 1) {
                let errorMessage = 'Không thể thêm con cái nếu mẹ là nam';
                return res.send(Response.badRequestResponse(null, errorMessage));
            }
            // thêm mẹ vào MotherID của con
            FamilyManagementService.insertMotherIDToMember(motherData[0].MemberID, data.insertId);
        }
        // nếu cả FatherID và MotherID đều có ở req.body
        if (CoreFunction.isDataNumberExist(req.body.FatherID) && CoreFunction.isDataNumberExist(req.body.MotherID)) {
            console.log("Đã vào trường hợp cả FatherID và MotherID đều có ở req.body");
        }
        let listChild, parentGeneration;
        // trường hợp có cha nhưng ko có mẹ 
        if (CoreFunction.isDataNumberExist(req.body.FatherID) && !CoreFunction.isDataNumberExist(req.body.MotherID)) {
            console.log("Đã vào trường hợp có cha nhưng ko có mẹ");
            // nếu cha là người ngoài, tức là ko có bố mẹ và role là 3
            if (fatherData[0].RoleID == 3
                && !CoreFunction.isDataNumberExist(fatherData[0].FatherID) && !CoreFunction.isDataNumberExist(fatherData[0].MotherID)) {
                console.log("Đã vào trường hợp cha là người ngoài");
                let errorMessage = 'Không thể thêm con riêng nếu cha là người ngoài';
                return res.send(Response.badRequestResponse(null, errorMessage));
            }
            listChild = await FamilyManagementService.getMembersByOnlyFatherID(req.body.FatherID);
            parentGeneration = fatherData[0].Generation;
        }
        // trường hợp có mẹ nhưng ko có cha
        else if (!CoreFunction.isDataNumberExist(req.body.FatherID) && CoreFunction.isDataNumberExist(req.body.MotherID)) {
            console.log("Đã vào trường hợp có mẹ nhưng ko có cha");
            // nếu mẹ là người ngoài, tức là ko có bố mẹ và role là 3
            if (motherData[0].RoleID == 3
                && !CoreFunction.isDataNumberExist(motherData[0].FatherID) && !CoreFunction.isDataNumberExist(motherData[0].MotherID)) {
                console.log("Đã vào trường hợp mẹ là người ngoài");
                let errorMessage = 'Không thể thêm con riêng nếu mẹ là người ngoài';
                return res.send(Response.badRequestResponse(null, errorMessage));
            }
            listChild = await FamilyManagementService.getMembersByOnlyMotherID(req.body.MotherID);
            parentGeneration = motherData[0].Generation;
        }
        // trường hợp có cả cha và mẹ
        else if (CoreFunction.isDataNumberExist(req.body.FatherID) && CoreFunction.isDataNumberExist(req.body.MotherID)) {
            console.log("Đã vào trường hợp có cả cha và mẹ");
            listChild = await FamilyManagementService.getMembersByFatherIDAndMotherID(req.body.FatherID, req.body.MotherID);
            parentGeneration = fatherData[0].Generation;
        }
        // bắt đầu kiểm tra birthorder
        // nếu birthorder đã tồn tại thì ko thể add
        if (isBirthOrderExist(data.insertId, req.body.BirthOrder, listChild)) {
            let errorMessage = `Con thứ ${req.body.BirthOrder} đã tồn tại`;

            return res.send(Response.badRequestResponse(null, errorMessage));
        }
        console.log("Bắt đầu update data");
        // kết thúc kiểm tra birthorder
        await FamilyManagementService.setGeneration(parentGeneration + 1, data.insertId);
        await FamilyManagementService.setRole(3, data.insertId);
        return res.send(Response.successResponse());
    } catch (e) {
        console.log("Error: " + e);
        return res.send(Response.internalServerErrorResponse());
    }
}

// nguyễn anh tuấn
var isBirthOrderExist = (memberID, birthOrder, listBirthOrderExist) => {
    console.log("Vào hàm isBirthOrderExist");
    for (let i = 0; i < listBirthOrderExist.length; i++) {
        if (listBirthOrderExist[i].BirthOrder == birthOrder && listBirthOrderExist[i].MemberID != memberID) {
            return true;
        }
    }
    return false;
}

// nguyễn anh tuấn
var updateMemberPhoto = async (req, res) => {
    try {
        console.log("vào đây")
        db.connection.beginTransaction();
        console.log('Request req.body: ', req.body);
        console.log("req.file: ", req.file);
        if (!CoreFunction.isDataStringExist(req.file)) {
            return res.send(Response.badRequestResponse(null, "File ảnh không hợp lệ"));
        }
        // các trường bắt buộc phải có trong req.body
        const requiredFields = [
            'MemberID',
        ];
        // Kiểm tra xem có đủ các trường của FamilyMember không
        const missingFields = CoreFunction.missingFields(requiredFields, req.body);
        // trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            CoreFunction.deleteImage(req.file.path);
            return res.send(Response.missingFieldsErrorResponse(missingFields));
        }
        let dataMember = await FamilyManagementService.getMemberByMemberID(req.body.MemberID);
        if (dataMember == null || dataMember.length == 0) {
            CoreFunction.deleteImage(req.file.path);
            return res.send(Response.dataNotFoundResponse());
        }
        // xóa ảnh cũ
        CoreFunction.deleteImage(dataMember[0].Image);
        // update ảnh mới
        await FamilyManagementService.updateMemberPhoto(req.file.path, req.body.MemberID);
        return res.send(Response.successResponse(null, "Cập nhật ảnh thành công"));
    } catch (e) {
        console.log("Error: " + e);
        return res.send(Response.internalServerErrorResponse());
    }
}

// nguyễn anh tuấn
var updateMember = async (req, res) => {
    try {
        db.connection.beginTransaction();
        console.log('Request req.body: ', req.body);
        // các trường bắt buộc phải có trong req.body
        const requiredFields = [
            'MemberID',
            'MemberName',
            'BirthOrder',
            'IsDead',
            'Male'
        ];
        // Kiểm tra xem có đủ các trường của FamilyMember không
        const missingFields = CoreFunction.missingFields(requiredFields, req.body);
        // trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {

            return res.send(Response.missingFieldsErrorResponse(missingFields));
        }
        let dataMember = await FamilyManagementService.getMemberByMemberID(req.body.MemberID);
        if (dataMember == null || dataMember.length == 0) {

            return res.send(Response.dataNotFoundResponse());
        }
        // nễu đã có người liên quan như vợ chồng hay con cái thì không thể thay đổi giới tính
        if (await isHasRelatedPerson(dataMember[0]) == true) {
            console.log("Đã vào trường hợp có người liên quan");
            if (req.body.Male != dataMember[0].Male) {
                if (dataMember[0].Male == 1) {
                    return res.send(Response.badRequestResponse(null, "Thành viên này đã có vợ, không thể thay đổi giới tính"));
                } else {
                    return res.send(Response.badRequestResponse(null, "Thành viên này đã có chồng, không thể thay đổi giới tính"));
                }
            }
        }
        // bắt đầu kiểm tra birthorder
        let listChild;
        // trường hợp có cha nhưng ko có mẹ 
        if (CoreFunction.isDataNumberExist(dataMember[0].FatherID) && !CoreFunction.isDataNumberExist(dataMember[0].MotherID)) {
            console.log("Đã vào trường hợp có cha những ko có mẹ");
            listChild = await FamilyManagementService.getMembersByFatherID(dataMember[0].FatherID);
        }
        // trường hợp có mẹ những ko có cha
        else if (!CoreFunction.isDataNumberExist(dataMember[0].FatherID) && CoreFunction.isDataNumberExist(dataMember[0].MotherID)) {
            console.log("Đã vào trường hợp có mẹ những ko có cha");
            listChild = await FamilyManagementService.getMembersByMotherID(dataMember[0].MotherID);
        }
        // trường hợp có cả cha và mẹ
        else if (CoreFunction.isDataNumberExist(dataMember[0].FatherID) && CoreFunction.isDataNumberExist(dataMember[0].MotherID)) {
            console.log("Đã vào trường hợp có cả cha và mẹ");
            listChild = await FamilyManagementService.getMembersByFatherIDAndMotherID(dataMember[0].FatherID, dataMember[0].MotherID);
        }
        // nếu birthorder đã tồn tại thì ko thể add và là người trong gia phả, tức là phải có bố mẹ
        if (CoreFunction.isDataNumberExist(dataMember[0].FatherID)
            || CoreFunction.isDataNumberExist(dataMember[0].MotherID)) {
            if (isBirthOrderExist(dataMember[0].MemberID, req.body.BirthOrder, listChild)) {
                let errorMessage = `Con thứ ${req.body.BirthOrder} đã tồn tại`;

                return res.send(Response.badRequestResponse(null, errorMessage));
            }
        }
        // nếu trong trường hợp thay đổi giới tính
        if (req.body.Male != dataMember[0].Male) {
            // update lại những đứa con có cha hoặc mẹ là thành viên này
            let listChilds = await FamilyManagementService.getMembersByFatherIDOrMotherID(dataMember[0].MemberID, dataMember[0].MemberID);
            let listChildsID = [];
            if (Array.isArray(listChilds) && listChilds.length > 0) {
                for (let i = 0; i < listChilds.length; i++) {
                    listChildsID.push(listChilds[i].MemberID);
                }
                if (req.body.Male == 1) {
                    await FamilyManagementService.updateMotherIDToFatherID(dataMember[0].MemberID, listChildsID);
                } else {
                    await FamilyManagementService.updateFatherIDToMotherID(dataMember[0].MemberID, listChildsID);
                }
            }
        }

        // update member vào database
        let data = await FamilyManagementService.updateMember(req.body);
        dataRes = {
            memberID: req.body.memberID,
            affectedRows: data.affectedRows,
            changedRows: data.changedRows
        }
        return res.send(Response.successResponse(dataRes));
    } catch (e) {
        console.log("Error: " + e);

        return res.send(Response.internalServerErrorResponse());
    }
}

// nguyễn anh tuấn
var isHasRelatedPerson = (dataMember) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("Vào hàm isHasRelatedPerson với dataMember: ", dataMember.MemberID);
            let listMarriage = await MarriageManagement.getMarriageByHusbandIDOrWifeID(dataMember.MemberID, dataMember.MemberID);
            // console.log(`listMarriage: ${JSON.stringify(listMarriage)}`)
            if (listMarriage.length > 0) {
                console.log("Có người liên quan");
                resolve(true);
            } else {
                console.log("Không có người liên quan");
                resolve(false);
            }

        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}

// nguyễn anh tuấn
var updateMemberToGenealogy = async (req, res) => {
    try {
        db.connection.beginTransaction();
        // Log ra thông tin trong req.body
        console.log('Request req.body: ', req.body);
        // các trường bắt buộc phải có trong req.body
        const requiredFields = [
            'InGenealogyID',
            'OutGenealogyID',
            'Action'
        ];
        // Kiểm tra xem có đủ các trường của FamilyMember không
        const missingFields = CoreFunction.missingFields(requiredFields, req.body);
        console.log(missingFields);
        // trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            return res.send(Response.missingFieldsErrorResponse(missingFields));
        }
        console.log("No missing fields");
        const action = ['AddParent', 'AddChild', 'AddMarriage'];
        if (!action.includes(req.body.Action)) {
            return res.send(Response.badRequestResponse(null, "Action không hợp lệ"));
        }
        let inGenealogyMemeber = await FamilyManagementService.getMemberByMemberID(req.body.InGenealogyID);
        let outGenealogyMemeber = await FamilyManagementService.getMemberByMemberID(req.body.OutGenealogyID);
        if (inGenealogyMemeber == null || inGenealogyMemeber.length == 0 || outGenealogyMemeber == null || outGenealogyMemeber.length == 0) {
            return res.send(Response.dataNotFoundResponse(null, "Thành viên không tồn tại"));
        }
        // nếu không cùng gia phả, tức là không cùng CodeID
        if (inGenealogyMemeber[0].CodeID != outGenealogyMemeber[0].CodeID) {
            return res.send(Response.badRequestResponse(null, "Hai thành viên không cùng gia phả"));
        }
        // nếu thành viên out không có generation là 0 thì sai 
        if (outGenealogyMemeber[0].Generation != 0) {
            return res.send(Response.badRequestResponse(null, "Thế hệ của thành viên được add không hợp lệ"));
        }
        let dataRes = {};
        // trường hợp muốn thêm cha mẹ
        if (req.body.Action == 'AddParent') {
            await FamilyManagementService.setGeneration(inGenealogyMemeber[0].Generation - 1, outGenealogyMemeber[0].MemberID);
            // nếu vào trường hợp thêm cha
            if (outGenealogyMemeber[0].Male == 1) {
                // nếu đã có cha thì ko thêm
                if (CoreFunction.isDataNumberExist(inGenealogyMemeber[0].FatherID)) {
                    let errorMessage = 'Thành viên này đã có cha';
                    return res.send(Response.badRequestResponse(null, errorMessage));
                }
                // nếu con đã có mẹ thì thêm mối quan hệ vợ chồng cho mẹ và cha của con
                if (CoreFunction.isDataNumberExist(inGenealogyMemeber[0].MotherID)) {
                    // tìm số lần kết hôn của mẹ
                    let countMarriage = await MarriageManagement.getWifeMaxMarriageNumber(inGenealogyMemeber[0].MotherID, inGenealogyMemeber[0].CodeID);
                    console.log("countMarriage: ", countMarriage);
                    if (!CoreFunction.isDataNumberExist(countMarriage)) {
                        countMarriage = 0;
                    }
                    let objData = {
                        husbandID: outGenealogyMemeber[0].MemberID,
                        wifeID: inGenealogyMemeber[0].MotherID,
                        codeID: inGenealogyMemeber[0].CodeID,
                        marriageNumber: countMarriage + 1
                    }
                    await MarriageManagement.addMarriage(objData);
                }
                FamilyManagementService.insertFatherIDToMember(outGenealogyMemeber[0].MemberID, inGenealogyMemeber[0].MemberID);
            }
            // nếu vào trường hợp thêm mẹ
            else if (outGenealogyMemeber[0].Male == 0) {
                // nếu đã có mẹ thì ko thêm
                if (CoreFunction.isDataNumberExist(inGenealogyMemeber[0].MotherID)) {
                    let errorMessage = 'Thành viên này đã có mẹ';
                    return res.send(Response.badRequestResponse(null, errorMessage));
                }
                // nếu con đã có cha thì thêm mối quan hệ vợ chồng cho mẹ và cha của con
                if (CoreFunction.isDataNumberExist(inGenealogyMemeber[0].FatherID)) {
                    // tìm số lần kết hôn của cha
                    let countMarriage = await MarriageManagement.getHusbandMaxMarriageNumber(inGenealogyMemeber[0].FatherID, inGenealogyMemeber[0].CodeID);
                    console.log("countMarriage: ", countMarriage);
                    if (!CoreFunction.isDataNumberExist(countMarriage)) {
                        countMarriage = 0;
                    }
                    let objData = {
                        husbandID: inGenealogyMemeber[0].FatherID,
                        wifeID: outGenealogyMemeber[0].MemberID,
                        codeID: inGenealogyMemeber[0].CodeID,
                        marriageNumber: countMarriage + 1
                    }
                    await MarriageManagement.addMarriage(objData);
                }
                FamilyManagementService.insertMotherIDToMember(outGenealogyMemeber[0].MemberID, inGenealogyMemeber[0].MemberID);
            }
        }
        // trường hợp muốn thêm con cái
        else if (req.body.Action == 'AddChild') {
            // nếu birthorder đã tồn tại thì ko thể add
            let listChild = await FamilyManagementService.getMembersByFatherIDOrMotherID(inGenealogyMemeber[0].MemberID, inGenealogyMemeber[0].MemberID);
            if (isBirthOrderExist(outGenealogyMemeber[0].MemberID, outGenealogyMemeber[0].BirthOrder, listChild)) {
                let errorMessage = `Con thứ ${outGenealogyMemeber[0].BirthOrder} đã tồn tại`;
                return res.send(Response.badRequestResponse(null, errorMessage));
            }
            if (inGenealogyMemeber[0].Male == 1) {
                FamilyManagementService.insertFatherIDToMember(inGenealogyMemeber[0].MemberID, outGenealogyMemeber[0].MemberID);
            } else if (inGenealogyMemeber[0].Male == 0) {
                FamilyManagementService.insertMotherIDToMember(inGenealogyMemeber[0].MemberID, outGenealogyMemeber[0].MemberID);
            }
            await FamilyManagementService.setGeneration(inGenealogyMemeber[0].Generation + 1, outGenealogyMemeber[0].MemberID);
            // await FamilyManagementService.insertParentIdToMember(inGenealogyMemeber[0].MemberID, outGenealogyMemeber[0].MemberID);
        }
        // trường hợp muốn thêm vợ chồng
        else if (req.body.Action == 'AddMarriage') {
            console.log("Đã vào trường hợp thêm vợ chồng");
            // nếu cùng giới tính thì không cho add
            if (inGenealogyMemeber[0].Male == outGenealogyMemeber[0].Male) {
                return res.send(Response.badRequestResponse(null, "Không hỗ trợ kết hôn đồng giới"));
            }
            let objData = {};
            // nếu vào trường hợp thêm chồng 
            if (outGenealogyMemeber[0].Male == 1) {
                console.log("Đã vào trường hợp thêm chồng");
                // tìm số lần kết hôn của vợ
                let countMarriage = await MarriageManagement.getWifeMaxMarriageNumber(inGenealogyMemeber[0].MemberID, inGenealogyMemeber[0].CodeID);
                console.log("countMarriage: ", countMarriage);
                if (!CoreFunction.isDataNumberExist(countMarriage)) {
                    countMarriage = 0;
                }
                objData = {
                    husbandID: req.body.OutGenealogyID,
                    wifeID: req.body.InGenealogyID,
                    codeID: inGenealogyMemeber[0].CodeID,
                    marriageNumber: countMarriage + 1
                }
            }
            // nếu vào trường hợp thêm vợ
            else if (outGenealogyMemeber[0].Male == 0) {
                console.log("Đã vào trường hợp thêm vợ");
                // tìm số lần kết hôn của chồng
                let countMarriage = await MarriageManagement.getHusbandMaxMarriageNumber(inGenealogyMemeber[0].MemberID, inGenealogyMemeber[0].CodeID);
                console.log("countMarriage: ", countMarriage);
                if (!CoreFunction.isDataNumberExist(countMarriage)) {
                    countMarriage = 0;
                }
                objData = {
                    husbandID: req.body.InGenealogyID,
                    wifeID: req.body.OutGenealogyID,
                    codeID: inGenealogyMemeber[0].CodeID,
                    marriageNumber: countMarriage + 1
                }
            }
            await FamilyManagementService.setGeneration(inGenealogyMemeber[0].Generation, outGenealogyMemeber[0].MemberID);
            await MarriageManagement.addMarriage(objData);
        }
        return res.send(Response.successResponse(null, "Thêm thành viên vào trong gia phả thành công"));
    } catch (e) {
        console.log("Error: " + e);
        return res.send(Response.internalServerErrorResponse());
    }
}

// nguyễn anh tuấn
var deleteMember = async (req, res) => {
    try {
        console.log("Vào hàm delete member")
        db.connection.beginTransaction();
        // các trường bắt buộc phải có trong req.query
        const requiredFields = [
            'MemberID'
        ];
        // Kiểm tra xem có đủ các trường của FamilyHistory không
        const missingFields = CoreFunction.missingFields(requiredFields, req.query);
        console.log(missingFields);
        // trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            return res.send(Response.missingFieldsErrorResponse(missingFields));
        }
        console.log("No missing fields");
        let dataMember = await FamilyManagementService.getMemberByMemberID(req.query.MemberID);
        if (dataMember == null || dataMember.length == 0) {
            return res.send(Response.dataNotFoundResponse());
        }
        console.log("dataMember: ", dataMember[0].MemberID);
        // xóa ảnh cũ
        await CoreFunction.deleteImage(dataMember[0].Image);
        // nếu người được xóa là người ngoài gia phả, tức là ko có cha mẹ
        if (!CoreFunction.isDataNumberExist(dataMember[0].FatherID) && !CoreFunction.isDataNumberExist(dataMember[0].MotherID)) {
            console.log("Đã vào trường hợp người ngoài gia phả");
            // nếu có vợ chồng thì những đứa con của vợ chồng đó sẽ được thêm vào vợ hoặc chồng của người được xóa
            let listMarriage = await MarriageManagement.getMarriageByHusbandIDOrWifeID(dataMember[0].MemberID, dataMember[0].MemberID);
            console.log("listMarriage: ", listMarriage);
            // vì là người ngoài gia phả nên marriage chỉ có 1 dòng
            // tìm kiếm tất cả con có cha hoặc mẹ là chồng hoặc vợ của người được xóa
            let listChilds = [];
            if (dataMember[0].Male == 0 && listMarriage.length > 0) {
                console.log("Đã vào trường hợp người ngoài gia phả là nữ");
                listChilds = await FamilyManagementService.getMembersByOnlyFatherID(listMarriage[0].husbandID);
                console.log("listChilds: ", listChilds);
            } else if (dataMember[0].Male == 1 && listMarriage.length > 0) {
                console.log("Đã vào trường hợp người ngoài gia phả là nam");
                listChilds = await FamilyManagementService.getMembersByOnlyMotherID(listMarriage[0].wifeID);
            }
            console.log("listChilds: ", listChilds);
            let maxBirthOrder = 0;
            if (listChilds.length > 0) {
                /* Tìm giá trị BirthOrder lớn nhất trong mảng. So sánh giá trị BirthOrder của từng 
                đối tượng với giá trị max hiện tại và giữ lại giá trị lớn nhất.*/
                maxBirthOrder = listChilds.reduce((max, child) => (child.BirthOrder > max ? child.BirthOrder : max), listChilds[0].BirthOrder);
            }
            console.log("maxBirthOrder: ", maxBirthOrder);
            let listMember;
            // nếu là nam thì bỏ fatherID của những người có fatherID là memberID của người được xóa
            if (dataMember[0].Male == 1) {
                listMember = await FamilyManagementService.getMembersByFatherID(dataMember[0].MemberID);
                if (listMember.length > 0) {
                    for (let i = 0; i < listMember.length; i++) {
                        FamilyManagementService.insertFatherIDToMember(null, listMember[i].MemberID);
                        listMember[i].BirthOrder = ++maxBirthOrder;
                        await FamilyManagementService.updateMember(listMember[i]);
                    }
                }
            }
            // nếu là nữ thì bỏ motherID của những người có motherID là memberID của người được xóa
            else if (dataMember[0].Male == 0) {
                listMember = await FamilyManagementService.getMembersByMotherID(dataMember[0].MemberID);
                if (listMember.length > 0) {
                    for (let i = 0; i < listMember.length; i++) {
                        FamilyManagementService.insertMotherIDToMember(null, listMember[i].MemberID);
                        listMember[i].BirthOrder = ++maxBirthOrder;
                        await FamilyManagementService.updateMember(listMember[i]);
                    }
                }
            }
        }
        // nếu người được xóa là người trong gia phả, tức là có cha mẹ
        else {
            // lấy tất cả thành viên trong gia phả
            let listMember = await FamilyManagementService.getAllMember(dataMember[0].CodeID);
            await FamilyManagementService.UpdateMemberRelated(dataMember[0], listMember);
        }
        await FamilyManagementService.deleteMember(req.query.MemberID);

        dataRes = {
            MemberID: req.query.MemberID,
        }
        return res.send(Response.successResponse(dataRes));
    } catch (e) {
        console.log("Error: " + e);
        return res.send(Response.internalServerErrorResponse());
    }
}



var GetCurrentParentMember = async (req, res) => {
    try {
        let memberID = req.query.memberID;
        let data = await FamilyManagementService.GetCurrentParentMember(memberID);
        res.send(data);
    } catch (err) {
        console.log(err)
    }
}

var insertParentIdToMember = async (req, res) => {
    try {
        let ParentID = req.body.ParentID;
        let memberID = req.body.memberID
        await FamilyManagementService.insertParentIdToMember(ParentID, memberID);
    } catch (error) {
        console.log(error)
    }
}


var searchMember = async (req, res) => {
    try {
        const { searchTerm } = req.body;
        // Thực hiện tìm kiếm thành viên trong database dựa trên searchTerm
        const searchResult = await FamilyManagementService.searchMember(searchTerm);
        res.json(searchResult);
    } catch (e) {
        res.send(e);
    }
}
var filterMember = async function (req, res) {
    try {
        const filterOptions = req.body;

        if (req.body.selectAge != null) {
            filterOptions.EndAge = ListAgeGroup[req.body.selectAge].End;
            filterOptions.startAge = ListAgeGroup[req.body.selectAge].From;
        }
        const filteredMembers = await FamilyManagementService.queryFamilyMembers(filterOptions);

        res.json({ success: true, data: filteredMembers });
    } catch (error) {
        console.error('Lỗi khi lọc thành viên:', error);
        res.status(500).json({ success: false, message: 'Lỗi khi lọc thành viên' });
    }
}
var getAllMemberSortByRole = async (req, res) => {
    try {
        let listMemberInMemberRole = await FamilyManagementService.getAllMemberInMemberRole();
        let listMemberNotInMemberRole = await FamilyManagementService.getAllMemberNotInMemberRole();
        let data = listMemberInMemberRole + listMemberNotInMemberRole;
        res.send(data)
    } catch (error) {
        console.log(error)
    }
}


var getAllMember = async (req, res) => {
    try {
        // Gọi hàm từ dịch vụ để lấy tất cả thành viên
        const codeID = req.query.codeID
        const members = await FamilyManagementService.getAllMember(codeID);

        // Trả về danh sách thành viên trong phản hồi
        res.json({ success: true, data: members });
    } catch (error) {
        console.error('Lỗi khi lấy tất cả thành viên:', error);
        res.status(500).json({ success: false, message: 'Lỗi khi lấy tất cả thành viên' });
    }
}
var sortMembers = async (req, res) => {
    try {
        const { sortKey, order } = req.body; // Lấy thông tin sắp xếp từ request body
        // Lấy danh sách thành viên từ cơ sở dữ liệu
        const members = await FamilyManagementService.getAllMember();
        // Sắp xếp danh sách thành viên
        const sortedMembers = sortMembers(members, sortKey, order);

        res.json({
            success: true,
            data: sortedMembers,
        });
    } catch (error) {
        console.error('Lỗi khi sắp xếp thành viên:', error);
        res.status(500).json({ success: false, message: 'Lỗi khi sắp xếp thành viên' });
    }
}
function sortMembers(members, sortKey, order) {
    // Kiểm tra xem sortKey có hợp lệ hay không
    const validSortKeys = ['memberName', 'dob'];
    if (!validSortKeys.includes(sortKey)) {
        throw new Error('Invalid sort key');
    }

    let sortedMembers = [...members];
    if (order === 'desc') {
        sortedMembers.sort((a, b) => (b[sortKey] < a[sortKey] ? -1 : 1));
    } else {
        sortedMembers.sort((a, b) => (a[sortKey] < b[sortKey] ? -1 : 1));
    }

    return sortedMembers;
}

var getMember = async (req, res) => {
    try {
        // Log ra thông tin trong req.body
        let dataMember = await FamilyManagementService.getMemberByMemberID(req.query.MemberID);
        console.log(dataMember)
        if (dataMember == null || dataMember.length == 0) {
            return res.send(Response.dataNotFoundResponse());
        }
        if (CoreFunction.isDataStringExist(dataMember[0].Image)) {
            dataMember[0].Image = process.env.DNS_SERVER + dataMember[0].Image;
        }
        return res.send(Response.successResponse(dataMember));
    } catch (e) {
        console.log("Error: " + e);
        return res.send(Response.internalServerErrorResponse());
    }

}


module.exports = {
    addMember, updateMember, deleteMember, searchMember, filterMember, getAllMember, sortMembers,
    getListAgeGroup, getListBloodTypeGroup, getAllMemberSortByRole, GetCurrentParentMember, insertParentIdToMember,
    getMember, updateMemberToGenealogy, updateMemberPhoto, addChild
};