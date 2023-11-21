const FamilyHistoryManagementService = require("../../service/InformationGenealogy/FamilyHistoryManagement");
const Response = require("../../Utils/Response");
const CoreFunction = require("../../Utils/CoreFunction");


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
        const missingFields = CoreFunction.missingFields(requiredFields, req.body);
        console.log(missingFields);
        // trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            return res.send(Response.missingFieldsErrorResponse(missingFields));
        }
        console.log("No missing fields");
        // thêm FamilyHistory vào database
        let data = await FamilyHistoryManagementService.insertFamilyHistory(req.body)
        dataRes = {
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
        const missingFields = CoreFunction.missingFields(requiredFields, req.body);
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
        // Log ra thông tin trong req.query
        console.log('Request query: ', req.query);
        // các trường bắt buộc phải có trong req.query
        const requiredFields = [
            'FamilyHistoryID'
        ];
        // Kiểm tra xem có đủ các trường của FamilyHistory không
        const missingFields = CoreFunction.missingFields(requiredFields, req.query);
        console.log(missingFields);
        // trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            return res.send(Response.missingFieldsErrorResponse(missingFields));
        }
        console.log("No missing fields");
        // lấy thông tin FamilyHistory từ database
        let data = await FamilyHistoryManagementService.getFamilyHistoryById(req.query.FamilyHistoryID)
        if (data == null || data.length == 0) {
            return res.send(Response.dataNotFoundResponse());
        }
        // xóa FamilyHistory khỏi database
        let dataDelete = await FamilyHistoryManagementService.removeFamilyHistory(req.query.FamilyHistoryID)
        dataRes = {
            affectedRows: dataDelete.affectedRows
        }
        return res.send(Response.successResponse(dataRes));
    } catch (e) {
        console.log("Error: " + e);
        return res.send(Response.internalServerErrorResponse(e));
    }
};


var getFamilyHistory = async (req, res) => {
    try {
        let reqData = req.query;
        // Log ra thông tin trong req.query
        console.log('Request query: ', reqData);
        // lấy thông tin FamilyHistory từ database
        // những thông tin có thể lấy được: FamilyHistoryID, CodeID
        let data;
        if (reqData.FamilyHistoryID != null && reqData.FamilyHistoryID != undefined && reqData.FamilyHistoryID !== "") {
            console.log(`Get FamilyHistory by FamilyHistoryID : ${reqData.FamilyHistoryID}`);
            data = await FamilyHistoryManagementService.getFamilyHistoryById(req.query.FamilyHistoryID)

        } else if (reqData.CodeID != null && reqData.CodeID != undefined && reqData.CodeID !== "") {
            console.log(`Get FamilyHistory by CodeID : ${reqData.CodeID}`);
            data = await FamilyHistoryManagementService.getFamilyHistoryByCodeId(req.query.CodeID)
        }
        
        console.log("data: " + data);
        if (data == null || data.length == 0) {
            return res.send(Response.dataNotFoundResponse());
        } else {
            return res.send(Response.successResponse(data));
        }
    } catch (e) {
        console.log("Error: " + e);
        return res.send(Response.internalServerErrorResponse(e));
    }
};


var getAllFamilyHistories = async (req, res) => {
    try {
        // lấy thông tin tất cả FamilyHistory từ database
        let data = await FamilyHistoryManagementService.getAllFamilyHistory();
        return res.send(Response.successResponse(data));
    } catch (e) {
        console.log("Error: " + e);
        return res.send(Response.internalServerErrorResponse(e));
    }
};



module.exports = { addFamilyHistory, updateFamilyHistory, deleteFamilyHistory, getFamilyHistory, getAllFamilyHistories };
