const puppeteer = require('puppeteer');
const Response = require('../../Utils/Response')
const fs = require('fs'); 
const { v4: uuidv4 } = require('uuid'); 

async function exportPDF(req, res) {
  try {
    const { htmlContent } = req.body; // Lấy nội dung HTML từ req.body

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(htmlContent);

    const pdfBuffer = await page.pdf({ format: 'A4' });
    const fileName = `/uploads/pdf/export_${uuidv4()}.pdf`;

    fs.writeFile(fileName, pdfBuffer, (err) => {
      if (err) throw err;
      console.log('File PDF đã được lưu!');
      return res.send(Response.successResponse({ fileName: fileName }, 'Export thành công'));
    });

    await browser.close();
  } catch (error) {
    console.error('Lỗi khi tạo và lưu PDF:', error);
    return res.send(Response.internalServerErrorResponse());

  }
}

module.exports = { exportPDF };
