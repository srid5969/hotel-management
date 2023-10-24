import {DataTypes} from 'sequelize';
import sequelize from '../config/sequelize';

export const userModel = sequelize.define(
  'user',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.BIGINT,
    },
    emailId: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    azureId: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    entityId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'entity',
        key: 'id',
      },
    },
    designationId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'designation',
        key: 'id',
      },
    },
    fullName: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    isPasswordSet: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    mobile: {
      type: DataTypes.STRING(50),
      allowNull: false,
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
    inviteToken: {
      type: DataTypes.STRING(4000),
      allowNull: true,
    },
    inviteTokenCreationTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    priorityLevel: {
      type: DataTypes.STRING,
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
    isUserCreationInviteSent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    accessToken: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    refreshToken: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isLogin: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    passwordResetVerificationId: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    passwordResetTokenValidity: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    sessionId: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);
