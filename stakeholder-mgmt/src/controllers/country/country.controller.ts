import {Request, Response} from 'express';
import {constants} from '../../util/constants';
import {
  BadRequestResponse,
  InternalErrorResponse,
  logger,
  SuccessResponse,
  //   NoContentResponse,
} from '../../util';
import {CountryRepository} from '../../repositories/country.repo';
export class CountryController {
  static countryRepo = new CountryRepository();

  public static async getCountryList(
    req: Request,
    res: Response
  ): Promise<void> {
    const taskName = 'GET_COUNTRY_LIST';
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
      const countryList: any = await CountryController.countryRepo.getCountryList();
      if (!countryList || countryList.length <= 0) {
        logger.info(`${taskName}_DATA_NOT_FOUND`, JSON.stringify(countryList));
        const noResult = new BadRequestResponse(
          res,
          'Country List Data Not Found'
        );
        return noResult.send();
      }
      const success = new SuccessResponse(res, 'success', countryList);
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
