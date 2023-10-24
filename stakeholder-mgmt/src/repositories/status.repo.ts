import {statusModel} from '../models/status.model';
import {Op} from 'sequelize';

export class StatusRepository {
  async getStatus(code: string, type: string) {
    const temp: any = await statusModel.findOne({
      where: {code: code, type: type},
    });
    return temp;
  }
  async getStatusList() {
    const getStatus = await statusModel.findAll({
      where: {code: {[Op.notIn]: ['AUTO_APPROVED', 'SAVE_AS_DRAFT']}},
    });
    return getStatus;
  }
}
