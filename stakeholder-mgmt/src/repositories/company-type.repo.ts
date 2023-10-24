import {companyTypeModel} from '../models/companyType.model';
import {CompTypeByOrgIdReq} from '../business_objects/company-type';

export class CompanyTypeRepository {
  async getCompanyTypeList() {
    const getCompType = await companyTypeModel.findAll();
    return getCompType;
  }
  async getCompanyTypesByOrgId(reqObj: CompTypeByOrgIdReq) {
    const getCompTypeByOrgId = await companyTypeModel.findAll({
      where: {orgTypeId: reqObj.orgId},
    });
    return getCompTypeByOrgId;
  }
}
