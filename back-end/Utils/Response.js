const db = require('../Models/ConnectDB');

let coreResponse = (success, status_code, message, data) => {
    try {
        console.log(`success: ${success}, status_code: ${status_code}, message: ${message}`);
        return {
            success: success,
            status_code: status_code,
            message: message,
            data: data
        };
    } catch (error) {
        console.log(error)
    }
}

let coreErrorResponse = (status_code, message, data) => {
    try {
        db.connection.rollback();
        return coreResponse(false, status_code, message, data);
    } catch (error) {
        console.log(error)
    }
}

let badRequestResponse = (data, message) => {
    try {
        if (message == null) message = "Yêu cầu không hợp lệ, vui lòng kiểm tra lại";
        if (data == null) return coreErrorResponse(400, message);
        return coreErrorResponse(400, message, data);
    } catch (error) {
        console.log(error)
    }
}

let dataNotFoundResponse = (data, message) => {
    try {
        if (message == null) message = "Không tìm thấy dữ liệu phù hợp";
        if (data == null) return coreErrorResponse(404, message);
        return coreErrorResponse(404, message, data);
    } catch (error) {
        console.log(error)
    }
}
let successResponse = (data, message) => {
    try {
        if (message == null) message = "Thành công";
        db.connection.commit();
        if (data == null) return coreResponse(true, 200, message);
        return coreResponse(true, 200, message, data);
    } catch (error) {
        console.log(error)
    }
}

let internalServerErrorResponse = (data, message) => {
    try {
        if (message == null) message = "Lỗi hệ thống";
        if (data == null) return coreErrorResponse(500, message);
        return coreErrorResponse(500, message, data);
    } catch (error) {
        console.log(error)
    }
}

let missingFieldsErrorResponse = (missingFields) => {
    try {
        message = "Thiếu dữ liệu bắt buộc";
        data = {
            missing_fields: missingFields
        }
        return badRequestResponse(data, message);
    } catch (error) {
        console.log(error)
    }
}

let unauthorizedResponse = (data, message) => {
    try {
        if (message == null) message = "Không có quyền truy cập";
        if (data == null) return coreErrorResponse(401, message);
        return coreErrorResponse(401, message, data);
    } catch (error) {
        console.log(error)
    }
}

let forbiddenResponse = (data, message) => {
    try {
        if (message == null) message = "Bạn không được thực hiện hành động này";
        if (data == null) return coreErrorResponse(403, message);
        return coreErrorResponse(403, message, data);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    missingFieldsErrorResponse, badRequestResponse, dataNotFoundResponse, successResponse,
    internalServerErrorResponse, coreResponse, coreErrorResponse, unauthorizedResponse, forbiddenResponse
};