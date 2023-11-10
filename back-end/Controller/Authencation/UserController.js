const UserService = require('../../service/Authencation/UserManagement');
const createError = require('http-errors')
const { registerSchema, loginSchema } = require('../../helper/validation_schema')
const bcrypt = require('bcrypt');
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../../helper/jwt_helper')

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
    const value = req.body;
    let codeID;
    let doesExist = true;

    while (doesExist) {
      codeID = generateRandomNumber();
      doesExist = await UserService.checkCodeID(codeID);
    }

    let data1 = await UserService.insertIntoFamily(value, codeID);

    if (data1) {
      try {
        let data = await UserService.insertAccount(value.accountID, codeID);
        return res.json({ codeID });
      } catch (error) {
        // Xử lý khi `UserService.insertAccount` không thành công
        res.status(500).json({ error: 'Lỗi khi thực hiện insertAccount' });
      }
    } else {
      // Xử lý khi `data1` không thành công
      res.status(500).json({ error: 'Lỗi khi thực hiện insertIntoFamily' });
    }
  } catch (error) {
      res.status(500).json({ error: 'Lỗi nội bộ' });
  }
}



var getGenealogy = async (req, res) => {
  try {
    const request = req.body;
    let doesExist = await UserService.checkAccountID(request.accountID)
    if (doesExist) throw createError.Conflict(`Account đã có code gia phả`);
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

function generateRandomNumber() {
  // Tạo 9 chữ số ngẫu nhiên
  const randomNumber = Math.floor(100000000 + Math.random() * 900000000).toString();

  // Sử dụng slicing để chia thành các phần 3 chữ số và nối chúng với dấu "-"
  const formattedNumber = randomNumber.slice(0, 3) + '-' + randomNumber.slice(3, 6) + '-' + randomNumber.slice(6);

  return formattedNumber;
}

module.exports = {
  registerUser, loginUser, refreshToken, registerGenealogy, getGenealogy, setRole
};