let coreResponse = (success, status_code, data) => {
    response = {
        success: success,
        status_code: status_code,
        data: data
    };
    return response;
}

let badRequestResponse = (message) => {
    if (message == null) message = "Bad request";
    return coreResponse(false, 400, message);
}

let dataNotFoundResponse = (message) => {
    if (message == null) message = "Data not found";
    return coreResponse(false, 404, message);
}
let successResponse = (message) => {
    if (message == null) message = "Success";
    return coreResponse(true, 200, message);
}

let internalServerErrorResponse = (message) => {
    if (message == null) message = "Internal server error";
    return coreResponse(false, 500, message);
}

let missingFieldsErrorResponse = (missingFields) => {
    data = {
        message: "Missing required fields",
        missing_fields: missingFields
    }
    return badRequestResponse(data);
}

let errorResponse = (message) => {
    if (message == null) message = "Error";
    return coreResponse(false, 500, message);
}

module.exports = {
    missingFieldsErrorResponse, badRequestResponse, dataNotFoundResponse, successResponse,
    internalServerErrorResponse, coreResponse, errorResponse
};