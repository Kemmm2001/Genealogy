const Response = require("../../Utils/Response"); 
const fs = require('fs');


var getProvince = async (req, res) => {
    try {
        fs.readFile('city.json', 'utf8', (err, data) => {
            if (err) {
                return res.send(Response.internalServerErrorResponse(err));
            }

            const jsonData = JSON.parse(data);
            // Extract the 'name' properties from the JSON data
            const names = jsonData.map((province) => province.name);
            
            // Send only the list of names as a response
            return res.send(names);
        });
    } catch (e) {
        return res.send(Response.internalServerErrorResponse(e));
    }
}

var getDistrict = (req, res) => {
    try {
        let cityId = req.query.cityID;
        fs.readFile('district.json', 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Internal server error' });
            }
            try {
                const jsonData = JSON.parse(data);

                // Lọc và chỉ trả về các name của quận có CityId tương ứng
                const filteredDistricts = jsonData
                    .filter(district => district.CityId == cityId)
                    .map(district => district.name);

                // Kiểm tra xem có danh sách quận nào không
                if (filteredDistricts.length > 0) {
                    return res.json(filteredDistricts);
                } else {
                    return res.status(404).json({ error: 'Không tìm thấy quận cho cityId này' });
                }
            } catch (parseError) {
                return res.status(500).json({ error: 'JSON parse error' });
            }
        });
    } catch (e) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};



module.exports = {getProvince, getDistrict}