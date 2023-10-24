import {DataTypes} from 'sequelize';
import sequelize from '../config/sequelize';

export const templateModel = sequelize.define(
  'template',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.BIGINT,
    },
    templateType: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(4000),
      allowNull: true,
    },
    template: {
      type: DataTypes.STRING(20000),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);
