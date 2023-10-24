import sequelize from '../config/sequelize';
import {stakeHolderModel} from '../models/stakeHolder.model';
import {stakeHolderProvider} from '../sql-provider/getStakeholdersList';
import {QueryTypes, Op} from 'sequelize';
import {logger} from '../util/logger';
import {stakeHolderLinksModel} from '../models/stakeHolderLinks.model';
import {stakeHolderApprovalsModel} from '../models/stakeholderApprovals.model';
import {filteredStakeholderReq} from '../business_objects/stakeholder';
import {filterDashboardReq} from '../business_objects/manager-dashboard';
import {stakeHolderLinksProvider} from '../sql-provider/getStakeholderLinks';
import {
  createUpdateStakeHolderReq,
  stakeHolderAdditionalReq,
} from '../business_objects/stakeholder';
import {constants} from '../util/constants';
export class StakeHolderRepository {
  //#region getStakeHolderList
  public async getStakeHolderList(
    priorityLevel: Array<string>,
    userId: number
  ) {
    let getStakeHolderQuery = stakeHolderProvider.getStakeHoldersListDetails(
      userId
    );

    if (constants.restrictiionType.IS_PRIORITY_BASED) {
      // eslint-disable-next-line quotes
      const priorityType = `'${priorityLevel.join("','")}'`;
      if (getStakeHolderQuery.search('WHERE') === -1) {
        getStakeHolderQuery = `${getStakeHolderQuery} WHERE "stakeHolder"."priorityLevel" in (${priorityType})`;
      } else {
        getStakeHolderQuery = `${getStakeHolderQuery} AND "stakeHolder"."priorityLevel" in (${priorityType})`;
      }
      getStakeHolderQuery = `${getStakeHolderQuery} AND "stakeHolder"."isActive" = 'true' ORDER BY "stakeHolder"."lastModifiedDate" DESC`;
      const getStakeHolders = await sequelize.query(getStakeHolderQuery, {
        type: QueryTypes.SELECT,
      });
      return getStakeHolders;
    } else {
      getStakeHolderQuery = `${getStakeHolderQuery} WHERE "stakeHolder"."isActive" = 'true' ORDER BY "stakeHolder"."lastModifiedDate" DESC`;
      const getStakeHolders = await sequelize.query(getStakeHolderQuery, {
        type: QueryTypes.SELECT,
      });
      return getStakeHolders;
    }
  }
  //#endregion

  //#region getStakeHolderList
  public async getStakeHolderListForAdminDashboard(
    userId: number,
    organizationIds?: number[] | null,
    cityIds?: number[] | null,
    orgtypIds?: number[] | null,
    isFilteredForCurrentYear?: boolean | null
  ) {
    let getStakeHolderQuery = stakeHolderProvider.getStakeHoldersListDetails(
      userId
    );
    if (isFilteredForCurrentYear) {
      // eslint-disable-next-line quotes
      if (getStakeHolderQuery.search('WHERE') === -1) {
        getStakeHolderQuery = `${getStakeHolderQuery} WHERE EXTRACT(year from "stakeHolder"."createdAt") = EXTRACT(YEAR FROM CURRENT_DATE)`;
      } else {
        getStakeHolderQuery = `${getStakeHolderQuery} AND EXTRACT(year from "stakeHolder"."createdAt") = EXTRACT(YEAR FROM CURRENT_DATE)`;
      }
    }
    if (organizationIds !== null && organizationIds.length > 0) {
      // eslint-disable-next-line quotes
      if (getStakeHolderQuery.search('WHERE') === -1) {
        getStakeHolderQuery = `${getStakeHolderQuery} WHERE "organization"."id" IN (${organizationIds})`;
      } else {
        getStakeHolderQuery = `${getStakeHolderQuery} AND "organization"."id" IN (${organizationIds})`;
      }
    }
    if (cityIds !== null && cityIds.length > 0) {
      // eslint-disable-next-line quotes
      if (getStakeHolderQuery.search('WHERE') === -1) {
        getStakeHolderQuery = `${getStakeHolderQuery} WHERE "city"."id" IN (${cityIds})`;
      } else {
        getStakeHolderQuery = `${getStakeHolderQuery} AND "city"."id" IN (${cityIds})`;
      }
    }
    if (orgtypIds !== null && orgtypIds.length > 0) {
      // eslint-disable-next-line quotes
      if (getStakeHolderQuery.search('WHERE') === -1) {
        getStakeHolderQuery = `${getStakeHolderQuery} WHERE "organizationType"."id" IN (${orgtypIds})`;
      } else {
        getStakeHolderQuery = `${getStakeHolderQuery} AND "organizationType"."id" IN (${orgtypIds})`;
      }
    }
    if (getStakeHolderQuery.search('WHERE') === -1) {
      getStakeHolderQuery = `${getStakeHolderQuery} WHERE "stakeHolder"."isActive" = 'true' AND "status"."id" NOT IN (2,4) ORDER BY "stakeHolder"."lastModifiedDate" DESC`;
    } else {
      getStakeHolderQuery = `${getStakeHolderQuery} AND "stakeHolder"."isActive" = 'true' AND "status"."id" NOT IN (2,4) ORDER BY "stakeHolder"."lastModifiedDate" DESC`;
    }
    const getStakeHolders = await sequelize.query(getStakeHolderQuery, {
      type: QueryTypes.SELECT,
    });
    return getStakeHolders;
  }
  //#endregion

