const UserService = require('../../service/Authencation/UserManagement');
const createError = require('http-errors')
const { registerSchema, loginSchema } = require('../../helper/validation_schema')
const bcrypt = require('bcrypt');
const { signAccessToken, signRefreshToken, signRePassToken, verifyRepassToken, verifyRefreshToken } = require('../../helper/jwt_helper')
const Response = require('../../Utils/Response')
const sendMail = require('../../Utils/SystemOperation');


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
    return res.send(Response.internalServerErrorResponse(null, error.message));
  }
}

//Nguyễn Lê Hùng
var getInformationTree = async (req, res) => {
  try {
    let CodeID = req.query.CodeID;
    let data = await UserService.getInformationGenealogy(CodeID);
    if (data) {
      return res.send(Response.successResponse(data))
    } else {
      return res.send(Response.dataNotFoundResponse())
    }
  } catch (error) {
    return res.send(Response.dataNotFoundResponse(error))
  }
}

//Nguyễn Lê Hùng
var getMemberRole = async (req, res) => {
  try {
    let accountID = req.body.accountID;
    let codeID = req.body.codeID;
    let data = await UserService.getMemberRole(accountID, codeID);
    if (data) {
      return res.send(Response.successResponse(data));
    } else {
      return res.send(Response.dataNotFoundResponse());
    }
  } catch (error) {
    return res.send(Response.dataNotFoundResponse(error));
  }
}

var changeUsername = async (req, res) => {
  try {
    console.log(req.body)
    let AccountID = req.body.AccountID;
    let username = req.body.username;
    let data = await UserService.changeUsername(AccountID, username);
    if (data) {
      return res.send(Response.successResponse(null, 'Thay đổi username thành công'));
    } else {
      return res.send(Response.dataNotFoundResponse());
    }
  } catch (error) {
    return res.send(Response.dataNotFoundResponse(error));
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
    console.log('req: ' + req.query.CodeID)
    let data = await UserService.getListRoleMember(req.query.CodeID);
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
    let isPasswordMatch = await bcrypt.compare(req.body.password, data.password);

    if (!isPasswordMatch) {
      return res.send(Response.dataNotFoundResponse(null, 'Mật khẩu không đúng'));
    }
    let accessToken = await signAccessToken(data.accountID)
    // let refreshToken = await signRefreshToken(data.accountID)
    console.log(refreshToken)
    return res.send(Response.successResponse(accessToken, 'Login thành công'));

  } catch (error) {
    if (error.isJoi === true) {
      error.status = 422;
    }
    return res.send(Response.internalServerErrorResponse(null, error.message));
  }
}

var getUserInfor = async (req, res) => {
  try {
    console.log('bodyyyyyyyyyyyyyyy: ' + req.body.accountID)
    let data = await UserService.getUserInfo(req.body.accountID)
    console.log('data: ' + data)
    if (!data) {
      return res.send(Response.dataNotFoundResponse(null, 'Lỗi hệ thống,không tìm thấy tài khoản'));
    }

    return res.send(Response.successResponse(data));

  } catch (error) {
    return res.send(Response.internalServerErrorResponse());
  }
}

var getUserCodeID = async (req, res) => {
  try {
    let data = await UserService.getUserCodeID(req.body.accountID)
    if (!data) throw createError.Conflict(`${data} không tìm thấy`)

    return res.send(Response.successResponse(data, 'thành công'));

  } catch (error) {
    return res.send(Response.internalServerErrorResponse(null, error.message));
  }
}


var refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body
    if (!refreshToken) throw createError.BadRequest()
    const { insertId } = await verifyRefreshToken(refreshToken)

    const accessToken = await signAccessToken(insertId)

    return res.send(Response.successResponse(accessToken, 'Thành công'));
  } catch (error) {
    return res.send(Response.internalServerErrorResponse(null, error.message));
  }
}

