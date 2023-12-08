const express = require('express')
const UserController = require('../Controller/Authencation/UserController'); // Import controller
var router = express.Router()
const { verifyAccessToken, verifyRepassToken } = require('../helper/jwt_helper')


const authMiddleware = require('../helper/author_helper')

const initWebRouter = (app) => {

  router.get('/protected-route', verifyAccessToken, (req, res) => {

    const accountID = req.payload.insertId;
    res.json({ accountID });
  });


  router.post('/register', UserController.registerUser);
  router.post('/login', UserController.loginUser);
  router.post('/refresh-token', UserController.refreshToken);
  // router.delete('/logout', UserController.logout);
  router.post('/forget-password', UserController.forgetPassword)
  router.post('/reset-password', UserController.resetPassword)
  router.post('/verify-account', UserController.verifyAccount)
  router.post('/setActive', UserController.setActive)

  router.post('/register-genealogy', UserController.registerGenealogy)
  router.post('/get-genealogy', UserController.getGenealogy)
  router.post('get-codeID', UserController.getUserCodeID)

  router.post('/set-role', UserController.setRole)
  router.post('/check-codeId', UserController.checkCodeID)
  router.get('/listrole', UserController.getListRoleMember)

  router.post('/memberRole', UserController.getMemberRole)
  router.post('/changeUsername', UserController.changeUsername)
  router.put('/changepassword', UserController.ChangePassword)
  router.get('/historyCodeID', UserController.getHistoryCodeID)
  router.post('/get-user', UserController.getUserInfor)
  router.get('/inforTree',UserController.getInformationTree)

  //api test
  router.get('/admin', authMiddleware.authenticateAndAuthorize(2), (req, res) => {
    // Xử lý yêu cầu
    res.json({ message: 'Admin route' });
  });

  //Tiền tố đứng trước route
  app.use('/api/v1', router);
}

module.exports = initWebRouter;