  //#region getApprovedStakeholdersList
  public async getApprovedStakeholdersList(
    approvedStatusId: number,
    userId: number
  ) {
    let getStakeHolderQuery = stakeHolderProvider.getStakeHoldersListDetails(
      userId
    );
    // eslint-disable-next-line quotes
    if (getStakeHolderQuery.search('WHERE') === -1) {
      getStakeHolderQuery = `${getStakeHolderQuery} WHERE "status"."id" = ${approvedStatusId}`;
    } else {
      getStakeHolderQuery = `${getStakeHolderQuery} AND "status"."id" = ${approvedStatusId}`;
    }
    getStakeHolderQuery = `${getStakeHolderQuery} ORDER BY "stakeHolder"."lastModifiedDate" DESC`;
    const getStakeHolders = await sequelize.query(getStakeHolderQuery, {
      type: QueryTypes.SELECT,
    });
    return getStakeHolders;
  }
  //#endregion

  //#region filteredStakeHolderList
  public async filteredStakeHolderList(
    filterObj: filteredStakeholderReq,
    userId: number
  ) {
    let filterStakeHolderQuery = stakeHolderProvider.stakeHolderFilters(
      filterObj,
      userId
    );
    filterStakeHolderQuery = `${filterStakeHolderQuery} ORDER BY "stakeHolder"."lastModifiedDate" DESC`;
    const filterStakeHolders = await sequelize.query(filterStakeHolderQuery, {
      type: QueryTypes.SELECT,
    });
    return filterStakeHolders;
  }
  //#endregion

