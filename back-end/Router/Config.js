const express = require('express');
const PdfController = require('../Controller/FamilyGenealogy/pdfController')
const ExcelController = require('../Controller/EventGenealogy/excelController')
const JsonController = require('../Controller/Others/JsonController')
var router = express.Router();



const initWebRouter = (app) => {

    router.post('/export-pdf', PdfController.exportPDF);
    router.get('/export-excle', ExcelController.exportExcel);
    //Tiền tố đứng trước route
    router.post('/export-json', JsonController.createJSONFile)
    router.post('/import-json', JsonController.importJsonFile);
    app.use('/api/v1', router);
}

module.exports = initWebRouter;