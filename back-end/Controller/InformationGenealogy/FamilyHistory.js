const FamilyHistoryManagementService = require("../../service/InformationGenealogy/FamilyHistoryManagement");
const Response = require("../../Utils/Response");
const CoreFunction = require("../../Utils/CoreFunction");
const { addAlbumPhoto } = require("./AlbumPhotoController");


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

        let maxPositon = await FamilyHistoryManagementService.getMaxOrder_position(req.body.CodeID);
        if (!maxPositon) {
            return res.send(Response.internalServerErrorResponse());
        }
        // thêm FamilyHistory vào database
        let data = await FamilyHistoryManagementService.insertFamilyHistory(req.body, maxPositon)
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

var swapOrder_position = async (req, res) => {
    try {
        console.log("vào đây")
        let HistoryID1 = req.body.HistoryID1;
        let HistoryID2 = req.body.HistoryID2;
        let Position1 = req.body.Position1;
        let Position2 = req.body.Position2;
        console.log(req.body)
        let data = await FamilyHistoryManagementService.updateOrder_positionHistory(Position1, HistoryID2);
        let data1 = await FamilyHistoryManagementService.updateOrder_positionHistory(Position2, HistoryID1);
        if (data && data1) {
            return res.send(Response.successResponse(null, 'Thay đổi thứ tự lịch sử thành công'));
        } else {
            return res.send(Response.internalServerErrorResponse());
        }
    } catch (error) {
        return res.send(Response.internalServerErrorResponse(error));
    }
}

var searchHistory = async (req, res) => {
    try {
        let CodeID = req.body.CodeID;
        let keySearch = req.body.keySearch;
        let data = await FamilyHistoryManagementService.searchHistory(CodeID, keySearch)
        if (data) {
            return res.send(Response.successResponse(data))
        } else {
            return res.send(Response.internalServerErrorResponse());
        }
    } catch (error) {
        return res.send(Response.internalServerErrorResponse(error));
    }
}
var filterHistory = async (req, res) => {
    try {
        let startDate = req.body.startDate;
        let endDate = req.body.endDate;
        let data = await FamilyHistoryManagementService.filterHistory(startDate, endDate)
        if (data) {
            return res.send(Response.successResponse(data))
        } else {
            return res.send(Response.internalServerErrorResponse());
        }
    } catch (error) {
        return res.send(Response.internalServerErrorResponse(error));
    }
}


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



module.exports = {
    addFamilyHistory, updateFamilyHistory, deleteFamilyHistory, getFamilyHistory, getAllFamilyHistories,
    searchHistory, swapOrder_position, filterHistory
};
