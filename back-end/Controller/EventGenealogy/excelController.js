const EventManagementService = require('../../service/EventGenealogy/EventManagement');
const Excel = require('exceljs');
const Response = require('../../Utils/Response');
const { v4: uuidv4 } = require('uuid');
const exportExcel = async (req, res) => {
    try {
        let codeID = req.body.codeID;
        let data;

        try {
            data = await EventManagementService.getAllEvent(codeID);
        } catch (error) {
            return res.send(Response.internalServerErrorResponse);
        }

        const workbook = new Excel.Workbook();
        await addDataToSheet(workbook, 'Event Data', data);

        const randomFileName = `/uploads/excel/ExportEvent/event_${uuidv4()}.xlsx`; 
        await workbook.xlsx.writeFile(randomFileName);

        return res.send(Response.successResponse(null, 'Export thành công'));
    } catch (error) {
        return res.send(Response.internalServerErrorResponse);
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