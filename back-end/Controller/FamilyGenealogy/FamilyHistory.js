const FamilyHistoryManagementService = require("../../service/FamilyGenealogy/FamilyHistoryManagement");

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
            console.error(`Missing required fields: ${missingFields.join(', ')}`);

            response = {
                success: false,
                message: 'Missing required fields',
                missingFields: missingFields
            };

            return res.status(400).json(response);
        }
        console.log("No missing fields");
        // thêm FamilyHistory vào database
        await FamilyHistoryManagementService.insertFamilyHistory(req.body)
            .then((data) => {
                console.log("data: " + data);
                console.log("Add FamilyHistory successfully");
                response = {
                    success: true,
                    message: 'Add FamilyHistory successfully',
                    data: {
                        familyHistoryId: data.insertId,
                        affectedRows: data.affectedRows
                    }
                };
            })
            .catch((err) => {
                response = {
                    success: false,
                    message: 'Add FamilyHistory failed'
                };

            });


        return res.json(response);


    } catch (e) {
        console.log(e);
        res.send(e);
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
            console.error(`Missing required fields: ${missingFields.join(', ')}`);

            response = {
                success: false,
                message: 'Missing required fields',
                missingFields: missingFields
            };

            return res.status(400).json(response);
        }
        console.log("No missing fields");

        // lấy thông tin FamilyHistory từ database
        await FamilyHistoryManagementService.getFamilyHistoryById(req.body.FamilyHistoryID)
            .then((data) => {
                console.log("data: " + data);
                if (data.length == 0) {
                    message = "View one FamilyHistory failed, no FamilyHistory found";
                    console.log(message);
                    response = {
                        success: false,
                        message: message
                    };
                    return res.status(404).json(response);
                } else {
                    message = "View one FamilyHistory successfully";
                    console.log(message);
                    response = {
                        success: true,
                        message: message,
                        data: data
                    };
                }

            })
            .catch((err) => {
                response = {
                    success: false,
                    message: 'View one FamilyHistory failed'
                };
                return res.json(response);
            });

        // cập nhật FamilyHistory vào database
        await FamilyHistoryManagementService.updateFamilyHistory(req.body)
            .then((data) => {
                console.log("data: " + data);
                message = "Update FamilyHistory successfully";
                console.log(message);
                response = {
                    success: true,
                    message: message,
                    data: {
                        affectedRows: data.affectedRows,
                    }
                };
            })
            .catch((err) => {
                response = {
                    success: false,
                    message: 'Update FamilyHistory failed',
                };

            });


        return res.json(response);


    } catch (e) {
        console.log(e);
        res.send(e);
    }
};

var deleteFamilyHistory = async (req, res) => {
    try {
        // Log ra thông tin trong req.body
        console.log('Request body: ', req.body);
        // các trường bắt buộc phải có trong req.body
        const requiredFields = [
            'FamilyHistoryID'
        ];
        // Kiểm tra xem có đủ các trường của FamilyHistory không
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
        // xóa FamilyHistory khỏi database
        await FamilyHistoryManagementService.removeFamilyHistory(req.body)
            .then((data) => {
                console.log("data: " + data);
                console.log("Delete FamilyHistory successfully");
                response = {
                    success: true,
                    message: 'Delete FamilyHistory successfully',
                    data: {
                        affectedRows: data.affectedRows
                    }
                };
            })
            .catch((err) => {
                response = {
                    success: false,
                    message: 'Delete FamilyHistory failed'
                };

            });


        return res.json(response);


    } catch (e) {
        console.log(e);
        res.send(e);
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
            console.error(`Missing required fields: ${missingFields.join(', ')}`);

            response = {
                success: false,
                message: 'Missing required fields',
                missingFields: missingFields
            };

            return res.status(400).json(response);
        }

        console.log("No missing fields");
        // lấy thông tin FamilyHistory từ database
        await FamilyHistoryManagementService.getFamilyHistoryById(req.params.id)
            .then((data) => {
                console.log("data: " + data);
                if (data.length == 0) {
                    message = "View one FamilyHistory failed, no FamilyHistory found";
                    console.log(message);
                    response = {
                        success: false,
                        message: message
                    };
                } else {
                    message = "View one FamilyHistory successfully";
                    console.log(message);
                    response = {
                        success: true,
                        message: message,
                        data: data
                    };
                }

            })
            .catch((err) => {
                response = {
                    success: false,
                    message: 'View one FamilyHistory failed'
                };

            });


        return res.json(response);


    } catch (e) {
        console.log(e);
        res.send(e);
    }
};

var getAllFamilyHistory = async (req, res) => {
    try {
        // Log ra thông tin trong req.body
        console.log('Request body: ', req.body);
        // lấy thông tin tất cả FamilyHistory từ database
        await FamilyHistoryManagementService.getAllFamilyHistory()
            .then((data) => {
                console.log("data: " + data);
                console.log("View all FamilyHistory successfully");
                response = {
                    success: true,
                    message: 'View all FamilyHistory successfully',
                    data: data
                };
            })
            .catch((err) => {
                response = {
                    success: false,
                    message: 'View all FamilyHistory failed'
                }
            });


        return res.json(response);


    } catch (e) {
        console.log(e);
        res.send(e);
    }
};



module.exports = { addFamilyHistory, updateFamilyHistory, deleteFamilyHistory, getFamilyHistoryById, getAllFamilyHistory };