var registerGenealogy = async (req, res) => {
  try {
    const value = req.body;
    let codeID;
    let doesExist = true;

    let checkCreated = await UserService.checkCodeCreatedByID(req.body.accountID);  

    if (checkCreated > 0) {
      return res.send(Response.internalServerErrorResponse(null, 'Tài khoản này đã đăng ký gia phả. Không thể đăng ký tiếp'));
    }
    else {
      while (doesExist) {
        codeID = generateRandomNumber();
        doesExist = await UserService.checkCodeID(codeID);
      }
      let InsertHistory = await UserService.insertAccountFamily(req.body.accountID, codeID, 1);
      if(!InsertHistory){
        console.log("Lỗi Insert history")
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
    return res.send(Response.internalServerErrorResponse(null, error.message));
  }
}



var getGenealogy = async (req, res) => {
  try {
    const request = req.body;
    let doesExist = await UserService.checkID(request.accountID)
    if (doesExist) throw createError.Conflict(`đã đăng kí code gia phả`);
    let data = await UserService.insertAccountFamily(request.accountID, request.codeID, 3);
    return res.send(Response.successResponse(data, 'Thành công'));
  } catch (error) {
    return res.send(Response.internalServerErrorResponse(null, error.message));

  }
}

var setRole = async (req, res) => {
  try {

    const data = req.body;
    console.log(data)

    let doesExist = await UserService.checkAccountID(data.accountID);

    if (!doesExist) {
      return res.send(Response.internalServerErrorResponse(doesExist, 'Không tìm thấy'));
    }

    let dataUpdate = await UserService.updateRoleID(data)
    if (dataUpdate) {
      return res.send(Response.successResponse(null, 'Thay đổi vai trò thành công'));
    }
  } catch (error) {
    return res.send(Response.internalServerErrorResponse(error));
  }
}

var checkCodeID = async (req, res) => {
  try {
    let CodeID = req.body.codeID;
    let accountID = req.body.accountID;
    let doesExist = await UserService.checkCodeID(CodeID);
    console.log('CodeID: ' + CodeID)
    console.log('accountID: ' + accountID)
    console.log('doesExist: ' + doesExist)
    if (doesExist > 0) {
      let checkCodeIdCreator1 = await UserService.checkCodeIdCreator(accountID, CodeID, 1);
      let checkCodeIdCreator2 = await UserService.checkCodeIdCreator(accountID, CodeID, 2);
      let checkCodeIdCreator3 = await UserService.checkCodeIdCreator(accountID, CodeID, 3);
      console.log('checkCodeIdCreator: ' + checkCodeIdCreator1)
      if (checkCodeIdCreator1 > 0 || checkCodeIdCreator2 || checkCodeIdCreator3) {
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
    return res.send(Response.internalServerErrorResponse(null, error.message));
  }
};



function generateRandomNumber() {
  const randomNumber = Math.floor(100000 + Math.random() * 900000).toString();
  return randomNumber;
}

var forgetPassword = async (req, res) => {
  try {
    const email = req.body.email
    let checkEmail = await UserService.checkMail(email);

    if (checkEmail == 0) {
      return res.send(Response.dataNotFoundResponse(null, 'Email không tồn tại'));
    }
    else {
      const token = await signRePassToken(email)
      try {
        console.log(token)
        const data = await UserService.UpdateAccount(email, token)
        const resetPasswordLink = `http://localhost:3006/reset-password?token=${token}`;

        const objData = {
          to: email,
          subject: "For reset password",
          html: `<p> Hii, Please click the link to <a href="${resetPasswordLink}">reset your password</a></p>`
        };
        sendMail.SendEmailCore(objData)
        if (data == true) {
          return res.send(Response.successResponse(null, 'Vui lòng kiểm tra hộp thư đến trong gmail của bạn'));
        }
        return res.send(Response.internalServerErrorResponse(error, 'Lỗi hệ thống1'));
      } catch (error) {
        return res.send(Response.internalServerErrorResponse(error, 'Lỗi hệ thống2'));
      }
    }

  } catch (error) {
    return res.send(Response.internalServerErrorResponse(error, 'Lỗi hệ thống'));

  }
}

var resetPassword = async (req, res) => {
  try {
    const token = req.query.token;
    const payload = await verifyRepassToken(token)
    if (payload.error === 'Token expired') {
      return res.send(Response.internalServerErrorResponse(null, "Link đã hết hạn"));
    }

    const tokenData = UserService.checkToken(token);
    if (tokenData == 0) {
      return res.send(Response.internalServerErrorResponse(null, 'Link không đúng '));
    }

    if (req.body.password !== req.body.repassword) {
      return res.send(Response.dataNotFoundResponse(null, 'Nhập Lại Mật khẩu không trùng nhau'));
    }
    else {
      let hashedPassword = await bcrypt.hash(req.body.password, 10);
      let data = await UserService.UpdatePassword(hashedPassword, payload.email)
      if (data == true) {
        return res.send(Response.successResponse());
      } else {
        return res.send(Response.dataNotFoundResponse());
      }
    }
  } catch (error) {
    return res.send(Response.internalServerErrorResponse(error, 'Lỗi hệ thống'));

  }
}

module.exports = {
  registerUser, loginUser, refreshToken, registerGenealogy, getGenealogy, setRole,
  checkCodeID, getUserInfor, getUserCodeID, getHistoryCodeID, ChangePassword, getListRoleMember,
  forgetPassword, resetPassword, getMemberRole, changeUsername, getInformationTree

};