const express = require('express')
const UserController = require('../Controller/Authencation/UserController'); // Import controller
var router = express.Router()
const { verifyAccessToken } = require('../helper/jwt_helper')


const initWebRouter = (app) => {

  router.get('/protected-route', verifyAccessToken, (req, res) => {
    // Xử lý tuyến đường bảo vệ
    res.send('Protected route');
  });
  router.post('/register', UserController.registerUser);
  router.post('/login', UserController.loginUser);
  router.post('/refresh-token', UserController.refreshToken);
  // router.delete('/logout', UserController.logout);

  router.post('/register-genealogy', UserController.registerGenealogy)
  router.post('/get-genealogy', UserController.getGenealogy)
  
  //Tiền tố đứng trước route
  app.use('/api/v1', router);
}

module.exports = initWebRouter;