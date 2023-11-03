const AddressService = require('../../service/InformationGenealogy/AddressService')
const Response = require("../../Utils/Response"); 

var getProvince = async (req, res) => {
    try {
        // Log ra thông tin trong req.body
        console.log('Request body: ', req.body);
        let data = await AddressService.getProvince();
        dataRes = {
            message: "View all Province successfully",
            data: data
        }
        return res.send(Response.successResponse(dataRes));
    } catch (e) {
        console.log("Error: " + e);
        return res.send(Response.internalServerErrorResponse(e));
    }
};

var getDistrict = async (req, res) => {
    try {
        // Log ra thông tin trong req.params
        console.log('Request params: ', req.params);
        // các trường bắt buộc phải có trong req.params
        const requiredFields = [
            'CityId'
        ];
    
        const missingFields = requiredFields.filter(field => !(field in req.params));
        console.log(missingFields);
        // trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            return res.send(Response.missingFieldsErrorResponse(missingFields));
        }
        console.log("No missing fields");

        let data = await AddressService.getDistrict(req.params.id)
        if (data == null || data.length == 0) {
            return res.send(Response.dataNotFoundResponse());
        } else {
            dataRes = {
                message: "View District successfully",
                data: data
            }
            return res.send(Response.successResponse(dataRes));
        }
    } catch (e) {
        console.log("Error: " + e);
        return res.send(Response.internalServerErrorResponse(e));
    }
};
module.exports = {getProvince, getDistrict}