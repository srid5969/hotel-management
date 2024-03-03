import {DataTypes} from 'sequelize';
import sequelize from './../config/sequelize';

export const HotelModel = sequelize.define(
  'HotelModel',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    hotel_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    no_room: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    CountryID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    CountryName: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    StateID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    StateName: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    CityID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    CityName: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    HotelGroupId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    HotelGroupName: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    hotel_category: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    clasification: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    owner_company_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    aggrement_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    flagging_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    aggrement_validity: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    segment: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    sub_segment: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    tableName: 'hotel_master',
  }
);
