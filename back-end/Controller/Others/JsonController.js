const JsonService = require('../../service/Backup/JsonSevice')
const Response = require('../../Utils/Response')

const exportData = async function (req, res) {
  try {
    const { memberIDs } = req.body;
    if (!Array.isArray(memberIDs) || memberIDs.length < 1) {
      return res.send(Response.internalServerErrorResponse('Invalid memberIDs format. Expecting an array with multiple elements.'));
    }
    console.log(memberIDs);
    
    let result;
    try {
      result = await JsonService.exportData(memberIDs);
    } catch (error) {
      return res.send(Response.internalServerErrorResponse());
    }

    if (result.success) {
      return res.send(Response.successResponse({ fileName: result.fileName }, 'Export thành công'));
    } else {
      return res.send(Response.dataNotFoundResponse());
    }
  } catch (error) {
    return res.send(Response.internalServerErrorResponse());
  }
};

var importData = async function (req, res) {
  try {
    const file = req.file.path;
    const result = await JsonService.importData(file);

    if (result.success) {
      return res.send(Response.successResponse(null, 'Import thành công'));
    } else {
      return res.send(Response.internalServerErrorResponse());

    }
  } catch (error) {
    return res.send(Response.internalServerErrorResponse());

  }
}

module.exports = { exportData, importData };
