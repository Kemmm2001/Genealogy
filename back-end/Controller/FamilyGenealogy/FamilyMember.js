const FamilyManagementService = require("../../service/FamilyGenealogy/FamilyManagement");
const Response = require("../../Utils/Response");
const CoreFunction = require("../../Utils/CoreFunction");
const db = require('../../Models/ConnectDB');
const ManagementFamilyHead = require("../../service/InformationGenealogy/ManagementFamilyHead");
const ViewFamilyTree = require("../../service/FamilyGenealogy/ViewFamilyTree");
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
            req.body.Image = req.file.path;
        } else {
            req.body.Image = null;
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
            CoreFunction.deleteImage(req.file);
            return res.send(Response.missingFieldsErrorResponse(missingFields));
        }
        console.log("Đã có đủ các trường bắt buộc");
        const action = ['AddParent', 'AddChild', 'AddMarriage', 'AddNormal', 'AddFirst'];
        // Kiểm tra xem action có nằm trong 4 trường hợp AddParent, AddChild, AddMarriage, AddNormal không
        if (!action.includes(req.body.Action)) {
            CoreFunction.deleteImage(req.file);
            return res.send(Response.badRequestResponse(null, "Action không hợp lệ"));
        }
        console.log("Action hợp lệ");
        let dataRes = {};
        let data = await FamilyManagementService.addMember(req.body);
        // trường hợp muốn thêm thành viên mà không có trong cây gia phả
        if (req.body.Action === 'AddNormal') {
            console.log("Đã vào trường hợp thêm thành viên mà không có trong cây gia phả");
            await FamilyManagementService.setGeneration(0, data.insertId);
        }
        // trường hợp muốn thêm thành viên đầu tiên ( tổ phụ tổ tiên)
        else if (req.body.Action === 'AddFirst') {
            await FamilyManagementService.setGeneration(1, data.insertId);
            await ManagementFamilyHead.addForefather(data.insertId, req.body.CodeID);
        }
        // trường hợp muốn thêm thành viên mà có trong cây gia phả
        else {
            console.log("Đã vào trường hợp thêm thành viên có trong cây gia phả");
            if (CoreFunction.isEmptyOrNullOrSpaces(req.body.CurrentMemberID)) {
                CoreFunction.deleteImage(req.file);
                return res.send(Response.badRequestResponse());
            }
            let currentMember = await FamilyManagementService.getMemberByMemberID(req.body.CurrentMemberID);
            console.log("currentMember: ", currentMember);
            if (currentMember == null || currentMember.length == 0) {
                CoreFunction.deleteImage(req.file);
                return res.send(Response.dataNotFoundResponse(null, "CurrentMemberID không tồn tại"));
            }
            let memberRole = await ViewFamilyTree.getAllMemberRole(req.body.CurrentMemberID);
            // trường hợp muốn thêm cha mẹ
            if (req.body.Action === 'AddParent') {
                await FamilyManagementService.setGeneration(currentMember[0].Generation - 1, data.insertId);
                await FamilyManagementService.insertParentIdToMember(data.insertId, req.body.CurrentMemberID);
            }
            // trường hợp muốn thêm con cái
            else if (req.body.Action === 'AddChild') {
                // nếu muốn add con cái mà thành viên hiện tại là nữ hoặc là chồng của người trong gia phả thì sẽ không được phép
                if (
                    (currentMember[0].ParentID != null && currentMember[0].Male === 0) ||
                    (currentMember[0].ParentID == null && currentMember[0].Male === 1 && memberRole[0].RoleID !== 1)
                ) {
                    let errorMessage = 'Không thể thêm con cái cho thành viên này';
                    CoreFunction.deleteImage(req.file);
                    return res.send(Response.badRequestResponse(null, errorMessage));
                }
                // nếu birthorder đã tồn tại thì ko thể add
                let listChild = await FamilyManagementService.getMembersByParentID(req.body.CurrentMemberID);
                for (let i = 0; i < listChild.length; i++) {
                    if (listChild[i].BirthOrder === req.body.BirthOrder) {
                        let errorMessage = `Con thứ ${req.body.BirthOrder} đã tồn tại`;
                        CoreFunction.deleteImage(req.file);
                        return res.send(Response.badRequestResponse(null, errorMessage));
                    }
                }
                await FamilyManagementService.setGeneration(currentMember[0].Generation + 1, data.insertId);
                await FamilyManagementService.insertParentIdToMember(req.body.CurrentMemberID, data.insertId);
            }
            // trường hợp muốn thêm vợ chồng
            else if (req.body.Action === 'AddMarriage') {
                await FamilyManagementService.setGeneration(currentMember[0].Generation, data.insertId);
                await FamilyManagementService.InsertMarriIdToMember(data.insertId, req.body.CurrentMemberID);
                await FamilyManagementService.InsertMarriIdToMember(req.body.CurrentMemberID, data.insertId);
            }
        }
        // kết thúc phần thêm member theo action
        db.connection.commit();
        dataRes.MemberID = data.insertId;
        dataRes.affectedRows = data.affectedRows;
        return res.send(Response.successResponse(dataRes));
    } catch (e) {
        console.log("Error: " + e);
        CoreFunction.deleteImage(req.file);
        return res.send(Response.internalServerErrorResponse(e));
    }
};