  //#region createUpdateStakeHolder
  public async createUpdateStakeHolder(
    reqObj: createUpdateStakeHolderReq,
    addReq: stakeHolderAdditionalReq,
    loginUserId: number
  ) {
    const t = await sequelize.transaction();
    const taskName = 'CREATE_STAKEHOLDER';
    logger.info(`${taskName}`, 'Transaction started');
    try {
      //#region Stakeholder Creation And Updating
      let stakeholderResult: any;
      if (reqObj.stakeHolderId) {
        stakeholderResult = await stakeHolderModel.findOne({
          where: {id: reqObj.stakeHolderId},
        });
        if (!stakeholderResult) {
          return null;
        }
        stakeholderResult.update(
          {
            fullName: reqObj.fullName.trim(),
            organizationTypeId: reqObj.organizationTypeId,
            companyTypeId: reqObj.companyTypeId,
            publicCompanyId: reqObj.publicCompanyId,
            organizationId: reqObj.organizationId,
            designation: reqObj.designation,
            email: reqObj.email,
            mobile: reqObj.mobile,
            description: reqObj?.description,
            cityId: reqObj.cityId,
            priorityLevel: reqObj.priorityLevel,
            imageUrl: reqObj?.imageUrl,
            imageName: reqObj?.imageName,
            imageType: reqObj?.imageType,
            lastModifiedBy: loginUserId,
            lastModifiedDate: new Date().toISOString(),
          },
          {transaction: t}
        );
      } else {
        if (reqObj.mergedIds.length > 0 && !reqObj.stakeHolderId) {
          stakeholderResult = await stakeHolderModel.update(
            {isActive: false},
            {where: {id: reqObj.mergedIds}, transaction: t}
          );
        }
        stakeholderResult = await stakeHolderModel.create(
          {
            fullName: reqObj.fullName.trim(),
            organizationTypeId: reqObj.organizationTypeId,
            companyTypeId: reqObj.companyTypeId,
            publicCompanyId: reqObj.publicCompanyId,
            organizationId: reqObj.organizationId,
            designation: reqObj.designation,
            email: reqObj.email,
            mobile: reqObj.mobile,
            description: reqObj?.description,
            cityId: reqObj.cityId,
            priorityLevel: reqObj.priorityLevel,
            imageUrl: reqObj?.imageUrl,
            imageName: reqObj?.imageName,
            imageType: reqObj?.imageType,
            lastModifiedBy: loginUserId,
            lastModifiedDate: new Date().toISOString(),
            createdBy: loginUserId,
          },
          {transaction: t}
        );
      }

      //#endregion

      //#region StakeHolder Approval Creation
      if (!reqObj.stakeHolderId) {
        await stakeHolderApprovalsModel.create(
          {
            requesterId: loginUserId,
            stakeHolderId: stakeholderResult.id,
            statusId: addReq.statusId,
            requestedDate: new Date().toISOString(),
            approverId: reqObj.mergedIds.length > 0 ? loginUserId : null,
            approvedDate:
              reqObj.mergedIds.length > 0 ? new Date().toISOString() : null,
          },
          {transaction: t}
        );
      }
      //#endregion

      //#region Stakeholder Links Creation
      if (reqObj.stakeHolderId) {
        await stakeHolderLinksModel.destroy({
          where: {
            stakeHolderId: reqObj.stakeHolderId,
          },
          transaction: t,
        });
      }
      if (reqObj.importantLinks && reqObj.importantLinks.length > 0) {
        const importantLinks = [];
        for (let index = 0; index < reqObj.importantLinks.length; index++) {
          const element = reqObj.importantLinks[index];
          const obj = {
            stakeHolderId: stakeholderResult.id,
            linkTypeId: element.typeId,
            url: element.url,
            lastModifiedBy: loginUserId,
            lastModifiedDate: new Date().toISOString(),
          };
          importantLinks.push(obj);
        }
        await stakeHolderLinksModel.bulkCreate(importantLinks, {
          transaction: t,
        });
      }
      //#endregion

      //commit transaction..
      await t.commit();
      logger.info(`${taskName}`, 'Transaction successfully committed');
      return stakeholderResult;
    } catch (error) {
      await t.rollback();
      logger.info(`${taskName}_ERROR_TRANSACTION_ROLLBACK`, error);
      throw error;
    }
  }
  //#endregion

  //#region findStakeholderByEmail
  public async findStakeholderByEmail(email: string) {
    const stakeHolder = await stakeHolderModel.findOne({
      where: {email: email},
    });
    return stakeHolder;
  }
  //#endregion

  //#region findStakeholderByPhoneNumber
  public async findStakeholderByPhoneNumber(phoneNumber: string) {
    const stakeHolder = await stakeHolderModel.findOne({
      where: {mobile: phoneNumber},
    });
    return stakeHolder;
  }
  //#endregion
  //#region findStakeholderByName
  public async findStakeholderByName(
    fullName: string,
    organization: number,
    designation: string
  ) {
    const stakeHolder = await stakeHolderModel.findOne({
      where: {
        fullName: fullName,
        organizationId: organization,
        designation: {[Op.iLike]: designation},
      },
    });
    return stakeHolder;
  }
  //#endregion
  //#region  getAllStakeHolders
  public async getAllStakeHolders() {
    const stakeHolderList = await stakeHolderModel.findAll();
    return stakeHolderList;
  }
  //#endregion

  //#region  getStatusCountById
  async getStatusCountById(
    userId: number | null,
    statusId: number,
    isFilteredForCurrentYear?: boolean | null
  ) {
    if (isFilteredForCurrentYear) {
      if (!userId) {
        const stakeHoldersStatusCount = await stakeHolderApprovalsModel.findAndCountAll(
          {
            where: {
              [Op.and]: [
                {statusId: statusId},
                {
                  requestedDate: {
                    [Op.lte]: new Date(new Date().getFullYear(), 11, 31),
                    [Op.gte]: new Date(new Date().getFullYear(), 0, 1),
                  },
                },
              ],
            },
          }
        );
        return stakeHoldersStatusCount;
      }
      const stakeHoldersStatusCount = await stakeHolderApprovalsModel.findAndCountAll(
        {
          where: {
            [Op.and]: [
              {requesterId: userId},
              {statusId: statusId},
              {
                requestedDate: {
                  [Op.lte]: new Date(new Date().getFullYear(), 11, 31),
                  [Op.gte]: new Date(new Date().getFullYear(), 0, 1),
                },
              },
            ],
          },
        }
      );
      return stakeHoldersStatusCount;
    } else {
      if (!userId) {
        const stakeHoldersStatusCount = await stakeHolderApprovalsModel.findAndCountAll(
          {
            where: {statusId: statusId},
          }
        );
        return stakeHoldersStatusCount;
      }
      const stakeHoldersStatusCount = await stakeHolderApprovalsModel.findAndCountAll(
        {
          where: {requesterId: userId, statusId: statusId},
        }
      );
      return stakeHoldersStatusCount;
    }
  }
  //#endregion

