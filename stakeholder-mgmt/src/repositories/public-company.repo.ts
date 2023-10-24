import {PubCompByCompIdReq} from '../business_objects/public-company';
import {publicCompanyModel} from '../models/publicCompany.model';

export class PublicCompanyRepository {
  async getPublicCompanyList() {
    const getPubCompType = await publicCompanyModel.findAll();
    return getPubCompType;
  }

  async getPublicCompanyByCompId(reqObj: PubCompByCompIdReq) {
    const getPubCompByCompId = await publicCompanyModel.findAll({
      where: {compTypeId: reqObj.compId},
    });
    return getPubCompByCompId;
  }
}
