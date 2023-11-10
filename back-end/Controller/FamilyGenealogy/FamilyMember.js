const FamilyManagementService = require("../../service/FamilyGenealogy/FamilyManagement");
const Response = require("../../Utils/Response");
const CoreFunction = require("../../Utils/CoreFunction");
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
        req.body.Image = req.file.path;
        console.log('Request req.body: ', req.body);
        // các trường bắt buộc phải có trong req.body
        const requiredFields = [
            'MemberName',
            'NickName',
            'HasNickName',
            'BirthOrder',
            'NationalityId',
            'ReligionId',
            'IsDead',
            'Generation',
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
        console.log("No missing fields");
        // thêm member vào database
        let data = await FamilyManagementService.addMember(req.body);
        dataRes = {
            message: 'Add member successfully',
            memberId: data.insertId,
            affectedRows: data.affectedRows
        };
        return res.send(Response.successResponse(dataRes));
    } catch (e) {
        console.log("Error: " + e);
        return res.send(Response.internalServerErrorResponse(e));
    }
};

var updateMember = async (req, res) => {
    try {
        console.log('Request req.body: ', req.body);
        let dataMember = await FamilyManagementService.getMemberByMemberID(req.body.MemberID);
        if (dataMember == null  || dataMember.length == 0) {
            return res.send(Response.dataNotFoundResponse());
        }
        // các trường bắt buộc phải có trong req.body
        const requiredFields = [
            'MemberID',
            'MemberName',
            'NickName',
            'HasNickName',
            'BirthOrder',
            'NationalityId',
            'ReligionId',
            'IsDead',
            'Generation',
            'CodeId',
            'BloodType',
            'Male'
        ];
        // Kiểm tra xem có đủ các trường của FamilyMember không
        const missingFields = requiredFields.filter(field => !(field in req.body));
        // trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            return res.send(Response.missingFieldsErrorResponse(missingFields));
        }
        // update member vào database
        req.body.Image = req.file.path;
        let data = await FamilyManagementService.updateMember(req.body);
        dataRes = {
            message: 'Update member successfully',
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
        } // các trường bắt buộc phải có trong req.query
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
            message: 'Delete member successfully',
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
        if (dataMember == null  || dataMember.length == 0) {
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