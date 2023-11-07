const fs = require('fs');

function getProvinceFromJSON() {
  return new Promise((resolve, reject) => {
    fs.readFile('city.json', 'utf8', (err, data) => {
      if (err) {
        console.log("Have err : " + err);
        reject(err);
      } else {
        try {
          const result = JSON.parse(data);
          resolve(result);
        } catch (parseError) {
          console.log("JSON parse error: " + parseError);
          reject(parseError);
        }
      }
    });
  });
}


function getDistrictFromJSON(CityId) {
    return new Promise((resolve, reject) => {
        fs.readFile('district.json', 'utf8', (err, data) => {
            if (err) {
                console.log("Have err : " + err);
                reject(err);
            } else {
                try {
                    const districtData = JSON.parse(data);
                    const filteredDistricts = districtData.filter(district => district.CityId === CityId);
                    resolve(filteredDistricts);
                } catch (parseError) {
                    console.log("JSON parse error: " + parseError);
                    reject(parseError);
                }
            }
        });
    });
}
module.exports = {getDistrictFromJSON, getProvinceFromJSON}