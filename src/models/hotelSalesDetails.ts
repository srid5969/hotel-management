import {DataTypes} from 'sequelize';
import sequelize from './../config/sequelize';
import {HotelSales} from './hotelSales.model';
import {MealType} from '../util/enum';

export const HotelSalesDetails = sequelize.define(
  'HotelSalesDetails',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    hotel: {
      type: DataTypes.INTEGER,
      references: {
        model: HotelSales,
        key: 'id',
      },
    },
    mealType: {
      type: DataTypes.STRING,
      values: [
        MealType.Breakfast,
        MealType.Dinner,
        MealType.Lunch,
        MealType.General,
      ],
    },
    orderId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tableNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kot: {
      type: DataTypes.STRING,
      allowNull: false,
      set(val) {
        this.setDataValue('kot', JSON.stringify(val || []));
      },
    },
    covfx: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fod: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
    liq: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
    sfd: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
    smk: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
    oth: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
    salesAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
    cgt: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
    sgt: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
    rof: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    disc: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },

    netAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },
    setAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.0,
    },

    setMode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
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
