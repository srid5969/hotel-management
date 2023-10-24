import {entityModel} from '../models/entity.model';
import {Op, Sequelize} from 'sequelize';
import {
  createEntityReq,
  disableEntityReq,
  updateEntityReq,
} from '../business_objects/entity';
import {userModel} from '../models/user.model';

export class EntityRepository {
  async checkDomain(domainName: string) {
    const domain = await entityModel.findOne({
      where: {domain: {[Op.iLike]: domainName}, isActive: true},
    });
    return domain;
  }
  async getEntityList() {
    const result = await entityModel.findAll({
      where: {isActive: true},
    });
    return result;
  }
  async getEntityLookupList() {
    const result = await entityModel.findAll({
      include: [
        {
          model: userModel,
          as: 'users',
          on: Sequelize.literal('entityModel.lastModifiedBy = user.id'),
        },
      ],
      order: [['lastModifiedDate', 'DESC']],
    });
    return result;
  }
  async getEntityLookupbyId(id: number) {
    const result = await entityModel.findAll({
      where: {id: id},
    });
    return result;
  }
  async getEntitybyId(id: number) {
    const result: any = await entityModel.findOne({
      where: {id: id},
    });
    return result;
  }

  async createEntity(reqObj: createEntityReq) {
    const createEntityResult = await entityModel.create({
      name: reqObj.name,
      domain: reqObj.domain,
      lastModifiedBy: reqObj.userId,
      lastModifiedDate: new Date().toISOString(),
    });
    return createEntityResult;
  }

  async disableEntity(reqObj: disableEntityReq) {
    const disableEntityResult = await entityModel.update(
      {
        isActive: false,
        lastModifiedBy: reqObj.userId,
        lastModifiedDate: new Date().toISOString(),
      },
      {
        where: {id: reqObj.entityIds},
      }
    );
    return disableEntityResult;
  }

  async updateEntity(reqObj: updateEntityReq) {
    const updateEntityResult = await entityModel.update(
      {
        isActive: reqObj.isActive,
        lastModifiedBy: reqObj.userId,
        lastModifiedDate: new Date().toISOString(),
        name: reqObj.name,
        domain: reqObj.domain,
      },
      {
        where: {id: reqObj.entityId},
      }
    );
    return updateEntityResult;
  }
  //#region findentityByName
  public async findEntityByName(name: string, domain: string) {
    const entity = await entityModel.findOne({
      where: {[Op.or]: [{name: name}, {domain: domain}]},
    });
    return entity;
  }
  //#endregion
}
