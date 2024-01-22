import {DataTypes} from 'sequelize';
import sequelize from './../config/sequelize';
import { HotelModel } from './hotel.model';

export const HotelSales = sequelize.define(
  'HotelSales',
  {
    id: {
      type: DataTypes.UUIDV4,
      autoIncrement: true,
      primaryKey: true,
    },
    hotel: {
      type: DataTypes.INTEGER,
      references:{
        key:'id',
        model:HotelModel
      },
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    billAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0.0,
    },
    discount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0.0,
    },
    food: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0.0,
    },
    liquor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0.0,
    },
    softDrinks: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0.0,
    },
    tobacco: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0.0,
    },
    advance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0.0,
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
