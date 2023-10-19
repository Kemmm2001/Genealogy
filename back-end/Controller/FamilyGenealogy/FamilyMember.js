const e = require("express");
const FamilyManagementService = require("../../service/FamilyGenealogy/FamilyManagement");

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
            'isAlive',
            'placeOfDeath',
            'graveSite',
            'note',
            'generation',
            'codeId'
        ];
        // Kiểm tra xem có đủ các trường của FamilyMember không
        const missingFields = requiredFields.filter(field => !(field in req.body));
        console.log(missingFields);
        // trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            console.error(`Missing required fields: ${missingFields.join(', ')}`);

            response = {
                success: false,
                message: 'Missing required fields',
                missingFields: missingFields
            };

            return res.status(400).json(response);
        }
        console.log("No missing fields");
        // thêm member vào database
        let data = await FamilyManagementService.addMember(req.body);
        console.log("Add member successfully");
        let relationShipInReq = req.body.relationship;
        // nếu có trường relationship thì thêm vào database mối quan hệ giữa 2 người 
        if (relationShipInReq) {
            console.log("Relationship: ", relationShipInReq);
            let relationship = await FamilyManagementService.getRelationship(relationShipInReq.fromRelationship, relationShipInReq.toRelationship);
           console.log("Relationship: ", relationship);
            if (relationship == null || relationship.length != 2) {
                response = {
                    success: false,
                    message: 'Mối quan hệ không tồn tại hoặc không phù hợp',
                };
                return res.json(response);
            }
            let memberTo = await FamilyManagementService.getMember(relationShipInReq.memberId);
            console.log("Member to: ", memberTo);
            let relationshipCreated = await FamilyManagementService.createRelationship(data.insertId, memberTo[0].MemberID, relationship[0].RelationshipID, relationship[1].RelationshipID);
            console.log("Relationship created: ", relationshipCreated);
        }

        response = {
            success: true,
            message: 'Add member successfully',
            data: {
                memberId: data.insertId,
                affectedRows: data.affectedRows
            }
        };
        return res.json(response);

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
            'memberId',
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
            'isAlive',
            'placeOfDeath',
            'graveSite',
            'note',
            'generation',
            'codeId'
        ];
        // Kiểm tra xem có đủ các trường của FamilyMember không
        const missingFields = requiredFields.filter(field => !(field in req.body));
        // trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            console.error(`Missing required fields: ${missingFields.join(', ')}`);

            response = {
                success: false,
                message: 'Update member failed, missing required fields',
                missingFields: missingFields
            };

            return res.status(400).json(response);
        }
        // update member vào database
        let data = await FamilyManagementService.updateMember(req.body);
        response = {
            success: true,
            message: 'Update member successfully',
            data: {
                memberId: req.body.memberId,
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
        if(result.affectedRows == 0){
            response = {
                success: false,
                message: 'Delete member failed, no member found',
                data: {
                    memberId: req.body.memberId,
                    affectedRows: result.affectedRows,
                    changedRows: result.changedRows
                }
            };
            return res.json(response);
        }else{
            response = {
                success: true,
                message: 'Delete member successfully',
                data: {
                    memberId: req.body.memberId,
                    affectedRows: result.affectedRows,
                    changedRows: result.changedRows
                }
            };
            return res.json(response);
        }
       
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
var filterMember = async function(req, res) {
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

        // Trả về danh sách thành viên trong phản hồi
        res.json({ success: true, data: members });
    } catch (error) {
        console.error('Lỗi khi lấy tất cả thành viên:', error);
        res.status(500).json({ success: false, message: 'Lỗi khi lấy tất cả thành viên' });
    }
}

module.exports = { addMember, updateMember, deleteMember, searchMember, filterMember, getAllMember};