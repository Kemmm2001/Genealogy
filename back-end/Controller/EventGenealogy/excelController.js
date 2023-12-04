const EventManagementService = require('../../service/EventGenealogy/EventManagement');
const Excel = require('exceljs');
const Response = require('../../Utils/Response');

const exportExcel = async (req, res) => {
    try {
        let codeID = req.body.codeID
        let data = await EventManagementService.getAllEvent(codeID);
        if(data == true){
            const workbook = new Excel.Workbook();
            await addDataToSheet(workbook, 'Event Data', data);
    
            const fileName = `event.xlsx`;
            await workbook.xlsx.writeFile(fileName);
    
            return res.send(Response.successResponse(nul, 'Export thành công'));

        }
        return res.send(Response.internalServerErrorResponse)
       
    } catch (error) {
        return res.send(Response.internalServerErrorResponse)

    }
};

async function addDataToSheet(workbook, sheetName, data) {
    const worksheet = workbook.addWorksheet(sheetName);

    if (data.length > 0) {
        const headers = Object.keys(data[0]);
        worksheet.addRow(headers);

        data.forEach(row => {
            const rowValues = headers.map(header => row[header]);
            worksheet.addRow(rowValues);
        });
    }
}

module.exports = { exportExcel };