const UserService = require('../../service/Authencation/UserManagement');
const createError = require('http-errors')
const { registerSchema, loginSchema } = require('../../helper/validation_schema')
const bcrypt = require('bcrypt');
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../../helper/jwt_helper')
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());


var registerUser = async (req, res) => {
  try {
    // Xử lý yêu cầu đăng ký ở đây
    const result = await registerSchema.validateAsync(req.body);

    if (result.password !== result.repassword) {
      throw new Error("Mật khẩu nhập lại không khớp với mật khẩu");
    }

    let doesExist = await UserService.checkMail(result.email);

    if (doesExist) throw createError.Conflict(`${result.email} đã được đăng kí`);

    const hashedPassword = await bcrypt.hash(result.password, 10);
    let newUser = await UserService.create(result.username, result.email, hashedPassword);

    return res.json({ newUser });
  } catch (error) {
    if (error.isJoi === true) {
      error.status = 422;
    }
    res.status(error.status || 500).json({ error: error.message });
  }
}


var loginUser = async (req, res) => {
  try {
    const result = await loginSchema.validateAsync(req.body)

    let user = await UserService.checkMail(result.email);
    let data = await UserService.getUser(result.email)
    if (!user) throw createError.Conflict(`${result.email} không tìm thấy`)
    
    const isPasswordMatch = await bcrypt.compare(result.password, data.password);

    if (!isPasswordMatch) {
      throw createError.Unauthorized('Mật khẩu không khớp');
    }
    const accessToken = await signAccessToken(data.accountID)
    console.log(accessToken)
    const refreshToken = await signRefreshToken(data.accountID)
    console.log(refreshToken)

    res.cookie('accessToken', accessToken, {
      httpOnly: true, // Không thể truy cập bằng JavaScript trong trình duyệt
      secure: true, // Chỉ hoạt động trên kết nối HTTPS (sử dụng khi triển khai thật)
      maxAge: 3600000, // 1 giờ
    });

    return res.send({accessToken, refreshToken})
    
  } catch (error) {
    if (error.isJoi === true) {
      error.status = 422;
    }
    res.status(error.status || 500).json({ error: error.message });
  }
}

var refreshToken = async(req, res) => {
  try {
    const {refreshToken} = req.body
    if (!refreshToken) throw createError.BadRequest()
    const {insertId} = await verifyRefreshToken(refreshToken)

    const accessToken = await signAccessToken(insertId)

    res.send({accessToken: accessToken})
  } catch (error) {
    
  }
}

var registerGenealogy = async (req, res) => {
  try {
    const accountID = req.body;
    let codeID;
    let doesExist = true;

    while (doesExist) {
      codeID = generateRandomString(); // Gọi generateRandomString() để tạo mã ngẫu nhiên mới
      doesExist = await UserService.checkCodeID(codeID);
    }

    let data = await UserService.createGenealogy(accountID, codeID);

    return res.json({ data });
  } catch (error) {
    if (error.isJoi === true) {
      error.status = 422;
    }
    res.status(error.status || 500).json({ error: error.message });
  }
}


var getGenealogy = async (req, res) => {
  try {
    const request = req.body;
    let data = await UserService.createGenealogy(request);
    return res.json({ data })
  } catch (error) {
    if (error.isJoi === true) {
      error.status = 422;
    }
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

function generateRandomString() {
  const randomNumbers = Array.from({ length: 12 }, () => Math.floor(Math.random() * 10));

  // Định dạng chuỗi bằng cách cắt thành các phần và nối chúng bằng dấu "-"
  const formattedString = `${randomNumbers.slice(0, 3).join('')}-${randomNumbers.slice(3, 6).join('')}-${randomNumbers.slice(6, 9).join('')}`;

  return formattedString;
}

module.exports = {
  registerUser, loginUser, refreshToken, registerGenealogy, getGenealogy, setRole
};