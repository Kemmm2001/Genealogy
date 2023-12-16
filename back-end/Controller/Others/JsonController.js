const JsonService = require('../../service/Backup/JsonSevice')
const Response = require('../../Utils/Response')
const UserService = require('../../service/Authencation/UserManagement')
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

const clearTree = async function (req, res) {
  try {
    const { memberIDs } = req.body;
    if (!Array.isArray(memberIDs) || memberIDs.length < 1) {
      return res.send(Response.internalServerErrorResponse('Invalid memberIDs format. Expecting an array with multiple elements.'));
    }
    console.log(memberIDs);

    let result;
    try {
      result = await JsonService.clearTree(memberIDs);
      console.log(result)
    } catch (error) {
      return res.send(Response.internalServerErrorResponse());
    }

    if (result == true) {
      return res.send(Response.successResponse(null, 'Xóa cây gia phả thành công'));
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
    let codeID = req.body.codeID;
    console.log('codeID: ' + codeID)
    let doesExist = await UserService.checkCodeID(codeID);
    if (doesExist > 0) {
      let result = await JsonService.importData(file, codeID);

      if (result) {
        return res.send(Response.successResponse(null, 'Import thành công'));
      } else {
        return res.send(Response.internalServerErrorResponse());
      }
    }
    return res.send(Response.dataNotFoundResponse(null, 'Không có codeId'));
  } catch (error) {
    return res.send(Response.internalServerErrorResponse());

  }
}

module.exports = { exportData, clearTree, importData };
