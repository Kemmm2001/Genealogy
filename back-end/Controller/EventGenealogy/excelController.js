const EventManagementService = require('../../service/EventGenealogy/EventManagement');
const Excel = require('exceljs');

const exportExcel = async (req, res) => {
    try {
       
        let data = await EventManagementService.getAllEvent(req.body.CodeID);
        console.log(data)
        const workbook = new Excel.Workbook();
        await addDataToSheet(workbook, 'Event Data', data);

        const fileName = 'event.xlsx';
        await workbook.xlsx.writeFile(fileName);

        return res.send({sucess: true})
    } catch (error) {
        return res.send({sucess: false})
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