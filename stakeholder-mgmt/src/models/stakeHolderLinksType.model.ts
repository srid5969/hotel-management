import {DataTypes} from 'sequelize';
import sequelize from '../config/sequelize';

export const stakeHolderLinksTypeModel = sequelize.define(
  'stakeHolderLinksType',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.BIGINT,
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(4000),
      allowNull: true,
    },
    code: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);
