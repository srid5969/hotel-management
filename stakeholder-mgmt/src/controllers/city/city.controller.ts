import {Request, Response} from 'express';
import {constants} from '../../util/constants';
import {
  BadRequestResponse,
  InternalErrorResponse,
  logger,
  SuccessResponse,
  //   NoContentResponse,
} from '../../util';
import {CityRepository} from '../../repositories/city.repo';
export class CityController {
  static cityRepo = new CityRepository();

  public static async getCityList(req: Request, res: Response): Promise<void> {
    const taskName = 'GET_CITY_LIST';
    logger.info(`${taskName}_REQ`, 'GET_LIST');
    try {
      const {azureuserid} = req.headers;
      if (!azureuserid) {
        logger.info(
          `${taskName}_AUTHORIZATION_HEADER_USERID_MISSING`,
          req.headers
        );
        const noResult = new BadRequestResponse(
          res,
          'Authorization header id missing'
        );
        return noResult.send();
      }
      const cityList: any = await CityController.cityRepo.getCityList();
      if (!cityList || cityList.length <= 0) {
        logger.info(`${taskName}_DATA_NOT_FOUND`, JSON.stringify(cityList));
        const noResult = new BadRequestResponse(
          res,
          'City List Data Not Found'
        );
        return noResult.send();
      }
      const success = new SuccessResponse(res, 'success', cityList);
      return success.send();
    } catch (err) {
      logger.error(`${taskName}_ERROR`, err);
      const response = new InternalErrorResponse(
        res,
        constants.errorMessage.unexpectedError
      );
      return response.send();
    }
  }
}
