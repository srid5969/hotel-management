import {DataTypes} from 'sequelize';
import sequelize from '../config/sequelize';

export const stakeHolderApprovalsModel = sequelize.define(
  'stakeHolderApprovals',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.BIGINT,
    },
    requesterId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    approverId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'user',
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
    statusId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'status',
        key: 'id',
      },
    },
    approvedDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    requestedDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);
