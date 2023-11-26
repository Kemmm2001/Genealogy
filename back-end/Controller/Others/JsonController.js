// controllers/dataController.js
const DataModel = require('../../Models/dataModel');

const DataController = {
  createJSONFile: async (req, res) => {
    try {
      const data = req.body;
     console.log(data)
      const result = await DataModel.createJSONFile(data);
      console.log(result);
      res.status(200).json({ message: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Lỗi server' });
    }
  },

  importJsonFile: (req, res) => {
    const filePath = req.body.filePath;

    if (!filePath) {
      return res.status(400).json({ error: 'File path not provided' });
    }

    DataModel.readJsonFromFile(filePath)
      .then(jsonData => res.status(200).json(jsonData))
      .catch(error => res.status(500).json({ error: error.message }));
  },
};

module.exports = DataController;