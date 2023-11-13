const db = require('../Models/ConnectDB');

let coreResponse = (success, status_code, message, data) => {
    console.log(`success: ${success}, status_code: ${status_code}, message: ${message}, data: ${data}`);
    return {
        success: success,
        status_code: status_code,
        message: message,
        data: data
    };
}

let coreErrorResponse = (status_code, message, data) => {
    db.connection.rollback();
    return coreResponse(false, status_code, message, data);
}

let badRequestResponse = (data, message) => {
    if (message == null) message = "Yêu cầu không hợp lệ, vui lòng kiểm tra lại";
    if (data == null) return coreErrorResponse(400, message);
    return coreErrorResponse(400, message, data);
}

let dataNotFoundResponse = (data, message) => {
    if (message == null) message = "Không tìm thấy dữ liệu phù hợp";
    if (data == null) return coreErrorResponse( 404, message);
    return coreErrorResponse(404, message, data);
}
let successResponse = (data, message) => {
    if (message == null) message = "Thành công";
    if (data == null) return coreResponse(true, 200, message);
    return coreResponse(true, 200, message, data);
}

let internalServerErrorResponse = (data, message) => {
    if (message == null) message = "Lỗi hệ thống";
    if (data == null) return coreErrorResponse(500, message);
    return coreErrorResponse(500, message, data);
}

let missingFieldsErrorResponse = (missingFields) => {
    message = "Thiếu dữ liệu bắt buộc";
    data = {
        missing_fields: missingFields
    }
    return badRequestResponse(data, message);
}

module.exports = {
    missingFieldsErrorResponse, badRequestResponse, dataNotFoundResponse, successResponse,
    internalServerErrorResponse, coreResponse
};