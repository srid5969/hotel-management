import {DataTypes} from 'sequelize';
import sequelize from '../config/sequelize';

export const corporateEmailsModel = sequelize.define(
  'corporateEmails',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.BIGINT,
    },
    email: {
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
