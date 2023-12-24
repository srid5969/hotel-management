import * as sgMail from '@sendgrid/mail';
import * as ExcelJS from 'exceljs';
import {sendGridAPIkey} from './../config';

// Set your SendGrid API key
sgMail.setApiKey(sendGridAPIkey);

export async function sendEmailWithAttachment(data: {to: string}) {
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

    // Create a buffer to store the Excel file
    const buffer = await workbook.xlsx.writeBuffer();

    const attachment = {
      content: buffer.toString(),
      filename: 'sample.xlsx',
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      disposition: 'attachment',
    };

    const msg = {
      to: data.to, // recipient's email address
      from: 'youremail@example.com', // sender's email address
      subject: 'Excel file attached',
      text: 'Please find the attached Excel file.',
      attachments: [attachment],
    };

    // Send email
    await sgMail.send(msg);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error occurred while sending email:', error);
  }
}
