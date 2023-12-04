const EventManagementService = require('../../service/EventGenealogy/EventManagement');
const Excel = require('exceljs');

const exportExcel = async (req, res) => {
    try {
        let CodeID = req.query.CodeID;
        if (!CodeID) {
            throw new Error('CodeID is missing or invalid.');
        }

        let data = await EventManagementService.getAllEvent(CodeID);

        const workbook = new Excel.Workbook();

        await addDataToSheet(workbook, 'Family Member Data', data);

        const fileName = 'event.xlsx';
        await workbook.xlsx.writeFile(fileName);

        return { success: true };
    } catch (error) {
        console.error('Error while processing data:', error.message);
        throw error;
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