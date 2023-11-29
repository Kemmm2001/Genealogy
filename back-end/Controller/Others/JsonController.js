const JsonService = require('../../service/Backup/JsonSevice')

var exportData = async function(req, res) {
  try {
    const { memberIDs } = req.body;
    console.log(memberIDs)
    const result = await JsonService.exportData(memberIDs);
    if (result.success) { 
      res.json({ message: 'Xuất dữ liệu thành công', fileName: result.fileName });
    } else {
      res.status(500).json({ error: 'Lỗi khi xuất dữ liệu' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi xử lý xuất dữ liệu' });
  }
}

var importData =  async function (req, res) {
  try {
  
      const result = await JsonService.importData(req.file);

      if (result.success) {
          res.json({ message: 'Nhập dữ liệu thành công' });
      } else {
          res.status(500).json({ error: 'Lỗi khi nhập dữ liệu' });
      }
  } catch (error) {
      res.status(500).json({ error: 'Lỗi khi xử lý nhập dữ liệu' });
  }
}

module.exports = { exportData,importData };
