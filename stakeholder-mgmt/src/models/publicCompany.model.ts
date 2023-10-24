import {DataTypes} from 'sequelize';
import sequelize from '../config/sequelize';

export const publicCompanyModel = sequelize.define(
  'publicCompany',
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
    compTypeId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'companyType',
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