  //#region  getStatusCountByStakeHolderId
  async getStatusCountByStakeHolderId(
    userId: number | null,
    statusId: number,
    stakeHolderIds: Array<number>
  ) {
    if (!userId) {
      const stakeHoldersStatusCount = await stakeHolderApprovalsModel.findAndCountAll(
        {
          where: {
            statusId: statusId,
            stakeHolderId: stakeHolderIds,
          },
        }
      );
      return stakeHoldersStatusCount;
    }
    const stakeHoldersStatusCount = await stakeHolderApprovalsModel.findAndCountAll(
      {
        where: {
          requesterId: userId,
          statusId: statusId,
          stakeHolderId: stakeHolderIds,
        },
      }
    );
    return stakeHoldersStatusCount;
  }
  //#endregion

  //#region getStakeholdersCountById
  async getStakeholdersCountById(
    userId: number | null,
    isFilteredForCurrentYear?: boolean | null
  ) {
    if (isFilteredForCurrentYear) {
      if (!userId) {
        const stakeholdersCount = await stakeHolderModel.findAndCountAll({
          where: {
            createdAt: {
              [Op.lte]: new Date(new Date().getFullYear(), 11, 31),
              [Op.gte]: new Date(new Date().getFullYear(), 0, 1),
            },
          },
        });
        return stakeholdersCount;
      }
      const stakeholdersCount = await stakeHolderModel.findAndCountAll({
        where: {
          createdBy: userId,
          createdAt: {
            [Op.lte]: new Date(new Date().getFullYear(), 11, 31),
            [Op.gte]: new Date(new Date().getFullYear(), 0, 1),
          },
        },
      });
      return stakeholdersCount;
    } else {
      if (!userId) {
        const stakeholdersCount = await stakeHolderModel.findAndCountAll();
        return stakeholdersCount;
      }
      const stakeholdersCount = await stakeHolderModel.findAndCountAll({
        where: {createdBy: userId},
      });
      return stakeholdersCount;
    }
  }
  //#endregion

  //#region filterStakeholder
  async filterStakeholder(filterObj: filterDashboardReq) {
    let filterStakeholder: any = {
      count: 0,
      rows: [],
    };
    if (filterObj.userId === null) {
      filterStakeholder = await stakeHolderModel.findAndCountAll();
      if (filterObj.createdByIds.length > 0) {
        filterStakeholder = await stakeHolderModel.findAndCountAll({
          where: {
            id: filterStakeholder.rows.map((user: any) => user.id).map(Number),
            lastModifiedBy: filterObj.createdByIds,
          },
        });
      }
      if (filterObj.cityIds.length > 0) {
        filterStakeholder = await stakeHolderModel.findAndCountAll({
          where: {
            id: filterStakeholder.rows.map((user: any) => user.id).map(Number),
            cityId: filterObj.cityIds,
          },
        });
      }
      if (filterObj.organizationTypeIds.length > 0) {
        filterStakeholder = await stakeHolderModel.findAndCountAll({
          where: {
            id: filterStakeholder.rows.map((user: any) => user.id).map(Number),
            organizationTypeId: filterObj.organizationTypeIds,
          },
        });
      }
      if (filterObj.organizationIds.length > 0) {
        filterStakeholder = await stakeHolderModel.findAndCountAll({
          where: {
            id: filterStakeholder.rows.map((user: any) => user.id).map(Number),
            organizationId: filterObj.organizationIds,
          },
        });
      }
    } else {
      filterStakeholder = await stakeHolderModel.findAndCountAll({
        where: {lastModifiedBy: filterObj.userId},
      });
      if (filterObj.cityIds.length > 0) {
        filterStakeholder = await stakeHolderModel.findAndCountAll({
          where: {
            id: filterStakeholder.rows.map((user: any) => user.id).map(Number),
            cityId: filterObj.cityIds,
          },
        });
      }
      if (filterObj.organizationTypeIds.length > 0) {
        filterStakeholder = await stakeHolderModel.findAndCountAll({
          where: {
            id: filterStakeholder.rows.map((user: any) => user.id).map(Number),
            organizationTypeId: filterObj.organizationTypeIds,
          },
        });
      }
      if (filterObj.organizationIds.length > 0) {
        filterStakeholder = await stakeHolderModel.findAndCountAll({
          where: {
            id: filterStakeholder.rows.map((user: any) => user.id).map(Number),
            organizationId: filterObj.organizationIds,
          },
        });
      }
    }
    return filterStakeholder;
  }
  //#endregion

