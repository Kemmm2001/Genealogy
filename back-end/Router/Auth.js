const express = require('express')
const UserController = require('../Controller/Authencation/UserController'); // Import controller
var router = express.Router()
const { verifyAccessToken, verifyRepassToken, verifyGenealogyToken } = require('../helper/jwt_helper')

const authMiddleware = require('../helper/author_helper');
const { verify } = require('crypto');
const CoreFunction = require('../Utils/CoreFunction');
const initWebRouter = (app) => {

  router.get('/protected-route', verifyAccessToken, (req, res) => {

    let accountID = req.payload.insertId;
    res.json({ accountID });
  });

  router.get('/getCodeID', verifyGenealogyToken, (req, res) => {

    let accountID = req.payload.insertId;
    let codeID = req.payload.codeId;
    res.json({ accountID, codeID });
  });


  router.post('/register', CoreFunction.isChecksumValid, UserController.registerUser);
  router.post('/login', CoreFunction.isChecksumValid, UserController.loginUser);
  router.post('/refresh-token', CoreFunction.isChecksumValid, UserController.refreshToken);
  // router.delete('/logout', UserController.logout);
  router.post('/forget-password', CoreFunction.isChecksumValid, UserController.forgetPassword)
  router.post('/reset-password', CoreFunction.isChecksumValid, UserController.resetPassword)
  router.post('/verify-account', CoreFunction.isChecksumValid, UserController.verifyAccount)
  router.post('/re_verify-account', CoreFunction.isChecksumValid, UserController.re_verifyAccount)
  router.post('/setActive', CoreFunction.isChecksumValid, UserController.setActive)

  router.post('/register-genealogy', CoreFunction.isChecksumValid, UserController.registerGenealogy)
  router.post('/get-genealogy', CoreFunction.isChecksumValid, UserController.getGenealogy)
  router.post('get-codeID', CoreFunction.isChecksumValid, UserController.getUserCodeID)

  router.post('/set-role', CoreFunction.isChecksumValid, UserController.setRole)
  router.post('/check-codeId', CoreFunction.isChecksumValid, verifyAccessToken, UserController.checkCodeID)
  router.get('/listrole', CoreFunction.isChecksumValid, UserController.getListRoleMember)
  router.post('/roleAccount', CoreFunction.isChecksumValid, UserController.getRoleAccount)
  router.get('/allRoleAccount', CoreFunction.isChecksumValid, UserController.getAllRoleAccount)

  router.post('/changeUsername', CoreFunction.isChecksumValid, UserController.changeUsername)
  router.put('/changepassword', CoreFunction.isChecksumValid, UserController.ChangePassword)
  router.get('/historyCodeID', CoreFunction.isChecksumValid, UserController.getHistoryCodeID)
  router.post('/get-user', CoreFunction.isChecksumValid, UserController.getUserInfor)
  router.get('/inforTree', CoreFunction.isChecksumValid, UserController.getInformationTree)

  //api test
  router.get('/admin', authMiddleware.authenticateAndAuthorize(2), (req, res) => {
    // Xử lý yêu cầu
    res.json({ message: 'Admin route' });
  });

  //Tiền tố đứng trước route
  app.use('/api/v1', router);
}

module.exports = initWebRouter;