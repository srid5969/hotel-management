import {DataTypes} from 'sequelize';
import sequelize from '../config/sequelize';

export const faqTypesModel = sequelize.define(
  'faqTypes',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.BIGINT,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING(2000),
      allowNull: false,
    },
    sortNumber: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    lastModifiedBy: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
  },
  {
    freezeTableName: true,
  }
);
