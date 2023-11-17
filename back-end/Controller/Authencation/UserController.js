const UserService = require('../../service/Authencation/UserManagement');
const createError = require('http-errors')
const { registerSchema, loginSchema } = require('../../helper/validation_schema')
const bcrypt = require('bcrypt');
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../../helper/jwt_helper')
const Response = require('../../Utils/Response')

var registerUser = async (req, res) => {
  try {
    console.log("vào đây")
    const result = await registerSchema.validateAsync(req.body);

    if (result.password !== result.repassword) {
      return res.send(Response.successResponse(null, 'Mật khẩu không trùng nhau'));
    }

    let doesExist = await UserService.checkMail(result.email);

    if (doesExist) throw createError.Conflict(`${result.email} đã được đăng kí`);

    const hashedPassword = await bcrypt.hash(result.password, 10);
    console.log(result)
    let newUser = await UserService.create(result.username, result.email, hashedPassword);
    // let data = await UserService.insertInAccountFamily(newUser.insertId)
    return res.send(Response.successResponse(newUser, 'Đăng ký thành công'));
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

    console.log(req.body)
    let user = await UserService.checkMail(result.email);
    let data = await UserService.getUser(result.email)
    if (!user) {

      return res.send(Response.dataNotFoundResponse(result.email, 'Email không tồn tại'));
    }

    const isPasswordMatch = await bcrypt.compare(result.password, data.password);

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
    let data = await UserService.getUserInfo(req.body.accountID)
    if (!data) throw createError.Conflict(`${data} không tìm thấy`)

    return res.send({ data })

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
    let codeID;
    let doesExist = true;

    while (doesExist) {
      codeID = generateRandomNumber();
      doesExist = await UserService.checkCodeID(codeID);
    }

    let data1 = await UserService.insertIntoFamily(value, codeID);

    if (data1) {
      try {
        let data = await UserService.insertAccountFamily(value.accountID, codeID, 1);
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
    let doesExist = await UserService.checkCodeID(req.body.codeID);
    return res.json({ doesExist }); // Trả về true hoặc false trong đối tượng doesExist
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};



function generateRandomNumber() {
  const randomNumber = Math.floor(100000 + Math.random() * 900000).toString();
  return randomNumber;
}

module.exports = {
  registerUser, loginUser, refreshToken, registerGenealogy, getGenealogy, setRole, checkCodeID, getUserInfor, getUserCodeID
};