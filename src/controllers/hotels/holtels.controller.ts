import {Request, Response} from 'express';
import {ImportHotelReportReportFromExsl} from './../../repositories/importHotelReport';
import {HotelRepository} from '../../repositories/hotelRepository';
import {InternalErrorResponse, SuccessResponse} from './../../util/apiResponse';
import {AppError} from './../../util/app-error';
import {read as readXlsx, utils as xlsxUtils} from 'xlsx';
import {MulterRequest} from '../../business_objects/multerRequest';
import {MealType} from '../../util/enum';
import {
  DailySalesDataFromExcel,
  DailySalesReport,
} from '../../business_objects/hotelSales';

export class HotelsController {
  private static HotelService: HotelRepository = new HotelRepository();
  private static importHotelServices: ImportHotelReportReportFromExsl =
    new ImportHotelReportReportFromExsl();
  public static async getAllHotels(req: Request, res: Response) {
    try {
      const data = await HotelsController.HotelService.getAllHotels(
        req.query.limit as any,
        req.query.offset as any
      );
      return new SuccessResponse(res, 'OK', data).send();
    } catch (error) {
      if (error instanceof AppError) return AppError.handle(error, res);
      return new InternalErrorResponse(res);
    }
  }
  public static async getHotelById(req: Request, res: Response) {
    try {
      const data = await HotelsController.HotelService.getHotelById(
        req.params.id
      );
      return new SuccessResponse(res, 'OK', data).send();
    } catch (error) {
      if (error instanceof AppError) return AppError.handle(error, res);
      return new InternalErrorResponse(res);
    }
  }
  public static async deleteHotelById(req: Request, res: Response) {
    try {
      const data = await HotelsController.HotelService.deleteHotelById(
        req.params.id
      );
      return new SuccessResponse(res, 'OK', data).send();
    } catch (error) {
      if (error instanceof AppError) return AppError.handle(error, res);
      return new InternalErrorResponse(res);
    }
  }
  public static async updateHotelById(req: Request, res: Response) {
    try {
      const data = await HotelsController.HotelService.updateHotelById(
        req.params.id,
        req.body
      );
      return new SuccessResponse(res, 'OK', data).send();
    } catch (error) {
      if (error instanceof AppError) return AppError.handle(error, res);
      return new InternalErrorResponse(res);
    }
  }
  public static async addHotel(req: Request, res: Response) {
    try {
      const data = await HotelsController.HotelService.registerHotel(req.body);
      return new SuccessResponse(res, 'OK', data).send();
    } catch (error) {
      if (error instanceof AppError) return AppError.handle(error, res);
      return new InternalErrorResponse(res);
    }
  }
  public static async importHotelsMonthlyReport(
    req: MulterRequest,
    res: Response
  ) {
    try {
      const buffer = req.file.buffer;
      const workbook = readXlsx(buffer, {type: 'buffer'});
      const sheetName = workbook.SheetNames[0];
      const jsonData = xlsxUtils.sheet_to_json(workbook.Sheets[sheetName], {});
      jsonData.shift(); //removing first index value of jsonArray
      const data: any[] = [];
      let hotel = '';
      const regex = /^_+$/;

      for (let i = 0; i < jsonData.length; i++) {
        const element = jsonData[i];
        const values = Object.values(element);

        if (values.length == 1 && regex.test(String(values[0]))) {
          //remove ______
          continue;
        } else if (values.length == 1) {
          hotel = values[0];

          continue;
        } else if (values[0] != 'Res. Total' && values[0] != 'Grnd. Total') {
          const arr = String(values[0]).split('/');
          const date = new Date(`${arr[2]}-${arr[1]}-${arr[0]}`).setUTCHours(
            0,
            0,
            0,
            0
          );

          if (values.length >= 7) {
            const hotelReportByDate = {
              hotel: hotel,
              date: date,
              billAmount: Number(String(values[1]).replace(',', '')),
              discount: Number(String(values[2]).replace(',', '')),
              food: Number(String(values[3]).replace(',', '')),
              liquor: Number(String(values[4]).replace(',', '')),
              softDrinks: Number(String(values[5]).replace(',', '')),
              tobacco: Number(String(values[6]).replace(',', '')),
              others: Number(String(values[7] || '0.00').replace(',', '')),
              advance: Number(String(values[8] || '0.00').replace(',', '')),
            };
            data.push(hotelReportByDate);
          } else {
            console.log(hotel, values);
          }
        } else {
        }

        // data.push(Object.values(element));
      }
      const result =
        await HotelsController.importHotelServices.importMonthlyReport(data);
      return new SuccessResponse(res, 'OK', result).send();
    } catch (error) {
      if (error instanceof AppError) return AppError.handle(error, res);
      return new InternalErrorResponse(res).send();
    }
  }
  public static async importHotelsDailyReport(
    req: MulterRequest,
    res: Response
  ) {
    try {
      const buffer = req.file.buffer;
      const workbook = readXlsx(buffer, {type: 'buffer'});
      const sheetName = workbook.SheetNames[0];
      const date = new Date(
        req.file.originalname.replace(
          /Daily Sales Reports as on (\d{2}) (\w{3}) (\d{4}).xlsx/,
          '$3 $2 $1'
        )
      ).setUTCHours(0, 0, 0, 0);
      const jsonData: DailySalesDataFromExcel[] = xlsxUtils.sheet_to_json(
        workbook.Sheets[sheetName],
        {
          header: [
            'Bill#',
            'Table # / Room #',
            'Kot #',
            'COVFX',
            'FOD',
            'LIQ#',
            'SFD#',
            'SMK#',
            'OTH#',
            'Sale Amount',
            'CGT',
            'SGT',
            'ROF#',
            'DISC.',
            'NET.AMT',
            'Set.Amt',
            'Set.Mode',
            'User',
          ],
        }
      );
      jsonData.shift(); //removing first index value of jsonArray(header)
      const data: any[] = [];
      let hotel = '';
      let mealType = '';
      const regex = /^_+$/;
      for (let i = 0; i < jsonData.length; i++) {
        const element = jsonData[i];
        const values = Object.values(element);
        if (values.length == 1 && regex.test(String(values[0]))) {
          //remove ______
          continue;
        } else if (
          values.length == 1 &&
          [
            MealType.Breakfast,
            MealType.Dinner,
            MealType.Lunch,
            MealType.General,
            MealType.Snack,
          ].includes(element['Bill#'] as any)
        ) {
          mealType = element['Bill#'];
          continue;
        } else if (values.length == 1) {
          hotel = element['Bill#'];
          continue;
        } else if (element.User) {
          const sale: DailySalesReport = {
            hotel: hotel,
            mealType: mealType as MealType,
            orderId: element['Bill#'],
            tableNo: element['Table # / Room #'],
            kot: element['Kot #']?.split(',').map(elm => Number(elm)),
            covfx: Number(element['COVFX']?.replace(',', '') ?? 0.0),
            fod: Number(element['FOD']?.replace(',', '') ?? 0.0),
            liq: Number(element['LIQ#']?.replace(',', '') ?? 0.0),
            sfd: Number(element['SFD#']?.replace(',', '') ?? 0.0),
            smk: Number(element['SMK#']?.replace(',', '') ?? 0.0),
            oth: Number(element['OTH#']?.replace(',', '') ?? 0.0),
            salesAmount: Number(
              element['Sale Amount']?.replace(',', '') ?? 0.0
            ),
            cgt: Number(element['CGT']?.replace(',', '') ?? 0.0),
            sgt: Number(element['SGT']?.replace(',', '') ?? 0.0),
            rof: Number(element['ROF#']?.replace(',', '') ?? 0.0),
            disc: Number(element['DISC.']?.replace(',', '') ?? 0.0),
            netAmount: Number(element['NET.AMT']?.replace(',', '') ?? 0.0),
            setAmount: Number(element['Set.Amt']?.replace(',', '') ?? 0.0),
            setMode: element['Set.Mode'],
            user: element['User'],
            date,
          };
          data.push(sale);
        }
      }

      // for (let i = 0; i < jsonData.length; i++) {
      //   const element = jsonData[i];
      //   const values = Object.values(element);

      //   if (values.length == 1 && regex.test(String(values[0]))) {
      //     //remove ______
      //     continue;
      //   } else if (values.length == 1) {
      //     hotel = values[0];
      //     continue;
      //   } else if (values[0] != 'Res. Total' && values[0] != 'Grnd. Total') {

      //     const arr = String(values[0]).split('/');
      //     const date = new Date(`${arr[2]}-${arr[1]}-${arr[0]}`);

      //     if (values.length >= 7) {
      //       const hotelReportByDate = {
      //         hotel: hotel,
      //         date: date,
      //         billAmount: Number(String(values[1]).replace(',', '')),
      //         discount: Number(String(values[2]).replace(',', '')),
      //         food: Number(String(values[3]).replace(',', '')),
      //         liquor: Number(String(values[4]).replace(',', '')),
      //         softDrinks: Number(String(values[5]).replace(',', '')),
      //         tobacco: Number(String(values[6]).replace(',', '')),
      //         others: Number(String(values[7] || '0.00').replace(',', '')),
      //         advance: Number(String(values[8] || '0.00').replace(',', '')),
      //       };
      //       data.push(hotelReportByDate);
      //     } else {
      //     }
      //   } else {
      //   }

      //   // data.push(Object.values(element));
      // }
      const result =
        await HotelsController.importHotelServices.importDailyReport(data);
      return new SuccessResponse(res, 'OK', result).send();
    } catch (error) {
      if (error instanceof AppError) return AppError.handle(error, res);
      return new InternalErrorResponse(res).send();
    }
  }
}
