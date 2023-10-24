import {Op} from 'sequelize';
import {roleModel} from '../models/role.model';
export class RoleRepository {
  async getRoleList(
    isAllRolesRequired: boolean,
    notRequiredRoles: string[] | null
  ) {
    let roleResult;
    if (isAllRolesRequired) {
      roleResult = await roleModel.findAll();
    } else {
      roleResult = await roleModel.findAll({
        where: {code: {[Op.notIn]: notRequiredRoles}},
      });
    }

    return roleResult;
  }
}
