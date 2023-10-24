import {DataTypes} from 'sequelize';
import sequelize from '../config/sequelize';

export const organizationTypeModel = sequelize.define(
  'organizationType',
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
