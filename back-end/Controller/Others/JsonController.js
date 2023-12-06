const JsonService = require('../../service/Backup/JsonSevice')
const Response = require('../../Utils/Response')

var exportData = async function (req, res) {
  try {
    const { memberIDs } = req.body;
    console.log(memberIDs)
    const result = await JsonService.exportData(memberIDs);
    if (result.success) {
      return res.send(Response.successResponse({ fileName: result.fileName }, 'Export thành công'));
    } else {
      return res.send(Response.dataNotFoundResponse());
    }
  } catch (error) {
    return res.send(Response.BadRequest());
  }
}

var importData = async function (req, res) {
  try {
    const file = req.file.path;
    const result = await JsonService.importData(file);

    if (result.success) {
      res.json({ message: 'Nhập dữ liệu thành công' });
    } else {
      res.status(500).json({ error: 'Lỗi khi nhập dữ liệu' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi xử lý nhập dữ liệu' });
  }
}

module.exports = { exportData, importData };
