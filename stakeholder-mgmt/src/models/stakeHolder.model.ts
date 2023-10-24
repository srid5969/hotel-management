import {DataTypes} from 'sequelize';
import sequelize from '../config/sequelize';

export const stakeHolderModel = sequelize.define(
  'stakeHolder',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.BIGINT,
    },
    fullName: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    organizationTypeId: {
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
        model: 'companyType',
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
    organizationId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'organization',
        key: 'id',
      },
    },
    designation: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    mobile: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    cityId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'city',
        key: 'id',
      },
    },
    priorityLevel: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    imageUrl: {
      type: DataTypes.STRING(4000),
      allowNull: true,
    },
    imageName: {
      type: DataTypes.STRING(4000),
      allowNull: true,
    },
    imageType: {
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
    createdBy: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    acceptOrRejectComment: {
      type: DataTypes.STRING(4000),
      allowNull: true,
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
