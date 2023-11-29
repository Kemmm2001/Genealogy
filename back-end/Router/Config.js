const express = require('express');
const PdfController = require('../Controller/FamilyGenealogy/pdfController')
const ExcelController = require('../Controller/EventGenealogy/excelController')
const JsonController = require('../Controller/Others/JsonController')
var router = express.Router();



const initWebRouter = (app) => {

    router.post('/export-pdf', PdfController.exportPDF);
    router.get('/export-excle', ExcelController.exportExcel);
    router.post('/back-up', JsonController.exportData)
    router.post('/import', JsonController.importData)

    //Tiền tố đứng trước route
    app.use('/api/v1', router);
}

module.exports = initWebRouter;