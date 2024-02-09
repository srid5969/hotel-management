import {Request, Response} from 'express';
import {read as readXlsx, utils as xlsxUtils} from 'xlsx';
import {InternalErrorResponse, SuccessResponse} from '../../util/apiResponse';
import {AppError} from './../../util/app-error';
import {takeOneSession, validateObj} from '../../util/commonService';

export class AnalysisReportController {
  public static async importCoverAnalysisReport(req: Request, res: Response) {
    try {
      const buffer = req.file.buffer;
      const workbook = readXlsx(buffer, {type: 'buffer'});
      const sheetName = workbook.SheetNames[0];

      let sheetData: any[] = xlsxUtils.sheet_to_json(
        workbook.Sheets[sheetName],
        {
          header: 'A',
        }
      );
      const regex = /^_+$/;

      sheetData = sheetData.filter(data => !regex.test(data.A.toString()));
      validateObj(
        [
          'Outlet',
          '<-------------Food------------>',
          '<------------Liquor----------->',
          '<---------Soft Drinks--------->',
          '<-----------Tobacco----------->',
          '<-----------Others------------>',
          '<-------------Total------------->',
        ],
        sheetData[0]
      );
      sheetData.shift();
      validateObj(
        [
          'Session',
          'Cov.',
          'Amount',
          'Avg.',
          'Cov.',
          'Amount',
          'Avg.',
          'Cov.',
          'Amount',
          'Avg.',
          'Cov.',
          'Amount',
          'Avg.',
          'Cov.',
          'Amount',
          'Avg.',
          'Cov.',
          'Amount',
          'Avg.',
        ],
        sheetData[0]
      );
      sheetData.shift();
      const noOfOT = sheetData.filter(t => t.A === 'Outlet Total').length;
      const extractedData: any[] = [];
      for (let i = 0; i < noOfOT; i++) {
        extractedData.push(takeOneSession(sheetData));
        // takeOneSession(sheetData[0].A, 'Outlet Total', sheetData);
      }
      return new SuccessResponse(res, 'success', sheetData).send();
    } catch (error) {
      if (error instanceof AppError) return AppError.handle(error, res);
      return new InternalErrorResponse(res).send();
    }
  }
}
