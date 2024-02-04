import {Request, Response} from 'express';
import {read as readXlsx, utils as xlsxUtils} from 'xlsx';
import {RevenueRepository} from '../../repositories/revenueRepository';
import {SuccessResponse} from '../../util/apiResponse';
import {AppError, PreconditionFailedError} from '../../util/app-error';
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
  public static async importBusinessSourceIncomeController(
    req: Request,
    res: Response
  ) {
    try {
      const buffer = req.file.buffer;
      const workbook = readXlsx(buffer, {type: 'buffer'});
      const sheetName = workbook.SheetNames[0];
      const date: number = new Date(
        req.file.originalname.replace(
          /MIS B Business Source as on (\d{2}) (\w{3}) (\d{4}).xlsx/,
          '$3 $2 $1'
        )
      ).setUTCHours(0, 0, 0, 0);
      let sheetData: {
        [key in string]: string | number | null;
      }[] = xlsxUtils.sheet_to_json(workbook.Sheets[sheetName], {
        header: 'A',
      });
      sheetData.shift();
      let total: {
        [key in string]: string | number;
      } = sheetData.find(data => data.A == 'Total =====>');
      if (!total) throw new PreconditionFailedError('Total Not Found Error');
      total = {
        mod_occ: getValueOrGetDefaultValue(total.B),
        mod_pax: getValueOrGetDefaultValue(total.D),
        mod_rate: getValueOrGetDefaultValue(total.F),
        mod_arr: getValueOrGetDefaultValue(total.G),
        mod_arp: getValueOrGetDefaultValue(total.H),
        yod_occ: getValueOrGetDefaultValue(total.I),
        yod_pax: getValueOrGetDefaultValue(total.K),
        yod_rate: getValueOrGetDefaultValue(total.M),
        yod_arr: getValueOrGetDefaultValue(total.N),
        yod_arp: getValueOrGetDefaultValue(total.O),
      };
      const regex = /^_+$/;
      sheetData = sheetData.filter(
        (data, index) =>
          index > 2 &&
          data.A !== 'Total =====>' &&
          data.A !== 'Business Source' &&
          data.A &&
          !regex.test(data.A.toString())
      );
      sheetData = await Promise.all(
        sheetData.map(data => ({
          source: data.A,
          mod_occ: getValueOrGetDefaultValue(data.B),
          mod_occPercent: getValueOrGetDefaultValue(data.C),
          mod_pax: getValueOrGetDefaultValue(data.D),
          mod_paxPercent: getValueOrGetDefaultValue(data.E),
          mod_rate: getValueOrGetDefaultValue(data.F),
          mod_arr: getValueOrGetDefaultValue(data.G),
          mod_arp: getValueOrGetDefaultValue(data.H),
          yod_occ: getValueOrGetDefaultValue(data.I),
          yod_occPercent: getValueOrGetDefaultValue(data.J),
          yod_pax: getValueOrGetDefaultValue(data.K),
          yod_paxPercent: getValueOrGetDefaultValue(data.L),
          yod_rate: getValueOrGetDefaultValue(data.M),
          yod_arr: getValueOrGetDefaultValue(data.N),
          yod_arp: getValueOrGetDefaultValue(data.O),
        }))
      );
      return new SuccessResponse(res, 'Success', {
        date: date,
        data: sheetData,
        total,
      }).send();
    } catch (error) {}
  }

  public static async importMarketSegmentController(
    req: Request,
    res: Response
  ) {
    try {
      const buffer = req.file.buffer;
      const workbook = readXlsx(buffer, {type: 'buffer'});
      const sheetName = workbook.SheetNames[0];
      const date: number = new Date(
        req.file.originalname
          .replace('  ', ' ') //if 2 space exist convert to single space
          .replace(
            /MIS B Market Segment as on (\d{2}) (\w{3}) (\d{4}).xlsx/,
            '$3 $2 $1'
          )
      ).setUTCHours(0, 0, 0, 0);
      let sheetData: {
        [key in string]: string | number | null;
      }[] = xlsxUtils.sheet_to_json(workbook.Sheets[sheetName], {
        header: 'A',
      });
      sheetData.shift();
      let total: {
        [key in string]: string | number;
      } = sheetData.find(data => data.A == 'Total =====>');
      if (!total) throw new PreconditionFailedError('Total Not Found Error');
      total = {
        mod_occ: getValueOrGetDefaultValue(total.B),
        mod_pax: getValueOrGetDefaultValue(total.D),
        mod_rate: getValueOrGetDefaultValue(total.F),
        mod_arr: getValueOrGetDefaultValue(total.G),
        mod_arp: getValueOrGetDefaultValue(total.H),
        yod_occ: getValueOrGetDefaultValue(total.I),
        yod_pax: getValueOrGetDefaultValue(total.K),
        yod_rate: getValueOrGetDefaultValue(total.M),
        yod_arr: getValueOrGetDefaultValue(total.N),
        yod_arp: getValueOrGetDefaultValue(total.O),
      };
      const regex = /^_+$/;
      sheetData = sheetData.filter(
        (data, index) =>
          index > 2 &&
          data.A !== 'Total =====>' &&
          data.A !== 'Market Segment' &&
          data.A &&
          !regex.test(data.A.toString())
      );
      sheetData = await Promise.all(
        sheetData.map(data => ({
          source: data.A,
          mod_occ: getValueOrGetDefaultValue(data.B),
          mod_occPercent: getValueOrGetDefaultValue(data.C),
          mod_pax: getValueOrGetDefaultValue(data.D),
          mod_paxPercent: getValueOrGetDefaultValue(data.E),
          mod_rate: getValueOrGetDefaultValue(data.F),
          mod_arr: getValueOrGetDefaultValue(data.G),
          mod_arp: getValueOrGetDefaultValue(data.H),
          yod_occ: getValueOrGetDefaultValue(data.I),
          yod_occPercent: getValueOrGetDefaultValue(data.J),
          yod_pax: getValueOrGetDefaultValue(data.K),
          yod_paxPercent: getValueOrGetDefaultValue(data.L),
          yod_rate: getValueOrGetDefaultValue(data.M),
          yod_arr: getValueOrGetDefaultValue(data.N),
          yod_arp: getValueOrGetDefaultValue(data.O),
        }))
      );
      return new SuccessResponse(res, 'Success', {
        sheetName: req.file.originalname,
        date: date,
        data: sheetData,
        total,
      }).send();
    } catch (error) {}
  }
}
