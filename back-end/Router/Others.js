const express = require('express');
const CountriesController = require('../Controller/Others/CountriesController');
var router = express.Router();



const initWebRouter = (app) => {

    router.get('/east-asia-countries', CountriesController.getAllEastAsiaCountries);
    //Tiền tố đứng trước route
    app.use('/api/v1', router);
}

module.exports = initWebRouter;