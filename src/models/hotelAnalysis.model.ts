import {DataTypes} from 'sequelize';
import sequelize from './../config/sequelize';

export const HotelSessionData = sequelize.define(
  'HotelSessionData',
  {
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
    department: DataTypes.STRING,
    session: DataTypes.STRING,
    foodCov: DataTypes.INTEGER,
    foodAmd: DataTypes.INTEGER,
    foodAvg: DataTypes.INTEGER,
    liqCov: DataTypes.INTEGER,
    liqAmd: DataTypes.INTEGER,
    liqAvg: DataTypes.INTEGER,
    softDrinkCov: DataTypes.INTEGER,
    softDrinkAmd: DataTypes.INTEGER,
    softDrinkAvg: DataTypes.INTEGER,
    tobaccoCov: DataTypes.INTEGER,
    tobaccoAmd: DataTypes.INTEGER,
    tobaccoAvg: DataTypes.INTEGER,
    othersCov: DataTypes.INTEGER,
    othersAmd: DataTypes.INTEGER,
    othersAvg: DataTypes.INTEGER,
    totalCov: DataTypes.INTEGER,
    totalAmd: DataTypes.INTEGER,
    totalAvg: DataTypes.INTEGER,
  },
  {
    tableName: 'HotelAnalysis', // Table name in the database
  }
);
