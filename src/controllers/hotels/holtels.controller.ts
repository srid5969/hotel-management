import {Request, Response} from 'express';
import {ImportHotelReportReportFromExsl} from './../../repositories/importHotelReport';
import {HotelRepository} from '../../repositories/hotelRepository';
import {InternalErrorResponse, SuccessResponse} from './../../util/apiResponse';
import {AppError} from './../../util/app-error';
import {read as readXlsx, utils as xlsxUtils} from 'xlsx';
import {MulterRequest} from '../../business_objects/multerRequest';

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
        // console.log(values);

        if (values.length == 1 && regex.test(String(values[0]))) {
          //remove ______
          continue;
        } else if (values.length == 1) {
          hotel = values[0];
          // console.log(hotel);

          continue;
        } else if (values[0] != 'Res. Total' &&values[0] != 'Grnd. Total') {
          // console.log(hotel);

          const arr = String(values[0]).split('/');
          const date = new Date(`${arr[2]}-${arr[1]}-${arr[0]}`);

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
              others:Number(String(values[7] || '0.00').replace(',', '')),
              advance: Number(String(values[8] || '0.00').replace(',', '')),
            };
            data.push(hotelReportByDate);
          } else {
            console.log(hotel, values);
          }
        } else {
          // console.log(values);
        }

        // console.log(Object.values(element));
        // data.push(Object.values(element));
      }
      const result =
        await HotelsController.importHotelServices.importMonthlyReport(data);
      return new SuccessResponse(res, 'OK', result).send();
    } catch (error) {
      console.log('error', error);

      if (error instanceof AppError) return AppError.handle(error, res);
      return new InternalErrorResponse(res).send();
    }
  }
}
