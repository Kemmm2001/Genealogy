const Response = require("../../Utils/Response");
const CoreFunction = require("../../Utils/CoreFunction");
const fs = require('fs');
var getAllEastAsiaCountries = async (req, res) => {
    try{
        const jsonFile = '/uploads/json/east-asia-countries.json';

        fs.readFile(jsonFile, 'utf8', (err, data) => {
          if (err) {
            return res.send(Response.internalServerErrorResponse(err));
          }
          
          const jsonData = JSON.parse(data);
          
          // làm gì đó với dữ liệu json
          console.log("jsonData : " +jsonData);
          return res.send(Response.successResponse(jsonData)); 
        });
    } catch (e) {
        return res.send(Response.internalServerErrorResponse(e));
    }
}

module.exports = { getAllEastAsiaCountries };