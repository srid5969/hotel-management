import {DataTypes} from 'sequelize';
import sequelize from '../config/sequelize';

export const cityModel = sequelize.define(
  'city',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.BIGINT,
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    cityId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'country',
        key: 'id',
      },
    },
    lastModifiedDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    lastModifiedBy: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);
