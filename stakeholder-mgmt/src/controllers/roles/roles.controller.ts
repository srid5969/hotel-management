import {Request, Response} from 'express';
import {constants} from '../../util/constants';
import {RoleRepository} from '../../repositories/role.repo';
import {
  BadRequestResponse,
  InternalErrorResponse,
  logger,
  SuccessResponse,
  //   NoContentResponse,
} from '../../util';
export class RolesController {
  static roleRepo = new RoleRepository();
  //#region getFaqs
  public static async getRoles(req: Request, res: Response): Promise<void> {
    const taskName = 'ROLES_LIST';
    logger.info(`${taskName}_REQ`, `GET_${taskName}`);
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
      const rolesList: any = await RolesController.roleRepo.getRoleList(
        true,
        null
      );
      if (!rolesList || rolesList.length <= 0) {
        logger.info(`${taskName}_DATA_NOT_FOUND`, JSON.stringify(rolesList));
        const noResult = new BadRequestResponse(res, 'No Role Found.');
        return noResult.send();
      }
      const success = new SuccessResponse(res, 'success', rolesList);
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
}
