const UserService = require('../../service/Authencation/UserManagement');
const createError = require('http-errors')
const validator = require('validator');
const bcrypt = require('bcrypt');
const { signAccessToken, signRefreshToken, signRePassToken, signRegisterToken, signGenealogyToken, verifyRegisterToken, verifyRepassToken, verifyRefreshToken } = require('../../helper/jwt_helper')
const sendMail = require('../../Utils/SystemOperation');
require('dotenv').config();
const backEndURL = process.env.BACKEND_URL
const frontEndURL = process.env.FRONTEND_URL
const secureKey = process.env.KEY_SECRET
const Response = require('../../Utils/Response');
const CryptoJS = require('crypto-js')

var registerUser = async (req, res) => {
  try {

    if (!req.body.email || !req.body.password || !req.body.username || !req.body.repassword) {
      return res.send(Response.internalServerErrorResponse(null, 'Vui lòng điền đầy đủ thông tin'));
    }

    if (!validator.isEmail(req.body.email)) {
      return res.send(Response.internalServerErrorResponse(null, 'Email không hợp lệ'));
    }

    const decryptedBytes = CryptoJS.AES.decrypt(req.body.password, process.env.AES256_SECRET, {
      iv: process.env.AES256_IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    const decryptedBytes1 = CryptoJS.AES.decrypt(req.body.repassword, process.env.AES256_SECRET, {
      iv: process.env.AES256_IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    // Chuyển đổi dữ liệu giải mã thành chuỗi
    var password = decryptedBytes.toString(CryptoJS.enc.Utf8);
    var repassword = decryptedBytes1.toString(CryptoJS.enc.Utf8);

    console.log(password)

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])[a-zA-Z\d!@#$%^&*()\-_=+{};:,<.>]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.send(Response.internalServerErrorResponse(null, 'Mật khẩu phải có ít nhất 8 kí tự bao gồm ít nhất: 1 chữ cái viết hoa, 1 chữ cái thường, 1 chữ số và 1 kí tự đặc biệt'));
    }
    if (password !== repassword) {
      return res.send(Response.internalServerErrorResponse(null, 'Nhập Lại Mật khẩu không trùng nhau'));
    }
    let doesExist = await UserService.checkMail(req.body.email);
    if (doesExist > 0) {
      return res.send(Response.dataNotFoundResponse(null, `${req.body.email} đã được đăng kí`));
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    let newUser = await UserService.create(req.body.username, req.body.email, hashedPassword);
    return res.send(Response.successResponse(newUser, 'Đăng ký thành công vui lòng xác thực tài khoản'));

  } catch (error) {
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
var getAllRoleAccount = async (req, res) => {
  try {
    let data = await UserService.getAllRoleAccount();
    if (data) {
      res.send(Response.successResponse(data))
    } else {
      res.send(Response.dataNotFoundResponse())
    }
  } catch (error) {
    res.send(Response.internalServerErrorResponse())
  }
}
//Nguyễn Lê Hùng
var getRoleAccount = async (req, res) => {
  try {
    let accountID = req.body.accountID;
    let codeID = req.body.codeID;
    let data = await UserService.getRoleAccount(accountID, codeID)
    if (data) {
      return res.send(Response.successResponse(data))
    } else {
      return res.send(Response.dataNotFoundResponse())
    }
  } catch (error) {
    return res.send(Response.internalServerErrorResponse())
  }
}
//Nguyễn Lê Hùng
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
//Nguyễn Lê Hùng
var getHistoryCodeID = async (req, res) => {
  try {
    let accountID = req.query.accountID;
    console.log('accountID:::::::::::' + accountID)
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
//Nguyễn Lê Hùng
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
//Nguyễn Lê Hùng
var ChangePassword = async (req, res) => {
  try {
    console.log('req.body: ' + req.body.accountID)
    console
    let dataAccount = await UserService.getAccount(req.body.accountID);
    console.log('data: ' + dataAccount.Password)

    if (dataAccount) {
      if (!req.body.currentPassword || !req.body.newPassword || !req.body.Re_newPassword) {
        return res.send(Response.internalServerErrorResponse(null, 'Vui lòng điền đầy đủ thông tin'));
      }
      const decryptedBytesCurrentPassword = CryptoJS.AES.decrypt(req.body.currentPassword, process.env.AES256_SECRET, {
        iv: process.env.AES256_IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      const decryptedBytesNewpassword = CryptoJS.AES.decrypt(req.body.newPassword, process.env.AES256_SECRET, {
        iv: process.env.AES256_IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      const decryptedBytes1Re_Newpassword = CryptoJS.AES.decrypt(req.body.Re_newPassword, process.env.AES256_SECRET, {
        iv: process.env.AES256_IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      // Chuyển đổi dữ liệu giải mã thành chuỗi      
      var inputCurrentPassword = decryptedBytesCurrentPassword.toString(CryptoJS.enc.Utf8)
      console.log('inputCurrentPassword: ' + inputCurrentPassword)
      console.log('password: ' + dataAccount.Password)
      let isPasswordMatch = await bcrypt.compare(inputCurrentPassword, dataAccount.Password);

      if (!isPasswordMatch) {
        return res.send(Response.dataNotFoundResponse(null, 'Mật khẩu hiện tại không đúng'))
      }
      var newPassword = decryptedBytesNewpassword.toString(CryptoJS.enc.Utf8);
      var Re_newPassword = decryptedBytes1Re_Newpassword.toString(CryptoJS.enc.Utf8);

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])[a-zA-Z\d!@#$%^&*()\-_=+{};:,<.>]{8,}$/;
      if (!passwordRegex.test(newPassword)) {
        return res.send(Response.internalServerErrorResponse(null, 'Mật khẩu phải có ít nhất 8 kí tự bao gồm ít nhất: 1 chữ cái viết hoa, 1 chữ cái thường, 1 chữ số và 1 kí tự đặc biệt'));

      }
      if (newPassword !== Re_newPassword) {
        return res.send(Response.dataNotFoundResponse(null, 'Nhập Lại Mật khẩu không trùng nhau'));
      }
      console.log("đã đến đây")
      let hashedPassword = await bcrypt.hash(newPassword, 10);
      console.log('hashedPassword: ' + hashedPassword)
      let data = await UserService.ChangePassword(hashedPassword, req.body.accountID)
      if (data == true) {
        return res.send(Response.successResponse(null, 'Thay đổi mật khẩu thành công'));
      } else {
        console.log("vào else này")
        return res.send(Response.dataNotFoundResponse());
      }
    } else {
      console.log("vào else")
      return res.send(Response.dataNotFoundResponse());
    }
  } catch (error) {
    return res.send(Response.dataNotFoundResponse(error));
  }
}


var loginUser = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.send(Response.internalServerErrorResponse(null, 'Vui lòng nhập email và mật khẩu'));
    }

    if (!validator.isEmail(req.body.email)) {
      return res.send(Response.internalServerErrorResponse(null, 'Email không hợp lệ'));
    }

    let checkEmail = await UserService.checkMail(req.body.email);
    let data = await UserService.getUser(req.body.email)

    if (checkEmail == 0) {
      return res.send(Response.dataNotFoundResponse(null, 'Email không tồn tại'));
    }
    if (data.isActive == 0) {
      return res.send(Response.badRequestResponse(null, 'Tài khoản chưa được kích hoạt'));
    }

    const decryptedBytes = CryptoJS.AES.decrypt(req.body.password, process.env.AES256_SECRET, {
      iv: process.env.AES256_IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    // Chuyển đổi dữ liệu giải mã thành chuỗi
    var password = decryptedBytes.toString(CryptoJS.enc.Utf8);

    let isPasswordMatch = await bcrypt.compare(password, data.password);

    if (!isPasswordMatch) {
      return res.send(Response.dataNotFoundResponse(null, 'Mật khẩu không đúng'));
    }
    let accessToken = await signAccessToken(data.accountID)
    // let refreshToken = await signRefreshToken(data.accountID)
    console.log(refreshToken)
    return res.send(Response.successResponse(accessToken, 'Login thành công'));

  } catch (error) {
    return res.send(Response.internalServerErrorResponse(null, error.message));
  }
}

var getUserInfor = async (req, res) => {
  try {
    console.log('body: ' + req.body.accountID)
    let data = await UserService.getUserInfo(req.body.accountID, req.body.CodeID)

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
      let data1 = await UserService.insertIntoFamily(value, codeID);
      if (data1) {
        try {
          await UserService.insertAccountFamily(value.accountID, codeID, 1);
          let InsertHistory = await UserService.insertAccountFamily(req.body.accountID, codeID, 1);
          if (!InsertHistory) {
            console.log("Lỗi Insert history")
          }
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

    let data = req.body;
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

      // Tạo token
      let genealogyToken = await signGenealogyToken(accountID, CodeID)

      if (checkCodeIdCreator1 > 0 || checkCodeIdCreator2 > 0 || checkCodeIdCreator3 > 0) {
        let updateAccesstime = await UserService.updateDateLoginGenealogy(accountID, CodeID);
        if (!updateAccesstime) {
          return res.send(Response.internalServerErrorResponse())
        }
        return res.send(Response.successResponse(genealogyToken, "đã tạo Token"))
      }
      else {
        await UserService.insertAccountFamily(accountID, CodeID, 3);
        return res.send(Response.successResponse(genealogyToken, "Da tao Token"))
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
    if (!email) {
      return res.send(Response.internalServerErrorResponse(null, 'Vui lòng nhập email'));
    }

    if (!validator.isEmail(email)) {
      return res.send(Response.internalServerErrorResponse(null, 'Email không hợp lệ'));
    }
    let checkEmail = await UserService.checkMail(email);

    if (checkEmail == 0) {
      return res.send(Response.dataNotFoundResponse(null, 'Email không tồn tại'));
    }
    else {
      const token = await signRePassToken(email)
      try {
        console.log(token)
        let data = await UserService.UpdateAccount(email, token)
        const resetPasswordLink = `${frontEndURL}/reset-password?token=${token}`;

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
    if (!req.body.password || !req.body.repassword) {
      return res.send(Response.internalServerErrorResponse(null, 'Vui lòng điền đầy đủ thông tin'));
    }
    console.log(req.body.password)
    const decryptedBytes = CryptoJS.AES.decrypt(req.body.password, process.env.AES256_SECRET, {
      iv: process.env.AES256_IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    const decryptedBytes1 = CryptoJS.AES.decrypt(req.body.repassword, process.env.AES256_SECRET, {
      iv: process.env.AES256_IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    // Chuyển đổi dữ liệu giải mã thành chuỗi
    var password = decryptedBytes.toString(CryptoJS.enc.Utf8);
    var repassword = decryptedBytes1.toString(CryptoJS.enc.Utf8);

    console.log(password)

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])[a-zA-Z\d!@#$%^&*()\-_=+{};:,<.>]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.send(Response.internalServerErrorResponse(null, 'Mật khẩu phải có ít nhất 8 kí tự bao gồm ít nhất: 1 chữ cái viết hoa, 1 chữ cái thường, 1 chữ số và 1 kí tự đặc biệt'));

    }
    if (password !== repassword) {
      return res.send(Response.dataNotFoundResponse(null, 'Nhập Lại Mật khẩu không trùng nhau'));
    }

    console.log(req.body.password)
    let hashedPassword = await bcrypt.hash(password, 10);
    let data;
    try {
      data = await UserService.UpdatePassword(hashedPassword, payload.email);
      if (data == true) {
        try {
          console.log(hashedPassword)
          let data1 = await UserService.DeleteRePasssToken(payload.email);
          if (data1 == true) {

            return res.send(Response.successResponse());
          }
          return res.send(Response.internalServerErrorResponse(null, 'Lỗi hệ thống'));
        } catch (error) {
          return res.send(Response.internalServerErrorResponse(null, 'Lỗi khi cập nhật token'));
        }
      } else {
        return res.send(Response.internalServerErrorResponse(null, 'Lỗi khi cập nhật mật khẩu'));
      }
    } catch (error) {
      return res.send(Response.badRequestResponse(null, 'Lỗi khi cập nhật mật khẩu'));
    }

  } catch (error) {
    return res.send(Response.internalServerErrorResponse(null, 'Lỗi hệ thống'));
  }
}

var re_verifyAccount = async (req, res) => {
  try {
    let email
    const token = req.body.token;
    const payload = await verifyRegisterToken(token)
    if (payload) {
      email = payload.email
    }
    console.log('email: ' + email)
    if (!email) {
      return res.send(Response.internalServerErrorResponse(null, 'Vui lòng nhập email'));
    }

    if (!validator.isEmail(email)) {
      return res.send(Response.internalServerErrorResponse(null, 'Email không hợp lệ'));
    }
    let checkEmail = await UserService.checkMail(email);

    if (checkEmail == 0) {
      return res.send(Response.dataNotFoundResponse(null, 'Email không tồn tại'));
    }
    else {
      const token = await signRegisterToken(email)
      try {
        console.log(token)
        let data = await UserService.UpdateRegisterToken(email, token)
        const verifyLink = `${frontEndURL}/verify?token=${token}`;

        const objData = {
          to: email,
          subject: "For verify account",
          html: `<p> Hii, Please click the link to <a href="${verifyLink}">verify account</a></p>`
        };
        sendMail.SendEmailCore(objData)
        if (data == true) {
          return res.send(Response.successResponse(null, 'Vui lòng kiểm tra hộp thư đến trong gmail của bạn'));
        }
        return res.send(Response.internalServerErrorResponse(error, 'Lỗi hệ thống'));
      } catch (error) {
        return res.send(Response.internalServerErrorResponse(error, 'Lỗi hệ thống'));
      }
    }

  } catch (error) {
    return res.send(Response.internalServerErrorResponse(error, 'Lỗi hệ thống'));

  }
}

var verifyAccount = async (req, res) => {
  try {
    const email = req.body.email
    if (!email) {
      return res.send(Response.internalServerErrorResponse(null, 'Vui lòng nhập email'));
    }

    if (!validator.isEmail(email)) {
      return res.send(Response.internalServerErrorResponse(null, 'Email không hợp lệ'));
    }
    let checkEmail = await UserService.checkMail(email);

    if (checkEmail == 0) {
      return res.send(Response.dataNotFoundResponse(null, 'Email không tồn tại'));
    }
    else {
      const token = await signRegisterToken(email)
      try {
        console.log(token)
        let data = await UserService.UpdateRegisterToken(email, token)
        const verifyLink = `${frontEndURL}/verify?token=${token}`;

        const objData = {
          to: email,
          subject: "For verify account",
          html: `<p> Hii, Please click the link to <a href="${verifyLink}">verify account</a></p>`
        };
        sendMail.SendEmailCore(objData)
        if (data == true) {
          return res.send(Response.successResponse(null, 'Vui lòng kiểm tra hộp thư đến trong gmail của bạn'));
        }
        return res.send(Response.internalServerErrorResponse(error, 'Lỗi hệ thống'));
      } catch (error) {
        return res.send(Response.internalServerErrorResponse(error, 'Lỗi hệ thống'));
      }
    }

  } catch (error) {
    return res.send(Response.internalServerErrorResponse(error, 'Lỗi hệ thống'));

  }
}

var setActive = async (req, res) => {
  try {
    const token = req.body.token;
    const payload = await verifyRegisterToken(token)
    console.log('payload: ' + payload.email)
    if (payload.error === 'Token expired') {
      return res.send(Response.internalServerErrorResponse(null, "Link đã hết hạn"));
    }

    const tokenData = UserService.checkRegisterToken(token);
    if (tokenData == 0) {
      return res.send(Response.internalServerErrorResponse(null, 'Link không đúng'));
    }

    let data;
    try {
      data = await UserService.UpdateActive(1, payload.email);
      console.log('data: ' + data)
      if (data == true) {
        try {
          let data1 = await UserService.DeleteRegisterToken(payload.email);
          if (data1 == true) {
            return res.send(Response.successResponse());
          }
          return res.send(Response.internalServerErrorResponse(null, 'Lỗi hệ thống'));
        } catch (error) {
          return res.send(Response.internalServerErrorResponse(null, 'Lỗi khi cập nhật token'));
        }
      } else {
        return res.send(Response.internalServerErrorResponse());
      }
    } catch (error) {
      return res.send(Response.internalServerErrorResponse(null, 'Lỗi khi cập nhật trạng thái kích hoạt'));
    }
  } catch (error) {
    return res.send(Response.internalServerErrorResponse(null, 'Lỗi hệ thống'));
  }
}


module.exports = {
  registerUser, loginUser, refreshToken, registerGenealogy, getGenealogy, setRole,
  checkCodeID, getUserInfor, getUserCodeID, getHistoryCodeID, ChangePassword, getListRoleMember,
  forgetPassword, resetPassword, changeUsername, getInformationTree, verifyAccount, setActive, getRoleAccount, getAllRoleAccount, re_verifyAccount

};