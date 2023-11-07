const AddressService = require('../../service/InformationGenealogy/AddressService')
const Response = require("../../Utils/Response"); 

var getProvince = async (req, res) => {
    try {
        let data = await AddressService.getProvinceFromJSON();
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

        let data = await AddressService.getDistrictFromJSON(req.params.id)
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