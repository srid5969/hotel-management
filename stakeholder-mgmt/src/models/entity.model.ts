import {DataTypes} from 'sequelize';
import sequelize from '../config/sequelize';

export const entityModel = sequelize.define(
  'entity',
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
    domain: {
      type: DataTypes.STRING(200),
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
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    freezeTableName: true,
  }
);
