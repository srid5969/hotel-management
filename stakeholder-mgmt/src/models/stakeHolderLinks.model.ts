import {DataTypes} from 'sequelize';
import sequelize from '../config/sequelize';

export const stakeHolderLinksModel = sequelize.define(
  'stakeHolderLinks',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.BIGINT,
    },
    linkTypeId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'stakeHolderLinksType',
        key: 'id',
      },
    },
    stakeHolderId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'stakeHolder',
        key: 'id',
      },
    },
    url: {
      type: DataTypes.STRING(4000),
      allowNull: false,
    },
    lastModifiedDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    lastModifiedBy: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);
