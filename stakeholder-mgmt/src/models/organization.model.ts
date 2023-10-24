import {DataTypes} from 'sequelize';
import sequelize from '../config/sequelize';

export const organizationModel = sequelize.define(
  'organization',
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
    companyTypeId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'publicCompany',
        key: 'id',
      },
    },
    publicCompanyId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'publicCompany',
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
