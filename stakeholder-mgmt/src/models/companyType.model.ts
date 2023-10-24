import {DataTypes} from 'sequelize';
import sequelize from '../config/sequelize';

export const companyTypeModel = sequelize.define(
  'companyType',
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
    orgTypeId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'organizationType',
        key: 'id',
      },
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
