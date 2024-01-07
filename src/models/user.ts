import { DataTypes } from 'sequelize';
import sequelize from './../config/sequelize';

export const UserModel = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    mobile: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    firstName: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    middleName: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    lastName: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    displayName: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    gender: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },

    dob: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    profilePicture: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    bio: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
  }
);
