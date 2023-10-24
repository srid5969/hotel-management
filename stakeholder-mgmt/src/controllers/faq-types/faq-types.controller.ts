import {Request, Response} from 'express';
import {constants} from '../../util/constants';
import {
  BadRequestResponse,
  InternalErrorResponse,
  logger,
  SuccessResponse,
  //   NoContentResponse,
} from '../../util';
import {FaqRepository} from '../../repositories/faq.repo';
import {FaqTypeRepository} from '../../repositories/faq-type.repo';
import {addUpdateFaqReqTypes} from '../../business_objects/faqTypes';
import {UserRepository} from '../../repositories/users.repo';
import {faqTypesProvider} from '../../sql-provider/getFaqTypesList';
import sequelize from '../../config/sequelize';
import {QueryTypes} from 'sequelize';
export class FaqTypesController {
  static faqRepo = new FaqRepository();
  static faqTypesRepo = new FaqTypeRepository();
  static userRepo = new UserRepository();

  //#region getFaqTypes
  public static async getFaqTypes(req: Request, res: Response): Promise<void> {
    const taskName = 'FAQTYPES_LIST';
    logger.info(`${taskName}_REQ`, `GET_${taskName}`);
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
      const {faqTypeId} = req.params;
      // const faqTypeList: any = await FaqTypesController.faqTypesRepo.getFaqTypes(
      //   parseInt(faqTypeId)
      // );
      const faqTypeListByIdQuery = faqTypesProvider.getfaqTypesListDetails(
        parseInt(faqTypeId)
      );
      const faqTypeList = await sequelize.query(faqTypeListByIdQuery, {
        type: QueryTypes.SELECT,
      });
      if (!faqTypeList || faqTypeList.length <= 0) {
        logger.info(`${taskName}_DATA_NOT_FOUND`, JSON.stringify(faqTypeList));
        const noResult = new BadRequestResponse(res, 'No Faq Type Found.');
        return noResult.send();
      }
      const success = new SuccessResponse(res, 'success', faqTypeList);
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
  //#endregion
  //#region addUpdateFaqTypes
  public static async addUpdateFaqTypes(req: Request, res: Response) {
    const taskName = 'ADD_FAQTYPES';
    logger.info(`${taskName}`, req.body);
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
      const dbUser = await FaqTypesController.userRepo.findUserByAzureId(
        azureuserid.toString()
      );
      const reqObj: addUpdateFaqReqTypes = {
        faqTypeId: req.body.faqTypeId,
        faqTypeName: req.body.faqTypeName,
        sortNumber: req.body.sortNumber,
        lastModifiedBy: dbUser.id,
        isActive: req.body.isActive,
      };
      if (reqObj.faqTypeId === null) {
        const faqTypeExists = await FaqTypesController.faqTypesRepo.findFaqTypesByName(
          reqObj.faqTypeName.trim()
        );
        if (faqTypeExists) {
          logger.info(`${taskName}_ALREADY_EXISTS`, faqTypeExists);
          const noResult = new BadRequestResponse(
            res,
            'A faqTypes with this name already exists.'
          );
          return noResult.send();
        }
        const faqTypeSortNumberExists = await FaqTypesController.faqTypesRepo.findFaqTypesBySortNumber(
          reqObj.sortNumber
        );
        if (faqTypeSortNumberExists) {
          logger.info(`${taskName}_ALREADY_EXISTS`, faqTypeSortNumberExists);
          const noResult = new BadRequestResponse(
            res,
            'A faqTypes with this sortNumber already exists.'
          );
          return noResult.send();
        }
      } else {
        const faqTypeExists: any = await FaqTypesController.faqTypesRepo.findFaqTypesByName(
          reqObj.faqTypeName.trim()
        );
        if (faqTypeExists && parseInt(faqTypeExists.id) !== reqObj.faqTypeId) {
          logger.info(`${taskName}_ALREADY_EXISTS`, faqTypeExists);
          const noResult = new BadRequestResponse(
            res,
            'A faqTypes with this name already exists.'
          );
          return noResult.send();
        }
        const faqTypeSortNumberExists: any = await FaqTypesController.faqTypesRepo.findFaqTypesBySortNumber(
          reqObj.sortNumber
        );
        if (
          faqTypeSortNumberExists &&
          parseInt(faqTypeSortNumberExists.id) !== reqObj.faqTypeId
        ) {
          logger.info(`${taskName}_ALREADY_EXISTS`, faqTypeSortNumberExists);
          const noResult = new BadRequestResponse(
            res,
            'A faqTypes with this sortNumber already exists.'
          );
          return noResult.send();
        }
      }
      const addUpdateFaqResult = await FaqTypesController.faqTypesRepo.addUpdateFaqTypesQuery(
        reqObj
      );
      if (!addUpdateFaqResult) {
        logger.error(`${taskName}-ERROR`, addUpdateFaqResult);
        const noResult = new BadRequestResponse(
          res,
          'Error occurred while adding/updating FAQ'
        );
        return noResult.send();
      }
      const success = new SuccessResponse(res, 'success', addUpdateFaqResult);
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
  //#endregion
}
