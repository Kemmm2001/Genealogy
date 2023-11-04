const UserService = require('../../service/Authencation/UserManagement');
const createError = require('http-errors')
const { authSchema } = require('../../helper/validation_schema')
const bcrypt = require('bcrypt');
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../../helper/jwt_helper')

var registerUser = async (req, res) => {
  try {
    // Xử lý yêu cầu đăng ký ở đây
    const result = await authSchema.validateAsync(req.body)
    let doesExist = await UserService.checkMail(result.email);
    if (doesExist) throw createError.Conflict(`${result.email} đã được đăng kí`)
    const hashedPassword = await bcrypt.hash(result.password, 10);
    let newUser = await UserService.create(result.username, result.email, hashedPassword);
  

    return res.json({ newUser })
  } catch (error) {
    if (error.isJoi === true) {
      error.status = 422;
    }
    res.status(error.status || 500).json({ error: error.message });

  }
}

var loginUser = async (req, res) => {
  try {
    const result = await authSchema.validateAsync(req.body)

    let user = await UserService.checkMail(result.email);
    let data = await UserService.getUser(result.email)
    if (!user) throw createError.Conflict(`${result.email} không tìm thấy`)
    
    const isPasswordMatch = await bcrypt.compare(result.password, data.password);

    if (!isPasswordMatch) {
      throw createError.Unauthorized('Mật khẩu không khớp');
    }
    const accessToken = await signAccessToken(data.accountID)
    const refreshToken = await signRefreshToken(data.accountID)
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
    const accountID = req.body
    const codeID = generateRandomString ;
    let data = await UserService.createGenealogy(accountID, codeID);
  

    return res.json({ data })
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

function  generateRandomString() {
  const randomNumbers = Array.from({ length: 12 }, () => Math.floor(Math.random() * 10));

  // Định dạng chuỗi bằng cách cắt thành các phần và nối chúng bằng dấu "-"
  const formattedString = `${randomNumbers.slice(0, 3).join('')}-${randomNumbers.slice(3, 6).join('')}-${randomNumbers.slice(6, 9).join('')}`;

  return formattedString;
}

module.exports = {
  registerUser, loginUser, refreshToken, registerGenealogy, getGenealogy
};