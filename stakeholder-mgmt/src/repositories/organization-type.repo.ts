import {organizationTypeModel} from '../models/organizationType.model';

export class OrganizationTypeRepository {
  async getOrganizationTypeList() {
    const getOrgType = await organizationTypeModel.findAll();
    return getOrgType;
  }
}
