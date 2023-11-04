let coreResponse = (success, status_code, message, data) => {
    return {
        success: success,
        status_code: status_code,
        message: message,
        data: data
    };
}

let badRequestResponse = (data, message) => {
    if (message == null) message = "Bad request";
    if (data == null) return coreResponse(false, 400, message);
    return coreResponse(false, 400, message, data);
}

let dataNotFoundResponse = (data, message) => {
    if (message == null) message = "Data not found";
    if (data == null) return coreResponse(false, 404, message);
    return coreResponse(false, 404, message, data);
}
let successResponse = (data, message) => {
    if (message == null) message = "Success";
    if (data == null) return coreResponse(true, 200, message);
    return coreResponse(true, 200, message, data);
}

let internalServerErrorResponse = (data, message) => {
    if (message == null) message = "Internal server error";
    if (data == null) return coreResponse(false, 500, message);
    return coreResponse(false, 500, message, data);
}

let missingFieldsErrorResponse = (missingFields) => {
    message = "Missing required fields";
    data = {
        missing_fields: missingFields
    }
    return badRequestResponse(message, data);
}

module.exports = {
    missingFieldsErrorResponse, badRequestResponse, dataNotFoundResponse, successResponse,
    internalServerErrorResponse, coreResponse
};