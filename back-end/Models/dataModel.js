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
  
  readJsonFromFile: (filePath) => {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          return reject(new Error('Error reading JSON file'));
        }

        try {
          const jsonData = JSON.parse(data);
          resolve(jsonData);
        } catch (parseError) {
          reject(new Error('Error parsing JSON file'));
        }
      });
    });
  },
};

module.exports = DataModel;
