const FamilyHistoryManagementService = require("../../service/InformationGenealogy/FamilyHistoryManagement");
const Response = require("../../Utils/Response");



var addFamilyHistory = async (req, res) => {
    try {
        // Log ra thông tin trong req.body
        console.log('Request body: ', req.body);
        // các trường bắt buộc phải có trong req.body
        const requiredFields = [
            'CodeID',
            'Description'
        ];
        // Kiểm tra xem có đủ các trường của FamilyHistory không
        const missingFields = requiredFields.filter(field => !(field in req.body));
        console.log(missingFields);
        // trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            return res.send(Response.missingFieldsErrorResponse(missingFields));
        }
        console.log("No missing fields");
        // thêm FamilyHistory vào database
        let data = await FamilyHistoryManagementService.insertFamilyHistory(req.body)
        dataRes = {
            message: "Add FamilyHistory successfully",
            familyHistoryId: data.insertId,
            affectedRows: data.affectedRows
        }
        return res.send(Response.successResponse(dataRes));
    } catch (e) {
        console.log("Error: " + e);
        return res.send(Response.internalServerErrorResponse(e));
    }
};

var updateFamilyHistory = async (req, res) => {
    try {
        // Log ra thông tin trong req.body
        console.log('Request body: ', req.body);
        // các trường bắt buộc phải có trong req.body
        const requiredFields = [
            'FamilyHistoryID',
            'CodeID',
            'Description'
        ];
        // Kiểm tra xem có đủ các trường của FamilyHistory không
        const missingFields = requiredFields.filter(field => !(field in req.body));
        console.log(missingFields);
        // trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            return res.send(Response.missingFieldsErrorResponse(missingFields));
        }
        console.log("No missing fields");
        // lấy thông tin FamilyHistory từ database
        let data = await FamilyHistoryManagementService.getFamilyHistoryById(req.body.FamilyHistoryID)
        if (data == null || data.length == 0) {
            return res.send(Response.dataNotFoundResponse());
        }
        // cập nhật FamilyHistory vào database
        let dataUpdate = await FamilyHistoryManagementService.updateFamilyHistory(req.body)
        dataRes = {
            message: "Update FamilyHistory successfully",
            affectedRows: dataUpdate.affectedRows,
        }
        return res.send(Response.successResponse(dataRes));
    } catch (e) {
        console.log("Error: " + e);
        return res.send(Response.internalServerErrorResponse(e));
    }
};

var deleteFamilyHistory = async (req, res) => {
    try {
        // Log ra thông tin trong req.params
        console.log('Request params: ', req.params);
        // các trường bắt buộc phải có trong req.params
        const requiredFields = [
            'FamilyHistoryID'
        ];
        // Kiểm tra xem có đủ các trường của FamilyHistory không
        const missingFields = requiredFields.filter(field => !(field in req.params));
        console.log(missingFields);
        // trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            return res.send(Response.missingFieldsErrorResponse(missingFields));
        }
        console.log("No missing fields");
        // lấy thông tin FamilyHistory từ database
        let data = await FamilyHistoryManagementService.getFamilyHistoryById(req.params.FamilyHistoryID)
        if (data == null || data.length == 0) {
            return res.send(Response.dataNotFoundResponse());
        }
        // xóa FamilyHistory khỏi database
        let dataDelete = await FamilyHistoryManagementService.removeFamilyHistory(req.params.FamilyHistoryID)
        dataRes = {
            message: "Delete FamilyHistory successfully",
            affectedRows: dataDelete.affectedRows
        }
        return res.send(Response.successResponse(dataRes));
    } catch (e) {
        console.log("Error: " + e);
        return res.send(Response.internalServerErrorResponse(e));
    }
};


var getFamilyHistoryById = async (req, res) => {
    try {
        // Log ra thông tin trong req.params
        console.log('Request params: ', req.params);
        // các trường bắt buộc phải có trong req.params
        const requiredFields = [
            'id'
        ];
        // Kiểm tra xem có đủ các trường của FamilyHistory không
        const missingFields = requiredFields.filter(field => !(field in req.params));
        console.log(missingFields);
        // trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            return res.send(Response.missingFieldsErrorResponse(missingFields));
        }

        console.log("No missing fields");
        // lấy thông tin FamilyHistory từ database
        let data = await FamilyHistoryManagementService.getFamilyHistoryById(req.params.id)
        if (data == null || data.length == 0) {
            return res.send(Response.dataNotFoundResponse());
        } else {
            dataRes = {
                message: "View one FamilyHistory successfully",
                data: data
            }
            return res.send(Response.successResponse(dataRes));
        }
    } catch (e) {
        console.log("Error: " + e);
        return res.send(Response.internalServerErrorResponse(e));
    }
};

var getFamilyHistoryByCodeId = async (req, res) => {
    try {
        // Log ra thông tin trong req.params
        console.log('Request params: ', req.params);
        // các trường bắt buộc phải có trong req.params
        const requiredFields = [
            'id'
        ];
        // Kiểm tra xem có đủ các trường của FamilyHistory không
        const missingFields = requiredFields.filter(field => !(field in req.params));
        console.log(missingFields);
        // trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            return res.send(Response.missingFieldsErrorResponse(missingFields));
        }

        console.log("No missing fields");
        // lấy thông tin FamilyHistory từ database
        let data = await FamilyHistoryManagementService.getFamilyHistoryByCodeId(req.params.id)
        if (data == null || data.length == 0) {
            return res.send(Response.dataNotFoundResponse());
        } else {
            dataRes = {
                message: "View one FamilyHistory successfully",
                data: data
            }
            return res.send(Response.successResponse(dataRes));
        }
    } catch (e) {
        console.log("Error: " + e);
        return res.send(Response.internalServerErrorResponse(e));
    }
};

var getAllFamilyHistories = async (req, res) => {
    try {
        // Log ra thông tin trong req.body
        console.log('Request body: ', req.body);
        // lấy thông tin tất cả FamilyHistory từ database
        let data = await FamilyHistoryManagementService.getAllFamilyHistory();
        dataRes = {
            message: "View all FamilyHistory successfully",
            data: data
        }
        return res.send(Response.successResponse(dataRes));
    } catch (e) {
        console.log("Error: " + e);
        return res.send(Response.internalServerErrorResponse(e));
    }
};



module.exports = { addFamilyHistory, updateFamilyHistory, deleteFamilyHistory, getFamilyHistoryById, getFamilyHistoryByCodeId, getAllFamilyHistories };
