import {getYear} from 'date-fns';
import {Revenues} from '../models/revenue.model';
import {AppError, InternalError} from '../util/app-error';
import sequelize from './../config/sequelize';
import {reportSqlQueries} from './../sql-queries/getReport.queries';
import {RevenueData} from './../util/html-template/over-all-revenue.template-html';

import {QueryTypes} from 'sequelize';
export class RevenueRepository {
  public async importHistoryAndForecastRevenueData(data: {
    forecast: {
      date: number;
      fitRnt: number;
      totalOcc: number;
      avl: number;
      oos: number;
      occPercent: number;
      avgRate: number;
      roomRev: number;
      fnbRev: number;
      otherRev: number;
      noPerson: number;
    }[];
    history: {
      date: number;
      fitRnt: number;
      totalOcc: number;
      avl: number;
      oos: number;
      occPercent: number;
      avgRate: number;
      roomRev: number;
      fnbRev: number;
      otherRev: number;
      noPerson: number;
    }[];
    hotel: string;
    hotelId: string;
    username: string;
    userId: string;
    reportDate: string | Date;
  }) {
    const t = await sequelize.transaction();
    try {
      await Promise.all(
        data.forecast.map(async revenue => {
          await Revenues.destroy({
            where: {
              hotelId: data.hotelId,
              date: revenue.date,
              type: 'ForeCast',
            },
            transaction: t,
          });
          await Revenues.create(
            {
              ...revenue,
              reportDate: data.reportDate,
              hotel: data.hotel,
              username: data.username,
              userId: data.userId,
              hotelId: data.hotelId,
              type: 'ForeCast',
            },
            {transaction: t}
          );
        })
      );
      await Promise.all(
        data.history.map(async revenue => {
          await Revenues.destroy({
            where: {
              hotelId: data.hotelId,
              date: revenue.date,
              type: 'History',
            },
            transaction: t,
          });
          await Revenues.create({
            ...revenue,
            reportDate: data.reportDate,
            hotel: data.hotel,
            username: data.username,
            userId: data.userId,
            hotelId: data.hotelId,
            type: 'History',
          }),
            {transaction: t};
        })
      );
      await t.commit();
    } catch (error) {
      await t.rollback();
      if (error instanceof AppError) throw error;
      throw new InternalError('Unexpected Error ');
    }
  }

  public async getOverAllRevenueOfHotelByMonth(
    hotel: string,
    month: string
  ): Promise<RevenueData[]> {
    const currentYear = getYear(new Date());
    console.log('in repo');
    const data = await sequelize.query(
      reportSqlQueries.getOverAllRevenuePerHotelByMonth(month, hotel, [
        currentYear - 2,
        currentYear - 1,
        currentYear,
      ]),
      {type: QueryTypes.SELECT}
    );
    console.log('got result');
    return data as RevenueData[];
  }
}
