const FamilyManagementService = require("../../service/FamilyGenealogy/FamilyManagement");
const Response = require("../../Utils/Response");
const CoreFunction = require("../../Utils/CoreFunction");
const db = require('../../Models/ConnectDB');
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
            'NationalityId',
            'ReligionId',
            'IsDead',
            'CurrentGeneration',
            'CodeId',
            'BloodType',
            'Male'
        ];
        // Kiểm tra xem có đủ các trường của FamilyMember không
        const missingFields = requiredFields.filter(field => !(field in req.body));
        console.log(missingFields);
        // trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            return res.send(Response.missingFieldsErrorResponse(missingFields));
        }
        db.connection.beginTransaction();
        let dataRes = {};
        // kiểm tra xem req.body.Action có tồn tại và là 1 trong 3 trường hợp AddParent, AddChild, AddMarriage không
        let data = await FamilyManagementService.addMember(req.body);
        if (req.body.Action != null) {
            const action = ['AddParent', 'AddChild', 'AddMarriage'];
            if (action.filter(field => field === req.body.Action).length == 0) {
                db.connection.rollback();
                return res.send(Response.badRequestResponse(null, "Action không hợp lệ"));
            }
            if (req.body.CurrentMemberID == null) {
                db.connection.rollback();
                return res.send(Response.badRequestResponse(null, "Thiếu CurrentMemberID"));
            }
            let currentMember = await FamilyManagementService.getMemberByMemberID(req.body.CurrentMemberID);
            if (currentMember == null || currentMember.length == 0) {
                db.connection.rollback();
                return res.send(Response.dataNotFoundResponse(null, "CurrentMemberID không tồn tại"));
            }
            /* nếu mà đã cưới, đồng thời không có bố/mẹ, thì tức là member này là vợ/chồng 
                  của người trong gia phả, thì sẽ không được thêm ai cả */
            if (req.body.Action === 'AddParent' || req.body.Action === 'AddChild') {
                if ((currentMember[0].MarriageID !== -1 || currentMember[0].MarriageID != null)
                    && (currentMember[0].ParentID === -1) || currentMember[0].ParentID == null) {
                    db.connection.rollback();
                    // Khai báo thông báo chung
                    let commonMessage = "Thành viên này là ";

                    // Kiểm tra giới tính và thiết lập thông báo cụ thể
                    let genderMessage = currentMember[0].Male == 1 ? "chồng" : "vợ";

                    // Tạo thông báo hoàn chỉnh
                    let errorMessage = `${commonMessage}${genderMessage} của người trong gia phả, không thể thêm cha mẹ hoặc con cái`;

                    // Gửi phản hồi về cho người dùng
                    return res.send(Response.badRequestResponse(null, errorMessage));
                }
            }
            // trường hợp muốn thêm cha mẹ
            if (req.body.Action === 'AddParent') {
                await FamilyManagementService.setGeneration(req.body.CurrentGeneration + 1, data.insertId);
                await FamilyManagementService.insertParentIdToMember(data.insertId, req.body.CurrentMemberID);
            }
            // trường hợp muốn thêm con cái
            else if (req.body.Action === 'AddChild') {
                await FamilyManagementService.setGeneration(req.body.CurrentGeneration - 1, data.insertId);
                await FamilyManagementService.insertParentIdToMember(req.body.CurrentMemberID, data.insertId);
            }
            // trường hợp muốn thêm vợ chồng
            else if (req.body.Action === 'AddMarriage') {
                await FamilyManagementService.setGeneration(req.body.CurrentGeneration, data.insertId);
                await FamilyManagementService.InsertMarriIdToMember(data.insertId, req.body.CurrentMemberID);
                await FamilyManagementService.InsertMarriIdToMember(req.body.CurrentMemberID, data.insertId);
            }
            // kết thúc phần thêm member theo mối quan hệ cha mẹ, con cái, vợ chồng

        } else {
            await FamilyManagementService.setGeneration(req.body.CurrentGeneration, data.insertId);
        }
        db.connection.commit();
        dataRes.MemberID = data.insertId;
        dataRes.affectedRows = data.affectedRows;
        return res.send(Response.successResponse(dataRes));
    } catch (e) {
        console.log("Error: " + e);
        db.connection.rollback();
        return res.send(Response.internalServerErrorResponse(e));
    }
};

var updateMember = async (req, res) => {
    try {
        if (req.file != null) {
            req.body.Image = req.file.path;
        } else {
            req.body.Image = null;
        }
        console.log('Request req.body: ', req.body);
        // các trường bắt buộc phải có trong req.body
        const requiredFields = [
            'MemberID',
            'MemberName',
            'BirthOrder',
            'NationalityId',
            'ReligionId',
            'IsDead',
            'BloodType',
            'Male'
        ];
        // Kiểm tra xem có đủ các trường của FamilyMember không
        const missingFields = requiredFields.filter(field => !(field in req.body));
        // trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            return res.send(Response.missingFieldsErrorResponse(missingFields));
        }
        let dataMember = await FamilyManagementService.getMemberByMemberID(req.body.MemberID);
        if (dataMember == null || dataMember.length == 0) {
            return res.send(Response.dataNotFoundResponse());
        }
        req.body.Generation = dataMember[0].Generation;
        req.body.CodeID = dataMember[0].CodeID;
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
        let result = await FamilyManagementService.deleteMember(req.query.MemberID);
        dataRes = {
            MemberID: req.query.MemberID,
            affectedRows: result.affectedRows,
            changedRows: result.changedRows
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
        const members = await FamilyManagementService.getAllMember();
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
    getMember
};