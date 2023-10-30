const express = require('express')
const UserController = require('../Controller/Authencation/UserController'); // Import controller
var router = express.Router()


const initWebRouter = (app) => {

    router.post('/register', UserController.registerUser);
    // router.post('/login', UserController.loginUser);
    // router.post('/refresh-token', UserController.refresh);
    // router.delete('/logout', UserController.logout);

    //Tiền tố đứng trước route
    app.use('/auth', router);
}

module.exports = initWebRouter;