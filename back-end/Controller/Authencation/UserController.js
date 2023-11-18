const UserService = require('../../service/Authencation/UserManagement');
const createError = require('http-errors')
const { registerSchema, loginSchema } = require('../../helper/validation_schema')
const bcrypt = require('bcrypt');
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../../helper/jwt_helper')
const Response = require('../../Utils/Response')

var registerUser = async (req, res) => {
  try {
    if (req.body.password !== req.body.repassword) {
      return res.send(Response.dataNotFoundResponse(null, 'Nhập Lại Mật khẩu không trùng nhau'));
    }
    let doesExist = await UserService.checkMail(req.body.email);
    if (doesExist > 0) {
      return res.send(Response.dataNotFoundResponse(null, `${req.body.email} đã được đăng kí`));
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    let newUser = await UserService.create(req.body.username, req.body.email, hashedPassword);
    return res.send(Response.successResponse(newUser, 'Đăng ký thành công'));

  } catch (error) {
    if (error.isJoi === true) {
      error.status = 422;
    }
    res.status(error.status || 500).json({ error: error.message });
  }
}

var getHistoryCodeID = async (req, res) => {
  try {
    let accountID = req.query.accountID;
    let data = await UserService.getHistoryLoginCodeID(accountID);
    if (data) {
      return res.send(Response.successResponse(data));
    } else {
      return res.send(Response.dataNotFoundResponse());
    }
  } catch (error) {
    return res.send(Response.dataNotFoundResponse(error));
  }
}

var getListRoleMember = async (req, res) => {
  try {
    console.log('req: ' + req.query)
    let data = await UserService.getListRoleMember(req.query.codeID);
    if (data) {
      return res.send(Response.successResponse(data));
    } else {
      return res.send(Response.dataNotFoundResponse());
    }
  } catch (error) {
    return res.send(Response.dataNotFoundResponse(error));
  }
}

var ChangePassword = async (req, res) => {
  try {
    let data = await UserService.getUserInfo(req.body.accountID);
    if (data) {
      let isPasswordMatch = await bcrypt.compare(req.body.currentpassword, data.password);
      if (!isPasswordMatch) {
        return res.send(Response.dataNotFoundResponse(null, 'Mật khẩu không đúng'));
      } else {
        let hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
        let data = await UserService.ChangePassword(hashedPassword, req.body.accountID)
        if (data == true) {
          return res.send(Response.successResponse());
        } else {
          return res.send(Response.dataNotFoundResponse());
        }
      }
    } else {
      return res.send(Response.dataNotFoundResponse());
    }
  } catch (error) {
    return res.send(Response.dataNotFoundResponse(error));
  }
}

var loginUser = async (req, res) => {
  try {
    let checkEmail = await UserService.checkMail(req.body.email);
    let data = await UserService.getUser(req.body.email)

    if (checkEmail == 0) {
      return res.send(Response.dataNotFoundResponse(null, 'Email không tồn tại'));
    }
    const isPasswordMatch = await bcrypt.compare(req.body.password, data.password);

    if (!isPasswordMatch) {
      return res.send(Response.dataNotFoundResponse(null, 'Mật khẩu không đúng'));
    }
    const accessToken = await signAccessToken(data.accountID)
    console.log(accessToken)
    const refreshToken = await signRefreshToken(data.accountID)
    return res.send({ accessToken, refreshToken })

  } catch (error) {
    if (error.isJoi === true) {
      error.status = 422;
    }
    res.status(error.status || 500).json({ error: error.message });
  }
}

var getUserInfor = async (req, res) => {
  try {
    console.log(req.body)
    let data = await UserService.getUserInfo(req.body.accountID)
    if (!data) {
      return res.send(Response.dataNotFoundResponse(null, 'Lỗi hệ thống,không tìm thấy tài khoản'));
    }

    return res.send(Response.successResponse(data));

  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
}

var getUserCodeID = async (req, res) => {
  try {
    let data = await UserService.getUserCodeID(req.body.accountID)
    if (!data) throw createError.Conflict(`${data} không tìm thấy`)

    return res.send({ data })

  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
}


var refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body
    if (!refreshToken) throw createError.BadRequest()
    const { insertId } = await verifyRefreshToken(refreshToken)

    const accessToken = await signAccessToken(insertId)

    res.send({ accessToken: accessToken })
  } catch (error) {

  }
}

var registerGenealogy = async (req, res) => {
  try {
    const value = req.body;
    console.log(req.body)
    let codeID;
    let doesExist = true;

    let checkCreated = await UserService.checkCodeCreatedByID(req.body.accountID)
    if (checkCreated > 0) {
      return res.send(Response.internalServerErrorResponse(null, 'Tài khoản này đã đăng ký gia phả. Không thể đăng ký tiếp'));
    }
    else {
      while (doesExist) {
        codeID = generateRandomNumber();
        doesExist = await UserService.checkCodeID(codeID);
      }

      let data1 = await UserService.insertIntoFamily(value, codeID);
      if (data1) {
        try {
          await UserService.insertAccountFamily(value.accountID, codeID, 1);
          return res.send(Response.successResponse(codeID, 'Đăng ký gia phả thành công'));
        } catch (error) {
          return res.send(Response.internalServerErrorResponse(error, 'Lỗi hệ thống'));
        }
      } else {
        return res.send(Response.internalServerErrorResponse(null, 'Lỗi hệ thống'));
      }
    }

  } catch (error) {
    res.status(500).json({ error: 'Lỗi nội bộ' });
  }
}



var getGenealogy = async (req, res) => {
  try {
    const request = req.body;
    let doesExist = await UserService.checkID(request.accountID)
    if (doesExist) throw createError.Conflict(`đã đăng kí code gia phả`);
    let data = await UserService.insertAccountFamily(request.accountID, request.codeID, 3);
    return res.json({ data })
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });

  }
}

var setRole = async (req, res) => {
  try {

    const data = req.body;

    let doesExist = await UserService.checkAccountID(data.accountID);

    if (doesExist) throw createError.Conflict('Không có người dùng');

    let dataUpdate = await UserService.updateRoleID(data)
    let dataRes = {
      affectedRows: dataUpdate.affectedRows,
    }
    return res.send(dataRes)
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
}

var checkCodeID = async (req, res) => {
  try {
    let CodeID = req.body.codeID;
    let accountID = req.body.accountID;
    let doesExist = await UserService.checkCodeID(CodeID);
    if (doesExist > 0) {
      let checkCodeIdCreator = await UserService.checkCodeIdCreator(accountID, CodeID, 1);
      console.log('checkCodeIdCreator: ' + checkCodeIdCreator)
      if (checkCodeIdCreator > 0) {
        return res.send(Response.successResponse())
      }
      else {
        await UserService.insertAccountFamily(accountID, CodeID, 3);
        return res.send(Response.successResponse())
      }
    } else {
      return res.send(Response.dataNotFoundResponse(CodeID, `Mã ${CodeID} Không tồn tại`))
    }

  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};



function generateRandomNumber() {
  const randomNumber = Math.floor(100000 + Math.random() * 900000).toString();
  return randomNumber;
}

module.exports = {
  registerUser, loginUser, refreshToken, registerGenealogy, getGenealogy, setRole,
  checkCodeID, getUserInfor, getUserCodeID, getHistoryCodeID, ChangePassword, getListRoleMember
};