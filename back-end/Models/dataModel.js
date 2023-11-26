// models/dataModel.js
const fs = require('fs');

const DataModel = {
  createJSONFile: (data) => {
    return new Promise((resolve, reject) => {
      if (!data || !Array.isArray(data)) {
        console.log(data)
        return reject('Invalid data format');
      }

      const jsonData = JSON.stringify(data, null, 2);

      fs.writeFile('output.json', jsonData, 'utf8', (err) => {
        if (err) {
          return reject('Error creating JSON file');
        }
        resolve('File JSON đã được tạo thành công');
      });
    });
  },
};

module.exports = DataModel;
