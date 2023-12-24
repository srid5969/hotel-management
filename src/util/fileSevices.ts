import * as ExcelJS from 'exceljs';
import PDFDocument from 'pdfkit';
interface DataObject {
  [key: string]: string;
}
export class FileBufferServices {
  public async generateBufferForExcelContent(
    data: DataObject[] | any
  ): Promise<Buffer> {
    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Sheet1');

      // Extracting keys from the first object in the array to use as column names
      const columns = Object.keys(data[0]);

      // Setting the first row as column headers
      worksheet.addRow(columns);

      // Adding data rows
      data.forEach((item: DataObject) => {
        const row: string[] = [];
        columns.forEach(column => {
          row.push(item[column]);
        });
        worksheet.addRow(row);
      });
      return (await workbook.xlsx.writeBuffer()) as Buffer;
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
