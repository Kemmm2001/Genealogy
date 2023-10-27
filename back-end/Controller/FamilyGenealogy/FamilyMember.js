const FamilyManagementService = require("../../service/FamilyGenealogy/FamilyManagement");

missingFieldsError = function (missingFields) {
    console.error(`Missing required fields: ${missingFields.join(', ')}`);
    return response = {
        success: false,
        message: 'Missing required fields',
        missingFields: missingFields
    };
}

noDataFound = function (res) {
    message = "No data found";
    console.log(message);
    response = {
        success: false,
        message: message
    };
    return res.status(404).json(response);
}

var addMember = async (req, res) => {
    try {
        // Log ra thông tin trong req.body
        console.log('Request body: ', req.body);
        let response;
        // các trường bắt buộc phải có trong req.body
        const requiredFields = [
            'memberName',
            'nickName',
            'hasNickName',
            'birthOrder',
            'origin',
            'nationalityId',
            'religionId',
            'dob',
            'lunarDob',
            'birthPlace',
            'IsDead',
            'generation',
            'codeId',
            'bloodType',
            'male'
        ];
        // Kiểm tra xem có đủ các trường của FamilyMember không
        const missingFields = requiredFields.filter(field => !(field in req.body));
        console.log(missingFields);
        // trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            return res.status(400).json(missingFieldsError(missingFields));

        }
        
    } catch (e) {
        res.send(e);
    }
};

var updateMember = async (req, res) => {
    try {
        // Log ra thông tin trong req.body
        console.log('Request body: ', req.body);
        let response;
        // các trường bắt buộc phải có trong req.body
        const requiredFields = [
            'memberID',
            'memberName',
            'nickName',
            'hasNickName',
            'birthOrder',
            'origin',
            'nationalityId',
            'religionId',
            'dob',
            'lunarDob',
            'birthPlace',
            'IsDead',
            'generation',
            'codeId',
            'bloodType',
            'male'
        ];
        // Kiểm tra xem có đủ các trường của FamilyMember không
        const missingFields = requiredFields.filter(field => !(field in req.body));
        // trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            return res.status(400).json(missingFieldsError(missingFields));

        }
        // update member vào database
        let data = await FamilyManagementService.updateMember(req.body);
        response = {
            success: true,
            message: 'Update member successfully',
            data: {
                memberID: req.body.memberID,
                affectedRows: data.affectedRows,
                changedRows: data.changedRows
            }
        };
        return res.json(response);

    } catch (e) {
        res.send(e);
    }
}

var deleteMember = async (req, res) => {
    try {
        console.log("Request body: ", req.body);
        let response;
        let result = await FamilyManagementService.deleteMember(req.body.memberID);

        response = {
            success: true,
            message: 'Delete member successfully',
            data: {
                memberID: req.body.memberID,
                affectedRows: result.affectedRows,
                changedRows: result.changedRows
            }
        };
        return res.json(response);

    } catch (e) {
        res.send(e);
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
        const filterOptions = req.body; // Lấy filterOptions từ request body
        const filteredMembers = await FamilyManagementService.filterMember(filterOptions);

        res.json({
            success: true,
            data: filteredMembers,
        });
    } catch (error) {
        console.error('Lỗi khi lọc thành viên:', error);
        res.status(500).json({ success: false, message: 'Lỗi khi lọc thành viên' });
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
  


module.exports = { addMember, updateMember, deleteMember, searchMember, filterMember, getAllMember, sortMembers};