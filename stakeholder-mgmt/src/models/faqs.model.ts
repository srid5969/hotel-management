import {DataTypes} from 'sequelize';
import sequelize from '../config/sequelize';

export const faqsModel = sequelize.define(
  'faqs',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.BIGINT,
    },
    faqTypeId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'faqTypes',
        key: 'id',
      },
    },
    sortNumber: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    answer: {
      type: DataTypes.TEXT,
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
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    freezeTableName: true,
  }
);
