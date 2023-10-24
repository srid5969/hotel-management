import {stakeHolderLinksTypeModel} from '../models/stakeHolderLinksType.model';
import {stakeHolderLinksModel} from '../models/stakeHolderLinks.model';
import {stakeHolderLinksProvider} from '../sql-provider/getStakeholderLinks';
import {QueryTypes} from 'sequelize';
import sequelize from '../config/sequelize';

export class StakeHolderLinksRepository {
  async getStakeHolderLinksList() {
    const getStakeHolderLinks = await stakeHolderLinksModel.findAll();
    return getStakeHolderLinks;
  }
  /**
   * getStakeHolderLinkTypes
   * @returns
   */
  async getStakeHolderLinkTypes() {
    const result = await stakeHolderLinksTypeModel.findAll();
    return result;
  }

  async getStakeHolderLinkTypeById(code: string) {
    const result = await stakeHolderLinksTypeModel.findOne({
      where: {code: code},
    });
    return result;
  }

  async getStakeHolderLinks(typeId: number) {
    const stakeHolderLinksQuery = stakeHolderLinksProvider.getStakeholderLinkedInLink(
      typeId
    );
    const getStakeHolderLinks = await sequelize.query(stakeHolderLinksQuery, {
      type: QueryTypes.SELECT,
    });
    return getStakeHolderLinks;
  }

  async getStakeholderLinksById(stakeHolderId: number) {
    const getStakeHolderLinks = await stakeHolderLinksModel.findAll({
      where: {stakeHolderId: stakeHolderId},
    });
    return getStakeHolderLinks;
  }
}
