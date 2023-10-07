const puppeteer = require('puppeteer');

async function exportPDF(req, res) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Điều hướng trình duyệt đến trang HTML hoặc URL bạn muốn xuất PDF
    const urlOrHtml = req.body.urlOrHtml; // Đây là ví dụ, bạn có thể truyền thông tin từ yêu cầu

    await page.goto(urlOrHtml);

    // Tạo file PDF từ trang HTML
    const pdfBuffer = await page.pdf({ format: 'A4' });

    // Đóng trình duyệt
    await browser.close();

    // Trả về file PDF cho client
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename=exported.pdf');
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Lỗi khi export PDF:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi export PDF' });
  }
}

module.exports = { exportPDF };