var updateMember = async (req, res) => {
    try {
        if (req.file != null) {
            req.body.Image = req.file.path;
        }
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
            CoreFunction.deleteImage(req.file);
            return res.send(Response.missingFieldsErrorResponse(missingFields));
        }
        let dataMember = await FamilyManagementService.getMemberByMemberID(req.body.MemberID);
        if (dataMember == null || dataMember.length == 0) {
            CoreFunction.deleteImage(req.file);
            return res.send(Response.dataNotFoundResponse());
        }
        // nếu birthorder đã tồn tại thì ko thể add
        let listChild = await FamilyManagementService.getMembersByParentID(dataMember[0].ParentID);
        for (let i = 0; i < listChild.length; i++) {
            if (listChild[i].BirthOrder === req.body.BirthOrder && listChild[i].MemberID !== req.body.MemberID) {
                let errorMessage = `Con thứ ${req.body.BirthOrder} đã tồn tại`;
                CoreFunction.deleteImage(req.file);
                return res.send(Response.badRequestResponse(null, errorMessage));
            }
        }
        req.body.Generation = dataMember[0].Generation;
        req.body.CodeID = dataMember[0].CodeID;
        req.body.Image = dataMember[0].Image;
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
        CoreFunction.deleteImage(req.file);
        return res.send(Response.internalServerErrorResponse(e));
    }
}

var updateMemberToGenealogy = async (req, res) => {
    try {
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
        // Kiểm tra xem action có nằm trong 4 trường hợp AddParent, AddChild, AddMarriage không
        if (!action.includes(req.body.Action)) {
            return res.send(Response.badRequestResponse(null, "Action không hợp lệ"));
        }
        let inGenealogyMemeber = await FamilyManagementService.getMemberByMemberID(req.body.InGenealogyID);
        let outGenealogyMemeber = await FamilyManagementService.getMemberByMemberID(req.body.OutGenealogyID);
        if (inGenealogyMemeber == null || inGenealogyMemeber.length == 0 || outGenealogyMemeber == null || outGenealogyMemeber.length == 0) {
            return res.send(Response.dataNotFoundResponse(null, "Thành viên không tồn tại"));
        }
        // nếu không cùng gia phả, tức là không cùng CodeID
        if (inGenealogyMemeber[0].CodeID !== outGenealogyMemeber[0].CodeID) {
            return res.send(Response.badRequestResponse(null, "Hai thành viên không cùng gia phả"));
        }
        // nếu thành viên out không có generation là 0 thì sai 
        if (outGenealogyMemeber[0].Generation !== 0) {
            return res.send(Response.badRequestResponse(null, "Thế hệ của thành viên được add không hợp lệ"));
        }
        let dataRes = {};
        // trường hợp muốn thêm cha mẹ
        if (req.body.Action === 'AddParent') {
            await FamilyManagementService.setGeneration(inGenealogyMemeber[0].Generation - 1, outGenealogyMemeber[0].MemberID);
            await FamilyManagementService.insertParentIdToMember(outGenealogyMemeber[0].MemberID, inGenealogyMemeber[0].MemberID);
        }
        // trường hợp muốn thêm con cái
        else if (req.body.Action === 'AddChild') {
            // nếu birthorder đã tồn tại thì ko thể add
            let listChild = await FamilyManagementService.getMembersByParentID(inGenealogyMemeber[0].MemberID);
            for (let i = 0; i < listChild.length; i++) {
                if (listChild[i].BirthOrder === outGenealogyMemeber[0].BirthOrder && listChild[i].MemberID !== outGenealogyMemeber[0].MemberID) {
                    let errorMessage = `Con thứ ${outGenealogyMemeber[0].BirthOrder} đã tồn tại`;
                    CoreFunction.deleteImage(req.file);
                    return res.send(Response.badRequestResponse(null, errorMessage));
                }
            }
            await FamilyManagementService.setGeneration(inGenealogyMemeber[0].Generation + 1, outGenealogyMemeber[0].MemberID);
            await FamilyManagementService.insertParentIdToMember(inGenealogyMemeber[0].MemberID, outGenealogyMemeber[0].MemberID);
        }
        // trường hợp muốn thêm vợ chồng
        else if (req.body.Action === 'AddMarriage') {
            await FamilyManagementService.setGeneration(inGenealogyMemeber[0].Generation, outGenealogyMemeber[0].MemberID);
            await FamilyManagementService.InsertMarriIdToMember(outGenealogyMemeber[0].MemberID, inGenealogyMemeber[0].MemberID);
            await FamilyManagementService.InsertMarriIdToMember(inGenealogyMemeber[0].MemberID, outGenealogyMemeber[0].MemberID);
        }
        return res.send(Response.successResponse(null, "Thêm thành viên vào trong gia phả thành công"));
    } catch (e) {
        console.log("Error: " + e);
        return res.send(Response.internalServerErrorResponse(e));
    }
}

var deleteMember = async (req, res) => {
    try {
        // Log ra thông tin trong req.query      
        let dataMember = await FamilyManagementService.getMemberByMemberID(req.query.MemberID);
        if (dataMember == null || dataMember.length == 0) {
            return res.send(Response.dataNotFoundResponse());
        }
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
        await FamilyManagementService.deleteMember(req.query.MemberID);
        dataRes = {
            MemberID: req.query.MemberID,
        }
        return res.send(Response.successResponse(dataRes));
    } catch (e) {
        console.log("Error: " + e);
        return res.send(Response.internalServerErrorResponse(e));
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
        const codeID = req.body.codeID
        const members = await FamilyManagementService.getAllMember(codeID);
        console.log("abc")
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
        return res.send(Response.internalServerErrorResponse(e));
    }

}


module.exports = {
    addMember, updateMember, deleteMember, searchMember, filterMember, getAllMember, sortMembers, InsertMarrieIdToMember,
    getListAgeGroup, getListBloodTypeGroup, getAllMemberSortByRole, GetCurrentParentMember, insertParentIdToMember,
    getMember, updateMemberToGenealogy
};