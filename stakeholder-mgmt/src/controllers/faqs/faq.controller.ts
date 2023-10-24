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
import {
  activeInactiveReq,
  addUpdateFaqReq,
  faqObjRes,
} from '../../business_objects/faq';
import {UserRepository} from '../../repositories/users.repo';
export class FaqController {
  static faqRepo = new FaqRepository();
  static faqTypesRepo = new FaqTypeRepository();
  static userRepo = new UserRepository();

  //#region getFaqs
  public static async getFaqs(req: Request, res: Response): Promise<void> {
    const taskName = 'FAQS_LIST';
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
      const faqTypeList: any = await FaqController.faqTypesRepo.getFaqTypes();
      if (!faqTypeList || faqTypeList.length <= 0) {
        logger.info(`${taskName}_DATA_NOT_FOUND`, JSON.stringify(faqTypeList));
        const noResult = new BadRequestResponse(res, 'No Faq Type Found.');
        return noResult.send();
      }
      const faqResult = [];
      for (let index = 0; index < faqTypeList.length; index++) {
        const element = faqTypeList[index];
        const faqs = await FaqController.faqRepo.getFaqsByTypeId(element.id);
        const obj: faqObjRes = {
          faqType: element,
          faqs: faqs,
        };
        faqResult.push(obj);
      }
      const success = new SuccessResponse(res, 'success', faqResult);
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

  //#region getFaqs
  public static async getFaqsbyId(req: Request, res: Response): Promise<void> {
    const taskName = 'FAQS_LIST_ID';
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
      const {faqId} = req.params;
      const faqList: any = await FaqController.faqRepo.getFaqsById(
        parseInt(faqId)
      );
      if (!faqList || faqList.length <= 0) {
        logger.info(`${taskName}_DATA_NOT_FOUND`, JSON.stringify(faqList));
        const noResult = new BadRequestResponse(res, 'No Faq Found.');
        return noResult.send();
      }
      const success = new SuccessResponse(res, 'success', faqList);
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

  //#region addUpdateFaqs
  public static async addUpdateFaqs(req: Request, res: Response) {
    const taskName = 'ADD_FAQ';
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
      const dbUser = await FaqController.userRepo.findUserByAzureId(
        azureuserid.toString()
      );
      const reqObj = req.body.faqsList.map((item: any) => {
        const reqObj1: addUpdateFaqReq = {
          faqId: item.faqId,
          typeId: item.typeId,
          sortNumber: item.sortNumber,
          question: item.question,
          answer: item.answer,
          lastModifiedBy: dbUser.id,
          isActive: item.isActive,
        };
        return reqObj1;
      });
      // const reqObj: addUpdateFaqReq = {
      //   faqId: req.body.faqId,
      //   typeId: req.body.typeId,
      //   sortNumber: req.body.sortNumber,
      //   question: req.body.question,
      //   answer: req.body.answer,
      //   lastModifiedBy: dbUser.id,
      // };
      const addUpdateFaqResult = await FaqController.faqRepo.addUpdateFaq(
        reqObj
      );
      if (!addUpdateFaqResult) {
        logger.error(`${taskName}-ERROR`, addUpdateFaqResult);
        const noResult = new BadRequestResponse(
          res,
          'Error occurred while adding/updating FAQ - Possible reason: Faq with same faqType and SortNumber already exists'
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

  //#region activeInactiveFaq
  public static async activeInactiveFaq(req: Request, res: Response) {
    const taskName = 'ACTIVE_INACTIVE_FAQ';
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
      const reqObj: activeInactiveReq = {
        faqId: req.body.faqId,
        isActive: req.body.isActive,
      };
      const activeInactiveFaqResult = await FaqController.faqRepo.activeInactiveFaqQuery(
        reqObj
      );
      if (!activeInactiveFaqResult) {
        logger.error(`${taskName}-ERROR`, activeInactiveFaqResult);
        const noResult = new BadRequestResponse(
          res,
          'Error occurred while updating FAQ status.'
        );
        return noResult.send();
      }
      const success = new SuccessResponse(
        res,
        'success',
        activeInactiveFaqResult
      );
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
