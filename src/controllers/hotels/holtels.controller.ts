import {Request, Response} from 'express';
import {InternalErrorResponse, SuccessResponse} from './../../util/apiResponse';
import {AppError} from './../../util/app-error';
import {HotelRepository} from '../../repositories/hotelRepository';

export class HotelsController {
  private static HotelService: HotelRepository = new HotelRepository();
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
      const data = await HotelsController.HotelService.getHotelById(req.params.id);
      return new SuccessResponse(res, 'OK', data).send();
    } catch (error) {
      if (error instanceof AppError) return AppError.handle(error, res);
      return new InternalErrorResponse(res);
    }
  }
  public static async deleteHotelById(req: Request, res: Response) {
    try {
      const data =await HotelsController.HotelService.deleteHotelById(req.params.id);
      return new SuccessResponse(res, 'OK', data).send();
    } catch (error) {
      if (error instanceof AppError) return AppError.handle(error, res);
      return new InternalErrorResponse(res);
    }
  }
  public static async updateHotelById(req: Request, res: Response) {
    try {
      const data =await HotelsController.HotelService.updateHotelById(
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
      const data =await HotelsController.HotelService.registerHotel(req.body);
      return new SuccessResponse(res, 'OK', data).send();
    } catch (error) {
      if (error instanceof AppError) return AppError.handle(error, res);
      return new InternalErrorResponse(res);
    }
  }
}
