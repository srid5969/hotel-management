import {DataTypes} from 'sequelize';
import sequelize from '../config/sequelize';

export const UserModel = sequelize.define(
  'UserModel',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    e_mail: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    mobile: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    first_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    last_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    emp_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    department: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    hotel_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    group_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    password: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    twoFactorAuthentication: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    user_status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isactive: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    paranoid: true,
    tableName: 'Users',
  }
);
