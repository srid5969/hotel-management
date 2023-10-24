import {DataTypes} from 'sequelize';
import sequelize from '../config/sequelize';

export const meetingFilesModel = sequelize.define(
  'meetingFiles',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.BIGINT,
    },
    meetingId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'meeting',
        key: 'id',
      },
    },
    fileName: {
      type: DataTypes.STRING(4000),
      allowNull: false,
    },
    fileType: {
      type: DataTypes.STRING(4000),
      allowNull: false,
    },
    fileUrl: {
      type: DataTypes.STRING(4000),
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
