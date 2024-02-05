import { DataTypes } from 'sequelize';
import sequelize from './../config/sequelize';

export const HotelModel = sequelize.define(
  'HotelModel',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement:true,
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

    country: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    state: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      city: {
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
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      flagging_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },aggrement_validity: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      segment: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

  
  },
  {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    paranoid:true,
    tableName:'hotel_master'
  }
);
