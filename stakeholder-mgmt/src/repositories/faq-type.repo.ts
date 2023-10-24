import {addUpdateFaqReqTypes} from '../business_objects/faqTypes';
import {faqTypesModel} from '../models/faqTypes.model';

export class FaqTypeRepository {
  async getFaqTypes(faqTypeId?: number) {
    if (!faqTypeId) {
      const faqTypesResult = await faqTypesModel.findAll({
        order: [['sortNumber', 'ASC']],
        attributes: [
          'id',
          'name',
          'code',
          'sortNumber',
          'createdAt',
          'updatedAt',
          'isActive',
        ],
        where: {isActive: true},
      });
      return faqTypesResult;
    } else {
      const faqTypesResult = await faqTypesModel.findAll({
        order: [['sortNumber', 'ASC']],
        attributes: ['id', 'name', 'code', 'sortNumber'],
        where: {id: faqTypeId, isActive: true},
      });
      return faqTypesResult;
    }
  }
  async addUpdateFaqTypesQuery(reqObj: addUpdateFaqReqTypes) {
    let addUpdateFaqTypes;
    if (reqObj.faqTypeId) {
      addUpdateFaqTypes = await faqTypesModel.findOne({
        where: {id: reqObj.faqTypeId},
      });
      addUpdateFaqTypes = await addUpdateFaqTypes.update({
        name: reqObj.faqTypeName,
        sortNumber: reqObj.sortNumber,
        code: reqObj.faqTypeName.split(' ').join('_').toUpperCase(),
        lastModifiedBy: reqObj.lastModifiedBy,
        isActive: reqObj.isActive,
      });
      return addUpdateFaqTypes;
    }
    addUpdateFaqTypes = await faqTypesModel.create({
      name: reqObj.faqTypeName,
      sortNumber: reqObj.sortNumber,
      code: reqObj.faqTypeName.split(' ').join('_').toUpperCase(),
      lastModifiedBy: reqObj.lastModifiedBy,
      isActive: reqObj.isActive,
    });
    return addUpdateFaqTypes;
  }
  async findFaqTypesByName(faqTpName: string) {
    const faqTypeName = await faqTypesModel.findOne({
      where: {name: faqTpName},
    });
    return faqTypeName;
  }
  async findFaqTypesBySortNumber(sortNumber: number) {
    const faqTypeSortNumber = await faqTypesModel.findOne({
      where: {sortNumber: sortNumber},
    });
    return faqTypeSortNumber;
  }
}
