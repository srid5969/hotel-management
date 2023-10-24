import sequelize from '../config/sequelize';
import {QueryTypes} from 'sequelize';
import {organizationModel} from '../models/organization.model';
import {
  createOrganizationReq,
  updateOrganizationReq,
} from '../business_objects/organization-name';
import {organizationProvider} from '../sql-provider/getOrganizationList';

export class OrganizationNameRepository {
  async getOrganizationNameList(isActive: boolean) {
    let getOrganizationQuery = organizationProvider.getOrganizationsListDetails();
    if (isActive) {
      getOrganizationQuery = `${getOrganizationQuery} WHERE "organization"."isActive" = ${isActive} ORDER BY "organization"."lastModifiedDate" DESC`;
    } else {
      getOrganizationQuery = `${getOrganizationQuery} ORDER BY "organization"."lastModifiedDate" DESC`;
    }
    const getOrganization = await sequelize.query(getOrganizationQuery, {
      type: QueryTypes.SELECT,
    });
    return getOrganization;
  }
  async getOrganizationNamebyId(isActive: boolean, id: number) {
    let getOrganizationQuery = organizationProvider.getOrganizationsListDetails();
    if (isActive) {
      getOrganizationQuery = `${getOrganizationQuery} 
    WHERE "organization"."isActive" = ${isActive}
    AND "organization"."id" =${id}
    ORDER BY "organization"."lastModifiedDate" DESC`;
    } else {
      getOrganizationQuery = `${getOrganizationQuery} 
      WHERE "organization"."id" =${id}
      ORDER BY "organization"."lastModifiedDate" DESC`;
    }

    const getOrganization = await sequelize.query(getOrganizationQuery, {
      type: QueryTypes.SELECT,
    });
    return getOrganization;
  }
  async getOrganizations(
    orgTypeId: number | number[],
    companyTypeId?: number,
    publicTypeId?: number
  ) {
    type objFilter = {
      orgTypeId: number | number[];
      companyTypeId?: number;
      publicCompanyId?: number;
      isActive: boolean;
    };
    const objFilter: objFilter = {
      orgTypeId: orgTypeId,
      isActive: true,
    };
    if (companyTypeId) {
      objFilter.companyTypeId = companyTypeId;
    }
    if (publicTypeId) {
      objFilter.publicCompanyId = publicTypeId;
    }
    const result = await organizationModel.findAll({
      where: objFilter,
      order: [['createdAt', 'DESC']],
    });
    return result;
  }
  async createOrganization(reqObj: createOrganizationReq) {
    const createOrganization = await organizationModel.create({
      name: reqObj.name,
      orgTypeId: reqObj.orgTypeId,
      companyTypeId: reqObj.companyTypeId,
      publicCompanyId: reqObj.publicCompanyId,
      lastModifiedBy: reqObj.userId,
      lastModifiedDate: new Date().toISOString(),
    });
    return createOrganization;
  }

  // async disableOrganization(reqObj: disableOrganizationReq) {
  //   const disableOrganization = await organizationModel.update(
  //     {
  //       isActive: false,
  //       lastModifiedBy: reqObj.userId,
  //       lastModifiedDate: new Date().toISOString(),
  //     },
  //     {
  //       where: {id: reqObj.orgNameIds},
  //     }
  //   );
  //   return disableOrganization;
  // }

  async updateOrganization(reqObj: updateOrganizationReq) {
    const updateOrganization = await organizationModel.update(
      {
        isActive: reqObj.isActive,
        lastModifiedBy: reqObj.userId,
        lastModifiedDate: new Date().toISOString(),
        name: reqObj.name,
        orgTypeId: reqObj.orgTypeId,
        companyTypeId: reqObj.companyTypeId,
        publicCompanyId: reqObj.publicCompanyId,
      },
      {
        where: {id: reqObj.orgNameId},
      }
    );
    return updateOrganization;
  }
  async findOrganizationByName(organizationName: string) {
    const organization = await organizationModel.findOne({
      where: {name: organizationName},
    });
    return organization;
  }
}
