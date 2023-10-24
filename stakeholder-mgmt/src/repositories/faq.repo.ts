import sequelize from '../config/sequelize';
import {logger} from '../util/logger';
import {faqsModel} from '../models/faqs.model';
import {activeInactiveReq, addUpdateFaqReq} from '../business_objects/faq';
import {faqsProvider} from '../sql-provider/getFaqsList';
import {QueryTypes} from 'sequelize';
export class FaqRepository {
  async getFaqsByTypeId(faqTypeId: number) {
    const faqResult = await faqsModel.findAll({
      where: {faqTypeId: faqTypeId, isActive: true},
      order: [['sortNumber', 'ASC']],
      attributes: ['question', 'answer', 'sortNumber', 'isActive'],
    });
    return faqResult;
  }
  async getFaqsByTypeIdForAdmin(faqTypeId: number) {
    const faqResult = await faqsModel.findAll({
      where: {faqTypeId: faqTypeId},
      order: [['sortNumber', 'ASC']],
      attributes: ['question', 'answer', 'sortNumber', 'isActive'],
    });
    return faqResult;
  }
  async addUpdateFaq(reqObj: Array<addUpdateFaqReq>) {
    const t = await sequelize.transaction();
    const taskName = 'Add/Update_FAQS';
    let addUpdateFaq: any;
    try {
      for (const element of reqObj) {
        if (element.faqId) {
          addUpdateFaq = await faqsModel.findOne({
            where: {faqTypeId: element.typeId, sortNumber: element.sortNumber},
          });
          if (addUpdateFaq && parseInt(addUpdateFaq?.id) !== element.faqId) {
            await t.rollback();
            logger.info(
              `${taskName}_ERROR_TRANSACTION_ROLLBACK`,
              'Unable to update as Faq already exists with same data'
            );
            return (addUpdateFaq = false);
          }
          addUpdateFaq = await faqsModel.findOne({
            where: {id: element.faqId},
          });
          addUpdateFaq = await addUpdateFaq.update(
            {
              faqTypeId: element.typeId,
              sortNumber: element.sortNumber,
              question: element.question,
              answer: element.answer,
              lastModifiedDate: new Date().toISOString(),
              lastModifiedBy: element.lastModifiedBy,
              isActive: element.isActive,
            },
            {transaction: t}
          );
        } else {
          addUpdateFaq = await faqsModel.findOne({
            where: {faqTypeId: element.typeId, sortNumber: element.sortNumber},
          });
          if (addUpdateFaq) {
            await t.rollback();
            logger.info(
              `${taskName}_ERROR_TRANSACTION_ROLLBACK`,
              'Faq already exists'
            );
            return (addUpdateFaq = false);
          }
          addUpdateFaq = await faqsModel.create(
            {
              faqTypeId: element.typeId,
              sortNumber: element.sortNumber,
              question: element.question,
              answer: element.answer,
              lastModifiedDate: new Date().toISOString(),
              lastModifiedBy: element.lastModifiedBy,
              isActive: element.isActive,
            },
            {transaction: t}
          );
        }
      }
      //commit transaction..
      await t.commit();
      logger.info(`${taskName}`, 'Transaction successfully committed');
      return (addUpdateFaq = true);
    } catch (error) {
      await t.rollback();
      logger.info(`${taskName}_ERROR_TRANSACTION_ROLLBACK`, error);
      return (addUpdateFaq = false);
    }
  }

  async activeInactiveFaqQuery(reqObj: activeInactiveReq) {
    let updateFaqStatus = await faqsModel.findOne({
      where: {id: reqObj.faqId},
    });
    updateFaqStatus = await updateFaqStatus.update({
      isActive: reqObj.isActive,
    });
    return updateFaqStatus;
  }

  async getFaqsById(faqId?: number) {
    const recordsQuery = faqsProvider.getfaqsListDetails(faqId);
    const records = await sequelize.query(recordsQuery, {
      type: QueryTypes.SELECT,
    });
    return records;
  }
}
