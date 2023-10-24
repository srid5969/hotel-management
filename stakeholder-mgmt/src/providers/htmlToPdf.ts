import pdf, {CreateOptions, FileInfo} from 'html-pdf';
//import puppeteer from 'puppeteer';
// const puppeteer = require('puppeteer');

export class HtmlToPdf {
  static createPdfAsync(
    source: string,
    options: CreateOptions,
    destination: string
  ): Promise<FileInfo> {
    return new Promise((resolve, reject) => {
      pdf.create(source).toFile(destination, (error: Error, res: FileInfo) => {
        if (error) {
          return reject(error);
        }
        return resolve(res);
      });
    });
  }

  // static async printPDF(source: string) {
  //   const browser = await puppeteer.launch({headless: true});
  //   const page = await browser.newPage();
  //   // Set HTML as page content
  //   await page.setContent(source, {waitUntil: 'domcontentloaded'});
  //   const pdf = await page.pdf({format: 'A4'});
  //   await browser.close();
  //   return pdf;
  // }
}
