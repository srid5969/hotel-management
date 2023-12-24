import * as ExcelJS from 'exceljs';
import PDFDocument from 'pdfkit';

export class FileBufferServices {
  public async generateBufferForExcelContent(): Promise<Buffer | ArrayBuffer> {
    try {
      // Create an Excel workbook
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Sheet 1');
      worksheet.columns = [
        {header: 'ID', key: 'id', width: 10},
        {header: 'Name', key: 'name', width: 20},
        {header: 'Email', key: 'email', width: 30},
      ];

      // Add sample data to the worksheet
      worksheet.addRow({id: 1, name: 'John Doe', email: 'john@example.com'});
      worksheet.addRow({id: 2, name: 'Jane Smith', email: 'jane@example.com'});

      // Return the Excel buffer
      const excelBuffer = await workbook.xlsx.writeBuffer();
      return excelBuffer;
    } catch (error) {
      throw new Error('Error generating Excel buffer: ' + error.message);
    }
  }

  public async generateBufferForPDFContent(): Promise<Buffer> {
    try {
      // Create a PDF document
      const pdfDoc = new PDFDocument();

      // Customize PDF content with a template
      pdfDoc.fontSize(16).text('Invoice', {align: 'center'}).moveDown();

      // Example template content (replace this with your own template)
      pdfDoc
        .fontSize(12)
        .text('This is a sample invoice:', {underline: true})
        .moveDown();
      pdfDoc.text('Item 1: $50').moveDown();
      pdfDoc.text('Item 2: $75').moveDown();
      pdfDoc.text('Total: $125').moveDown();

      // End the PDF creation
      pdfDoc.end();

      // Create a buffer for PDF
      const pdfBuffer: Buffer[] = [];
      pdfDoc.on('data', (chunk: Buffer) => {
        pdfBuffer.push(chunk);
      });

      return Buffer.concat(pdfBuffer);
    } catch (error) {
      throw new Error('Error generating PDF buffer: ' + error.message);
    }
  }

  // If you want to implement CSV generation as well:
  public async generateBufferForCSVContent(): Promise<Buffer> {
    try {
      // Implement CSV generation logic here
      // Return the CSV buffer
      const csvBuffer = Buffer.from('Sample CSV Data');
      return csvBuffer;
    } catch (error) {
      throw new Error('Error generating CSV buffer: ' + error.message);
    }
  }
}
