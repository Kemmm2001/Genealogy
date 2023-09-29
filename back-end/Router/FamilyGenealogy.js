const express = require('express');
const ManagerFamilyTree = require('../Controller/FamilyGenealogy/FamilyTree')
var router = express.Router();



const initWebRouter = (app) => {
    //API Hùng
    router.get('/', ManagerFamilyTree.AllReligion)
    router.get('/InforMember', ManagerFamilyTree.informationMember)

    //API tuấn

    //API Nhật anh

    //Tiền tố đứng trước route
    app.use('/api/v1', router);
}

module.exports = initWebRouter;