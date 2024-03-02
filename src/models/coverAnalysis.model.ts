import {DataTypes} from 'sequelize';
import sequelize from './../config/sequelize';

export const CoverAnalysisReportMasterModel = sequelize.define(
  'cover_analysis_master',
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
    department: {
      type: DataTypes.STRING,
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

export const CoverAnalysisReportsModel = sequelize.define(
  'cover_analysis_reports',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    analysis: {
      type: DataTypes.INTEGER,
      references: {
        model: CoverAnalysisReportMasterModel,
        key: 'id',
      },
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM(
        'session_total',
        'outlet_total',
        'resident',
        'non_resident'
      ),
    },
    foodCov: {type: DataTypes.INTEGER, defaultValue: 0},
    foodAmd: {type: DataTypes.INTEGER, defaultValue: 0},
    foodAvg: {type: DataTypes.INTEGER, defaultValue: 0},
    liqCov: {type: DataTypes.INTEGER, defaultValue: 0},
    liqAmd: {type: DataTypes.INTEGER, defaultValue: 0},
    liqAvg: {type: DataTypes.INTEGER, defaultValue: 0},
    softDrinkCov: {type: DataTypes.INTEGER, defaultValue: 0},
    softDrinkAmd: {type: DataTypes.INTEGER, defaultValue: 0},
    softDrinkAvg: {type: DataTypes.INTEGER, defaultValue: 0},
    tobaccoCov: {type: DataTypes.INTEGER, defaultValue: 0},
    tobaccoAmd: {type: DataTypes.INTEGER, defaultValue: 0},
    tobaccoAvg: {type: DataTypes.INTEGER, defaultValue: 0},
    othersCov: {type: DataTypes.INTEGER, defaultValue: 0},
    othersAmd: {type: DataTypes.INTEGER, defaultValue: 0},
    othersAvg: {type: DataTypes.INTEGER, defaultValue: 0},
    totalCov: {type: DataTypes.INTEGER, defaultValue: 0},
    totalAmd: {type: DataTypes.INTEGER, defaultValue: 0},
    totalAvg: {type: DataTypes.INTEGER, defaultValue: 0},
  }
);
