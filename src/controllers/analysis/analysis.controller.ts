import {Request, Response} from 'express';
import {read as readXlsx, utils as xlsxUtils} from 'xlsx';
import {InternalErrorResponse, SuccessResponse} from '../../util/apiResponse';
import {validateObj} from '../../util/commonService';
import {AppError} from './../../util/app-error';
import {organizeHotelDataV1} from './util/parser';
import {CoverAnalysisReportRepository} from '../../repositories/analysisRepository';

export class AnalysisReportController {
  private static coverAnalysisReportRepository =
    new CoverAnalysisReportRepository();
  public static async importCoverAnalysisReport(req: Request, res: Response) {
    try {
      const {username, userId, hotel, hotelId, date}: any = req.body;

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
      sheetData.pop();
      const noOfOT = sheetData.filter(t => t.A === 'Outlet Total').length;
      const extractedData = organizeHotelDataV1(sheetData, noOfOT);
      await AnalysisReportController.coverAnalysisReportRepository.bulkImportCoverAnalysis(
        extractedData,
        username,
        userId,
        hotel,
        hotelId,
        date
      );
      return new SuccessResponse(res, 'success', extractedData).send();
    } catch (error) {
      console.log(error);

      if (error instanceof AppError) return AppError.handle(error, res);
      return new InternalErrorResponse(res).send();
    }
  }
}
