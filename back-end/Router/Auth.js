const express = require('express')
const UserController = require('../Controller/Authencation/UserController'); // Import controller
var router = express.Router()
const { verifyAccessToken } = require('../helper/jwt_helper')


const initWebRouter = (app) => {

  router.get('/protected-route', verifyAccessToken, (req, res) => {
    
    const accountID = req.payload.insertId;
    res.json({ accountID });
  });


  router.post('/register', UserController.registerUser);
  router.post('/login', UserController.loginUser);
  router.post('/refresh-token', UserController.refreshToken);
  // router.delete('/logout', UserController.logout);

  router.post('/register-genealogy', UserController.registerGenealogy)
  router.post('/get-genealogy', UserController.getGenealogy)
  
  router.post('/set-role', UserController.setRole)
  router.post('/check-codeId', UserController.checkCodeID)
  //Tiền tố đứng trước route
  app.use('/api/v1', router);
}

module.exports = initWebRouter;