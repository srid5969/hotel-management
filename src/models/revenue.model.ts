import {DataTypes} from 'sequelize';
import sequelize from './../config/sequelize';

export const Revenues = sequelize.define(
  'Revenue',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    hotel: {
      type: DataTypes.STRING,
    },
    hotelId: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.ENUM('History', 'ForeCast'),
    },
    date: {
      type: DataTypes.DATEONLY,
    },
    fitRnt: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
    grpRnt: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
    totalOcc: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
    avl: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
    oos: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
    occPercent: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
    avgRate: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
    roomRev: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
    fnbRev: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
    otherRev: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
    noPerson: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    paranoid: true,
  }
);
