const UserService = require('../../service/Authencation/UserManagement');
const createError = require('http-errors')
const {authSchema } = require('../../helper/validation_schema')

async function registerUser(req, res, next) {
  try {
    // Xử lý yêu cầu đăng ký ở đây
    
    const result = await authSchema.validateAsync(req.body)
    
     const doesExist =  await UserService.checkMail(result.username);
     if(doesExist) throw createError.Conflict(`${result.username} đã được đăng kí`)

    const newUser = UserService.create(result.username, result.password);

    res.send(newUser);
  } catch (error) {
    if(error.isJoi === true) error.status = 422
    next(error)
  }
}

module.exports = {
  registerUser
};