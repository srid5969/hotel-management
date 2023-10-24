import {DataTypes} from 'sequelize';
import sequelize from '../config/sequelize';

export const priorityLevelModel = sequelize.define(
  'priorityLevel',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.BIGINT,
    },
    priority: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    level: {
      type: DataTypes.STRING(50),
      allowNull: false,
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
