import {designationModel} from '../models/designation.model';
import {
  addDesignationReq,
  enableDisableDesignationReq,
} from '../business_objects/designation';

export class DesignationRepository {
  async getDesignationById(designationId: number) {
    const getDesignation = await designationModel.findOne({
      where: {id: designationId},
    });
    return getDesignation;
  }
  async getDesignationList() {
    const getDesignationList = await designationModel.findAll({
      where: {isActive: true},
    });
    return getDesignationList;
  }
  async addDesignationQuery(reqObj: addDesignationReq) {
    const addDesignation = await designationModel.create({
      name: reqObj.designationName,
      lastModifiedDate: new Date().toISOString(),
      lastModifiedBy: reqObj.lastModifiedBy,
    });
    return addDesignation;
  }
  async enableDisableDesignationQuery(reqObj: enableDisableDesignationReq) {
    let enableDisableDesignation = await designationModel.findOne({
      where: {id: reqObj.designationId},
    });
    if (enableDisableDesignation) {
      enableDisableDesignation = await enableDisableDesignation.update({
        isActive: reqObj.designationStatus,
        lastModifiedDate: new Date().toISOString(),
        lastModifiedBy: reqObj.lastModifiedBy,
      });
    }
    return enableDisableDesignation;
  }
}
