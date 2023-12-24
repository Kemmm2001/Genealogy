const express = require('express');
const PdfController = require('../Controller/FamilyGenealogy/pdfController')
const ExcelController = require('../Controller/EventGenealogy/excelController')
const JsonController = require('../Controller/Others/JsonController')
const CoreFunction = require('../Utils/CoreFunction');
const authMiddleware = require('../helper/author_helper')

var router = express.Router();



const initWebRouter = (app) => {

    router.post('/export-pdf', authMiddleware.authenticateAndAuthorize(2), PdfController.exportPDF);
    router.post('/export-excel', authMiddleware.authenticateAndAuthorize(2), ExcelController.exportExcel);

    router.post('/back-up', authMiddleware.authenticateAndAuthorize(1),JsonController.exportData)
    router.post('/clear-tree',authMiddleware.authenticateAndAuthorize(1), JsonController.clearTree)
    router.post('/import',authMiddleware.authenticateAndAuthorize(1), CoreFunction.uploadExcelFile('file').single('xlsx'), JsonController.importData)


    //Tiền tố đứng trước route
    app.use('/api/v1', router);
}

module.exports = initWebRouter;