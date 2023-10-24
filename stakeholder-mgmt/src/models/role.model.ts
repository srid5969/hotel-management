import {DataTypes} from 'sequelize';
import sequelize from '../config/sequelize';

export const roleModel = sequelize.define(
  'role',
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
    code: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING(4000),
      allowNull: true,
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
