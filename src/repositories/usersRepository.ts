import {BaseError} from 'sequelize';
import {UserModel} from '../models/user.model';
import {
  UserCreationAttributes,
  UserEditAttributes,
} from '../business_objects/user';
import {InternalError, NotFoundError} from '../util/app-error';

export class UserRepository {
  public async registerUser(user: UserCreationAttributes) {
    try {
      const saveUser = await UserModel.create(user);
      return saveUser.toJSON(); // return saved user to client
    } catch (error) {
      if (error instanceof BaseError) throw new InternalError(error.message);
      throw new InternalError('Unexpected error');
    }
  }
  public async getUserById(id: string) {
    try {
      const user = await UserModel.findByPk(id);
      return user; // return saved user to client
    } catch (error) {
      if (error instanceof BaseError) throw new InternalError(error.message); // sequelize base error
      throw new InternalError('Unexpected error');
    }
  }
  public async updateUserById(id: string, data: UserEditAttributes) {
    try {
      const [affectedCount] = await UserModel.update(data, {where: {id: id}});
      if (affectedCount == 0) throw new NotFoundError('User not found');
      const user = await this.getUserById(id);
      return user; // return saved user to client
    } catch (error) {
      if (error instanceof BaseError) throw new InternalError(error.message); // sequelize base error
      throw error;
    }
  }
  public async deleteUserById(id: string) {
    try {
      const deleted = await UserModel.destroy({where: {id}});
      if (deleted > 0)
        return Promise.resolve({message: 'Successfully deleted'});
      throw new NotFoundError('User not found');
    } catch (error) {
      if (error instanceof BaseError) throw new InternalError(error.message); // sequelize base error
      throw error;
    }
  }
  public async getAllUsers(limit: number = 20, offset: number = 0) {
    try {
      const users = await UserModel.findAll({limit, offset});
      return users; // return saved user to client
    } catch (error) {
      if (error instanceof BaseError) throw new InternalError(error.message); // sequelize base error
      throw new InternalError('Unexpected error');
    }
  }
}
