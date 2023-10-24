import {Request, Response} from 'express';
import {constants} from '../../util/constants';
import {UserRepository} from '../../repositories/users.repo';
import {createEntityReq, updateEntityReq} from '../../business_objects/entity';
import {EntityRepository} from '../../repositories/entity.repo';
import {
  BadRequestResponse,
  InternalErrorResponse,
  logger,
  SuccessResponse,
  //   NoContentResponse,
} from '../../util';
import {entitiesProvider} from '../../sql-provider/getEntitiesList';
import sequelize from '../../config/sequelize';
import {QueryTypes} from 'sequelize';

export class EntityController {
  private static userRepo = new UserRepository();
  private static entityRepo = new EntityRepository();

  //#region createEntity
  static async createEntity(req: Request, res: Response) {
    const taskName = 'ADD_ENTITY';
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
      const dbUser = await EntityController.userRepo.findUserByAzureId(
        azureuserid.toString()
      );
      const reqObj: createEntityReq = {
        name: req.body.name,
        domain: req.body.domain,
        userId: dbUser.id,
      };
      const entityExists = await EntityController.entityRepo.findEntityByName(
        reqObj.name.trim(),
        reqObj.domain
      );
      if (entityExists || entityExists !== null) {
        logger.info(`${taskName}_ALREADY_EXISTS`, entityExists);
        const noResult = new BadRequestResponse(
          res,
          'A entity with this name already exists.'
        );
        return noResult.send();
      }
      const createEntity = await EntityController.entityRepo.createEntity(
        reqObj
      );
      if (!createEntity) {
        logger.info(`${taskName}_ERROR`, createEntity);
        const noRes = new BadRequestResponse(
          res,
          'Error occurred while creating entity.'
        );
        return noRes.send();
      }
      const success = new SuccessResponse(res, 'success', createEntity);
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

  //#region updateEntity
  static async updateEntity(req: Request, res: Response) {
    const taskName = 'DISABLE_ENTITY';
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
      const dbUser = await EntityController.userRepo.findUserByAzureId(
        azureuserid.toString()
      );
      const reqObj: updateEntityReq = {
        userId: dbUser.id,
        entityId: req.body.entityId,
        isActive: req.body.isActive,
        name: req.body.name,
        domain: req.body.domain,
      };
      // const disableEntity = await EntityController.entityRepo.disableEntity(
      //   reqObj
      // );
      const updateEntity = await EntityController.entityRepo.updateEntity(
        reqObj
      );
      if (!updateEntity) {
        logger.info(`${taskName}_ERROR`, updateEntity);
        const noRes = new BadRequestResponse(
          res,
          'Error occurred while updating entity.'
        );
        return noRes.send();
      }
      const success = new SuccessResponse(res, 'success', updateEntity);
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

  //#region getEntityList
  static async getEntityList(req: Request, res: Response) {
    const taskName = 'GET_ENTITY_LIST';
    logger.info(`${taskName}`, 'GET_REQUEST');
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
      //const getEntityList = await EntityController.entityRepo.getEntityLookupList();
      const getEntityListQuery = entitiesProvider.getAllEntitiesList();
      const getEntityList = await sequelize.query(getEntityListQuery, {
        type: QueryTypes.SELECT,
      });
      const success = new SuccessResponse(res, 'success', getEntityList);
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

  //#region getEntityList
  static async getEntitybyId(req: Request, res: Response) {
    const taskName = 'getEntitybyId';
    logger.info(`${taskName}`, 'GET_REQUEST');
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
      const {Id} = req.params;
      const getEntityListByIdQuery = entitiesProvider.getAllEntitiesListById(
        parseInt(Id)
      );
      const getEntityListById = await sequelize.query(getEntityListByIdQuery, {
        type: QueryTypes.SELECT,
      });
      // const getEntity = await EntityController.entityRepo.getEntityLookupbyId(
      //   parseInt(Id)
      // );
      const success = new SuccessResponse(res, 'success', getEntityListById);
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
