import {DataTypes} from 'sequelize';
import sequelize from './../config/sequelize';

export const Revenues = sequelize.define(
  'Revenue',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    hotel: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.ENUM('History', 'ForeCast'),
    },
    date: {
      type: DataTypes.DATE,
    },
    fitRnt: {
      type: DataTypes.DECIMAL,
      defaultValue: 0.0,
    },
    grpRnt: {
      type: DataTypes.DECIMAL,
      defaultValue: 0.0,
    },
    totalOcc: {
      type: DataTypes.DECIMAL,
      defaultValue: 0.0,
    },
    avl: {
      type: DataTypes.DECIMAL,
      defaultValue: 0.0,
    },
    oos: {
      type: DataTypes.DECIMAL,
      defaultValue: 0.0,
    },
    occPercent: {
      type: DataTypes.DECIMAL,
      defaultValue: 0.0,
    },
    avgRate: {
      type: DataTypes.DECIMAL,
      defaultValue: 0.0,
    },
    roomRev: {
      type: DataTypes.DECIMAL,
      defaultValue: 0.0,
    },
    fnbRev: {
      type: DataTypes.DECIMAL,
      defaultValue: 0.0,
    },
    otherRev: {
      type: DataTypes.DECIMAL,
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
