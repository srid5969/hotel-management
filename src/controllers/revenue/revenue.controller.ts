import {Request, Response} from 'express';
import {read as readXlsx, utils as xlsxUtils} from 'xlsx';
import {SuccessResponse} from '../../util/apiResponse';
import {AppError} from '../../util/app-error';
import {RevenueRepository} from '../../repositories/revenueRepository';
import {getValueOrGetDefaultValue} from '../../util/commonService';
export class RevenueController {
  static revenueRepository = new RevenueRepository();
  public static async importHistoryAndForecastOfHotel(
    req: Request,
    res: Response
  ) {
    try {
      const buffer = req.file.buffer;
      const workbook = readXlsx(buffer, {type: 'buffer'});
      const sheetName = workbook.SheetNames[0];
      type RevenueImportObject = {
        Date: string;
        'FIT Rnt': number;
        'Total Occ': number;
        'GRP Rnt': number;
        'Rms/Avl.': number;
        'OOO/OOS': number;
        'OCC%': string;
        'Avg Rate': string;
        'Room Rev': string;
        'FNB Rev': string;
        'Total Rev': string;
        'Other Rev': string;
        'No.of Person': string;
      };

      let sheetData: RevenueImportObject[] = xlsxUtils.sheet_to_json(
        workbook.Sheets[sheetName],
        {
          header: [
            'Date',
            'FIT Rnt',
            'GRP Rnt',
            'Total Occ',
            'Rms/Avl.',
            'OOO/OOS',
            'OCC%',
            'Avg Rate',
            'Room Rev',
            'FNB Rev',
            'Other Rev',
            'Total Rev',
            'No.of Person',
          ],
        }
      );
      const hotel = sheetData[0].Date.replace('HOTEL NAME - ', '').trim();
      sheetData = sheetData.slice(3);
      const parsedArr: {history: any[]; forecast: any[]; hotel: string} = {
        hotel,
        history: [],
        forecast: [],
      };
      let currentValue: any = null;
      const regex = /^_+$/;
      await Promise.all(
        sheetData.map((data, _index) => {
          if (!data.Date || regex.test(data.Date)) return;
          if (data.Date == 'History') {
            currentValue = 'History';
            return;
          } else if (data.Date == 'Forecast') {
            currentValue = 'Forecast';
            return;
          }
          if (currentValue == 'History')
            parsedArr.history.push({
              date: new Date(data.Date).setUTCHours(0, 0, 0, 0),
              fitRnt: getValueOrGetDefaultValue(data['FIT Rnt']),
              grpRnt: getValueOrGetDefaultValue(data['GRP Rnt']),
              totalOcc: getValueOrGetDefaultValue(data['Total Occ']),
              avl: getValueOrGetDefaultValue(data['Rms/Avl.']),
              oos: getValueOrGetDefaultValue(data['OOO/OOS']),
              occPercent: getValueOrGetDefaultValue(data['OCC%']),
              avgRate: getValueOrGetDefaultValue(data['Avg Rate']),
              roomRev: getValueOrGetDefaultValue(data['Room Rev']),
              fnbRev: getValueOrGetDefaultValue(data['FNB Rev']),
              otherRev: getValueOrGetDefaultValue(data['Other Rev']),
              noPerson: getValueOrGetDefaultValue(data['No.of Person']),
            });
          else if (currentValue == 'Forecast')
            parsedArr.forecast.push({
              date: new Date(data.Date).setUTCHours(0, 0, 0, 0),
              fitRnt: getValueOrGetDefaultValue(data['FIT Rnt']),
              grpRnt: getValueOrGetDefaultValue(data['GRP Rnt']),
              totalOcc: getValueOrGetDefaultValue(data['Total Occ']),
              avl: getValueOrGetDefaultValue(data['Rms/Avl.']),
              oos: getValueOrGetDefaultValue(data['OOO/OOS']),
              occPercent: getValueOrGetDefaultValue(data['OCC%']),
              avgRate: getValueOrGetDefaultValue(data['Avg Rate']),
              roomRev: getValueOrGetDefaultValue(data['Room Rev']),
              fnbRev: getValueOrGetDefaultValue(data['FNB Rev']),
              otherRev: getValueOrGetDefaultValue(data['Other Rev']),
              noPerson: getValueOrGetDefaultValue(data['No.of Person']),
            });
        })
      );
      await RevenueController.revenueRepository.importHistoryAndForecastRevenueData(
        parsedArr
      );
      return new SuccessResponse(res, 'Success', parsedArr).send();
    } catch (error) {
      console.log(error);

      AppError.handle(error, res);
    }
  }
}
