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

var getListAgeGroup = async (req, res) => {
    res.send(ListAgeGroup)
}
var getListBloodTypeGroup = async (req, res) => {
    res.send(ListBloodTypeGroup)
}

var addMember = async (req, res) => {
    try {
        db.connection.beginTransaction();
        // nếu có file ảnh thì lưu đường dẫn vào req.body.Image, còn ko thì gán null
        if (req.file != null) {
            console.log("Đã vào trường hợp có file ảnh");
            console.log("req.file.path: ", req.file.path);
            req.body.Image = req.file.path;
        }
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
        const action = ['AddFather', 'AddMother', 'AddChild', 'AddHusband', 'AddWife', 'AddNormal', 'AddFirst'];
        if (!action.includes(req.body.Action)) {

            return res.send(Response.badRequestResponse(null, "Action không hợp lệ"));
        }
        console.log("Action hợp lệ");
        let dataRes = {};
        let data = await FamilyManagementService.addMember(req.body);
        // trường hợp muốn thêm thành viên mà không có trong cây gia phả
        if (req.body.Action == 'AddNormal') {
            console.log("Đã vào trường hợp thêm thành viên mà không có trong cây gia phả");
            await FamilyManagementService.setGeneration(0, data.insertId);
        }
        // trường hợp muốn thêm thành viên đầu tiên ( tổ phụ tổ tiên)
        else if (req.body.Action == 'AddFirst') {
            await FamilyManagementService.setGeneration(1, data.insertId);
            await ManagementFamilyHead.addForefather(data.insertId, req.body.CodeID);
        }
        // trường hợp muốn thêm thành viên mà có trong cây gia phả
        else {
            console.log("Đã vào trường hợp thêm thành viên có trong cây gia phả");
            let currentMember, memberRole;
            if (req.body.Action != "AddChild") {
                if (!CoreFunction.isDataNumberExist(req.body.CurrentMemberID)) {

                    return res.send(Response.badRequestResponse());
                }
                currentMember = await FamilyManagementService.getMemberByMemberID(req.body.CurrentMemberID);
                console.log("currentMember: ", currentMember);
                if (!CoreFunction.isDataNumberExist(currentMember)) {

                    return res.send(Response.dataNotFoundResponse(null, "Thành viên hiện tại đang không tồn tại"));
                }
                memberRole = await ViewFamilyTree.getAllMemberRole(req.body.CurrentMemberID);
                console.log("memberRole: ", memberRole);
            }
            // trường hợp muốn thêm cha mẹ
            if (req.body.Action == 'AddFather' || req.body.Action == 'AddMother') {
                console.log("Đã vào trường hợp thêm cha mẹ");
                // nếu vào trường hợp thêm cha
                if (req.body.Action == 'AddFather') {
                    console.log("Đã vào trường hợp thêm cha");
                    // nếu đã có cha thì ko thêm
                    if (currentMember[0].FatherID != null && currentMember[0].FatherID != '' && currentMember[0].FatherID != 0) {
                        let errorMessage = 'Thành viên này đã có cha';

                        return res.send(Response.badRequestResponse(null, errorMessage));
                    }
                    // nếu giới tính là nữ thì ko thêm
                    if (req.body.Male == 0) {
                        let errorMessage = 'Bạn chỉ có thể thêm cha cho thành viên';

                        return res.send(Response.badRequestResponse(null, errorMessage));
                    }
                    FamilyManagementService.insertFatherIDToMember(data.insertId, req.body.CurrentMemberID);
                }
                // nếu vào trường hợp thêm mẹ
                else if (req.body.Action == 'AddMother') {
                    console.log("Đã vào trường hợp thêm mẹ");
                    // nếu đã có mẹ thì ko thêm
                    if (currentMember[0].MotherID != null && currentMember[0].MotherID != '' && currentMember[0].MotherID != 0) {
                        let errorMessage = 'Thành viên này đã có mẹ';

                        return res.send(Response.badRequestResponse(null, errorMessage));
                    }
                    // nếu giới tính là nam thì ko thêm
                    if (req.body.Male == 1) {
                        let errorMessage = 'Bạn chỉ có thể thêm mẹ cho thành viên';

                        return res.send(Response.badRequestResponse(null, errorMessage));
                    }
                    FamilyManagementService.insertMotherIDToMember(data.insertId, req.body.CurrentMemberID);
                }
                await FamilyManagementService.setGeneration(currentMember[0].Generation - 1, data.insertId);
            }
            // trường hợp muốn thêm con cái
            else if (req.body.Action == 'AddChild') {
                console.log("Đã vào trường hợp thêm con cái");

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
                    /*  // nếu muốn add con cái mà thành viên hiện tại là nữ hoặc là chồng của người trong gia phả thì sẽ không được phép
                    if (
                        (currentMember[0].FatherID != null && currentMember[0].Male == 0) ||
                        (currentMember[0].FatherID == null && currentMember[0].Male == 1 && memberRole[0].RoleID != 1)
                    ) {
                        let errorMessage = 'Không thể thêm con cái cho thành viên này';
                        
                        return res.send(Response.badRequestResponse(null, errorMessage));
                    } */
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
                    // thêm mẹ vào MotherID của con
                    FamilyManagementService.insertMotherIDToMember(motherData[0].MemberID, data.insertId);
                }
                // nếu cả FatherID và MotherID đều có ở req.body
                if (CoreFunction.isDataNumberExist(req.body.FatherID) && CoreFunction.isDataNumberExist(req.body.MotherID)) {
                }
                // bắt đầu kiểm tra birthorder
                let listChild, parentGeneration;
                // trường hợp có cha những ko có mẹ 
                if (CoreFunction.isDataNumberExist(req.body.FatherID) && !CoreFunction.isDataNumberExist(req.body.MotherID)) {
                    listChild = await FamilyManagementService.getMembersByFatherID(req.body.FatherID);
                    parentGeneration = fatherData[0].Generation;
                }
                // trường hợp có mẹ những ko có cha
                else if (!CoreFunction.isDataNumberExist(req.body.FatherID) && CoreFunction.isDataNumberExist(req.body.MotherID)) {
                    listChild = await FamilyManagementService.getMembersByMotherID(req.body.MotherID);
                    parentGeneration = motherData[0].Generation;
                }
                // trường hợp có cả cha và mẹ
                else if (CoreFunction.isDataNumberExist(req.body.FatherID) && CoreFunction.isDataNumberExist(req.body.MotherID)) {
                    listChild = await FamilyManagementService.getMembersByFatherIDAndMotherID(req.body.FatherID, req.body.MotherID);
                    parentGeneration = fatherData[0].Generation;
                }
                // nếu birthorder đã tồn tại thì ko thể add
                if (isBirthOrderExist(data.insertId, req.body.BirthOrder, listChild)) {
                    let errorMessage = `Con thứ ${req.body.BirthOrder} đã tồn tại`;

                    return res.send(Response.badRequestResponse(null, errorMessage));
                }
                // kết thúc kiểm tra birthorder
                await FamilyManagementService.setBirthOrder(req.body.BirthOrder, data.insertId);
                await FamilyManagementService.setGeneration(parentGeneration + 1, data.insertId);
                // await FamilyManagementService.insertParentIdToMember(req.body.CurrentMemberID, data.insertId);
            }
            // trường hợp muốn thêm vợ chồng
            else if (req.body.Action == 'AddHusband' || req.body.Action == 'AddWife') {
                console.log("Đã vào trường hợp thêm vợ chồng");
                // nếu không có parentid và có marriageid thì không thể thêm vợ chồng
                if (currentMember[0].ParentID == null && currentMember[0].MarriageID != null) {
                    let errorMessage = 'Thành viên này đã cưới rồi';

                    return res.send(Response.badRequestResponse(null, errorMessage));
                }
                let objData = {};
                // nếu vào trường hợp thêm chồng 
                if (req.body.Action == 'AddHusband') {
                    console.log("Đã vào trường hợp thêm chồng");
                    // nếu giới tính là nữ thì ko thêm
                    if (req.body.Male == 0) {
                        let errorMessage = 'Bạn chỉ có thể thêm chồng là nam cho thành viên này';

                        return res.send(Response.badRequestResponse(null, errorMessage));
                    }
                    objData = {
                        husbandID: data.insertId,
                        wifeID: req.body.CurrentMemberID,
                        codeID: req.body.CodeID
                    }
                }
                // nếu vào trường hợp thêm vợ
                else if (req.body.Action == 'AddWife') {
                    console.log("Đã vào trường hợp thêm vợ");
                    // nếu giới tính là nam thì ko thêm
                    if (req.body.Male == 1) {
                        let errorMessage = 'Bạn chỉ có thể thêm vợ là nữ cho thành viên này';

                        return res.send(Response.badRequestResponse(null, errorMessage));
                    }
                    objData = {
                        husbandID: req.body.CurrentMemberID,
                        wifeID: data.insertId,
                        codeID: req.body.CodeID
                    }
                }
                await FamilyManagementService.setGeneration(currentMember[0].Generation, data.insertId);
                await MarriageManagement.addMarriage(objData);
                // await FamilyManagementService.InsertMarriIdToMember(data.insertId, req.body.CurrentMemberID);
                // await FamilyManagementService.InsertMarriIdToMember(req.body.CurrentMemberID, data.insertId);
            }
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

var isBirthOrderExist = (memberID, birthOrder, listBirthOrderExist) => {
    console.log("Vào hàm isBirthOrderExist");
    console.log(`listBirthOrderExist: ${listBirthOrderExist}`)
    console.log(`listBirthOrderExist length:  ${listBirthOrderExist.length}, memberID: ${memberID}, birthOrder: ${birthOrder}`);
    for (let i = 0; i < listBirthOrderExist.length; i++) {
        console.log(`listBirthOrderExist[i].BirthOrder: ${listBirthOrderExist[i].BirthOrder}, listBirthOrderExist[i].MemberID: ${listBirthOrderExist[i].MemberID}`);
        if (listBirthOrderExist[i].BirthOrder == birthOrder && listBirthOrderExist[i].MemberID != memberID) {
            return true;
        }
    }
    return false;
}

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
                return res.send(Response.badRequestResponse(null, "Thành viên này đã có người liên quan, không thể thay đổi giới tính"));
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

var isHasRelatedPerson = (dataMember) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("Vào hàm isHasRelatedPerson với dataMember: ", dataMember.MemberID);
            let listChild = await FamilyManagementService.getMembersByFatherIDOrMotherID(dataMember.MemberID, dataMember.MemberID);
            // console.log(`listChild: ${JSON.stringify(listChild)}`)
            let listMarriage = await MarriageManagement.getMarriageByHusbandIDOrWifeID(dataMember.MemberID, dataMember.MemberID);
            // console.log(`listMarriage: ${JSON.stringify(listMarriage)}`)
            if (listChild.length > 0 || listMarriage.length > 0) {
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
        const action = ['AddFather', 'AddMother', 'AddChild', 'AddHusband', 'AddWife'];
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
        if (req.body.Action == 'AddFather' || req.body.Action == 'AddMother') {
            await FamilyManagementService.setGeneration(inGenealogyMemeber[0].Generation - 1, outGenealogyMemeber[0].MemberID);
            // nếu vào trường hợp thêm cha
            if (req.body.Action == 'AddFather') {
                // nếu đã có cha thì ko thêm
                if (CoreFunction.isDataNumberExist(inGenealogyMemeber[0].FatherID)) {
                    let errorMessage = 'Thành viên này đã có cha';
                    return res.send(Response.badRequestResponse(null, errorMessage));
                }
                // nếu giới tính là nữ thì ko thêm
                if (outGenealogyMemeber[0].Male == 0) {
                    let errorMessage = 'Bạn chỉ có thể thêm cha cho thành viên';
                    return res.send(Response.badRequestResponse(null, errorMessage));
                }
                FamilyManagementService.insertFatherIDToMember(outGenealogyMemeber[0].MemberID, inGenealogyMemeber[0].MemberID);
            } else if (req.body.Action == 'AddMother') {
                // nếu đã có mẹ thì ko thêm
                if (CoreFunction.isDataNumberExist(inGenealogyMemeber[0].MotherID)) {
                    let errorMessage = 'Thành viên này đã có mẹ';
                    return res.send(Response.badRequestResponse(null, errorMessage));
                }
                // nếu giới tính là nam thì ko thêm
                if (outGenealogyMemeber[0].Male == 1) {
                    let errorMessage = 'Bạn chỉ có thể thêm mẹ cho thành viên';
                    return res.send(Response.badRequestResponse(null, errorMessage));
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
            await FamilyManagementService.setGeneration(inGenealogyMemeber[0].Generation + 1, outGenealogyMemeber[0].MemberID);
            // await FamilyManagementService.insertParentIdToMember(inGenealogyMemeber[0].MemberID, outGenealogyMemeber[0].MemberID);
        }
        // trường hợp muốn thêm vợ chồng
        else if (req.body.Action == 'AddHusband' || req.body.Action == 'AddWife') {
            await FamilyManagementService.setGeneration(inGenealogyMemeber[0].Generation, outGenealogyMemeber[0].MemberID);
            await FamilyManagementService.InsertMarriIdToMember(outGenealogyMemeber[0].MemberID, inGenealogyMemeber[0].MemberID);
            await FamilyManagementService.InsertMarriIdToMember(inGenealogyMemeber[0].MemberID, outGenealogyMemeber[0].MemberID);
        }
        return res.send(Response.successResponse(null, "Thêm thành viên vào trong gia phả thành công"));
    } catch (e) {
        console.log("Error: " + e);
        return res.send(Response.internalServerErrorResponse());
    }
}

var deleteMember = async (req, res) => {
    try {
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
        await FamilyManagementService.deleteMemberRelated(dataMember[0]);
        await FamilyManagementService.deleteMember(req.query.MemberID);
        // xóa ảnh cũ
        await CoreFunction.deleteImage(dataMember[0].Image);
        dataRes = {
            MemberID: req.query.MemberID,
        }
        return res.send(Response.successResponse(dataRes));
    } catch (e) {
        console.log("Error: " + e);
        return res.send(Response.internalServerErrorResponse());
    }
}


var InsertMarrieIdToMember = async (req, res) => {
    try {
        let memberID = req.body.memberID;
        let marriageID = req.body.marriageID;
        await FamilyManagementService.InsertMarriIdToMember(memberID, marriageID);
        res.send("Insert Successfuly");
    } catch (e) {
        console.log(e)
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
        return res.send(Response.successResponse(dataMember));
    } catch (e) {
        console.log("Error: " + e);
        return res.send(Response.internalServerErrorResponse());
    }

}


module.exports = {
    addMember, updateMember, deleteMember, searchMember, filterMember, getAllMember, sortMembers, InsertMarrieIdToMember,
    getListAgeGroup, getListBloodTypeGroup, getAllMemberSortByRole, GetCurrentParentMember, insertParentIdToMember,
    getMember, updateMemberToGenealogy, updateMemberPhoto
};