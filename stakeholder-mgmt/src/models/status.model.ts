import {DataTypes} from 'sequelize';
import sequelize from '../config/sequelize';

export const statusModel = sequelize.define(
  'status',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.BIGINT,
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(4000),
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);
