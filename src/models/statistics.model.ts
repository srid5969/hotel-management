import {DataTypes} from 'sequelize';
import sequelize from './../config/sequelize';

export const Statistics = sequelize.define(
  'Statistics',
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
    reportDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('Market Segment', 'Business Source'),
      allowNull: false,
    },
    source: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mod_occ: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    mod_occPercent: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    mod_pax: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    mod_paxPercent: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    mod_rate: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    mod_arr: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    mod_arp: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    yod_occ: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    yod_occPercent: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    yod_pax: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    yod_paxPercent: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    yod_rate: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    yod_arr: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    yod_arp: {
      type: DataTypes.FLOAT,
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