  //#region  updateStakeholderStatus
  async updateStakeholderStatus(
    stakeHolderId: number,
    statusId: number,
    approverId: number,
    comment: string
  ) {
    let findUpdateStakeHolderApproval = await stakeHolderApprovalsModel.findOne(
      {
        where: {stakeHolderId: stakeHolderId},
      }
    );
    if (!findUpdateStakeHolderApproval) {
      return null;
    }
    let findUpdateStakeHolder = await stakeHolderModel.findOne({
      where: {id: stakeHolderId},
    });
    if (!findUpdateStakeHolder) {
      return null;
    }
    findUpdateStakeHolderApproval = await findUpdateStakeHolderApproval.update({
      statusId: statusId,
      approverId: approverId,
      approvedDate: new Date().toISOString(),
    });
    findUpdateStakeHolder = await findUpdateStakeHolder.update({
      acceptOrRejectComment: comment,
      lastModifiedDate: new Date().toISOString(),
    });

    return findUpdateStakeHolder;
  }
  //#endregion

  //#region  getStakeHolderById
  async getStakeHolderById(stakeHolderId: number, userId: number) {
    let stakeHolderQuery = stakeHolderProvider.getStakeHoldersListDetails(
      userId
    );
    stakeHolderQuery = `${stakeHolderQuery} WHERE "stakeHolder"."id" = ${stakeHolderId}`;
    const stakeHolder = await sequelize.query(stakeHolderQuery, {
      type: QueryTypes.SELECT,
    });
    const stakeHolderLinksQuery = stakeHolderLinksProvider.getStakeholderLinks(
      stakeHolderId
    );
    const stakeHolderLinks = await sequelize.query(stakeHolderLinksQuery, {
      type: QueryTypes.SELECT,
    });
    const resp: any = {
      stakeHolder,
      stakeHolderLinks,
    };
    return resp;
  }
  //#endregion

  //#region getStakeholderLinksInfoQuery
  async getStakeholderLinksInfoQuery(stakeHolderId: number) {
    const stakeHolderLinksQuery = stakeHolderLinksProvider.getStakeholderLinks(
      stakeHolderId
    );
    const stakeHolderLinks = await sequelize.query(stakeHolderLinksQuery, {
      type: QueryTypes.SELECT,
    });
    return stakeHolderLinks;
  }
  //#endregion

  //#region getStakeholderForMergingQuery
  async getStakeholderForMergingQuery(
    stakeholderIds: Array<number>,
    userId: number
  ) {
    const stakeholderIdsMerged = stakeholderIds.join(',');
    let query = stakeHolderProvider.getStakeHoldersListDetails(userId);
    query = `${query} WHERE "stakeHolder"."id" in (${stakeholderIdsMerged})`;
    const result = await sequelize.query(query, {type: QueryTypes.SELECT});
    return result;
  }
  //#endregion

  //#region disableStakeholderQuery
  async disableStakeholderQuery(stakeholderId: number) {
    let disableSH = await stakeHolderModel.findOne({
      where: {id: stakeholderId},
    });

    disableSH = await disableSH.update({
      isActive: false,
    });

    return disableSH;
  }
  //#endregion

  //#region enableStakeholderQuery
  async enableStakeholderQuery(stakeholderId: number) {
    let enableSH = await stakeHolderModel.findOne({
      where: {id: stakeholderId},
    });

    enableSH = await enableSH.update({
      isActive: true,
    });

    return enableSH;
  }
  //#endregion

  //#region checkStakeholderStatus
  async checkStakeholderStatus(stakeHolderIds: Array<number>) {
    const getStatus = await stakeHolderModel.findAll({
      where: {id: stakeHolderIds},
      attributes: ['isActive'],
    });
    return getStatus;
  }
  //#endregion
}
