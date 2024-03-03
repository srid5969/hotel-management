import {HotelModel} from './../models/hotel.model';
import {getYear} from 'date-fns';
import {Revenues} from '../models/revenue.model';
import {AppError, InternalError} from '../util/app-error';
import sequelize from './../config/sequelize';
import {reportSqlQueries} from './../sql-queries/getReport.queries';
import {RevenueData} from './../util/html-template/over-all-revenue.template-html';

import {QueryTypes} from 'sequelize';
import {UnitWiseRevenueSubDocument} from './../util/html-template/unit-wise-revenue.html-template';
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
    const data = await sequelize.query(
      reportSqlQueries.getOverAllRevenuePerHotelByMonth(month, hotel, [
        currentYear - 2,
        currentYear - 1,
        currentYear,
      ]),
      {type: QueryTypes.SELECT}
    );
    return data as RevenueData[];
  }
  public async getOverAllRevenueOfHotelByYear(
    hotel: string
  ): Promise<RevenueData[]> {
    const currentYear = getYear(new Date());
    const data = await sequelize.query(
      reportSqlQueries.getOverAllRevenuePerHotelByYear(hotel, [
        currentYear - 2,
        currentYear - 1,
        currentYear,
      ]),
      {type: QueryTypes.SELECT}
    );
    return data as RevenueData[];
  }
  public async getUnitWiseReport(cityId: string) {
    const currentYear = getYear(new Date());
    const [hotels, tyData, lyData] = await Promise.all([
      HotelModel.findAll({where: {CityID: cityId}}),
      sequelize.query(
        reportSqlQueries.unitWiseReportGetQuery(cityId, currentYear),
        {type: QueryTypes.SELECT}
      ),
      sequelize.query(
        reportSqlQueries.unitWiseReportGetQuery(cityId, currentYear - 1),
        {type: QueryTypes.SELECT}
      ),
    ]);
    return hotels.map(data => {
      const tyHotelRevData: any = tyData.find(
        (t: any): boolean =>
          t.hotelId == data.toJSON().id && t.type == 'History'
      );
      const lyHotelRevData: any = tyData.find(
        (t: any): boolean =>
          t.hotelId == data.toJSON().id && t.type == 'History'
      );
      const tyHotelBudgetData: any = tyData.find(
        (t: any): boolean =>
          t.hotelId == data.toJSON().id && t.type == 'ForeCast'
      );
      return {
        hotel: data.toJSON().hotel_name,
        FnBRev: {
          budget: tyHotelBudgetData?.fnbRev || 0,
          goly: 0,
          ly: lyHotelRevData?.fnbRev || 0,
          ty: tyHotelRevData?.fnbRev || 0,
          var_vs_budget:
            (tyHotelRevData?.fnbRev || 0) - (tyHotelBudgetData?.fnbRev || 0),
        },
        otherRev: {
          budget: tyHotelBudgetData?.otherRevenue || 0,
          goly: 0,
          ly: lyHotelRevData?.otherRevenue || 0,
          ty: tyHotelRevData?.otherRevenue || 0,
          var_vs_budget:
            (tyHotelRevData?.otherRevenue || 0) -
            (tyHotelBudgetData?.otherRevenue || 0),
        },
        roomRev: {
          budget: tyHotelBudgetData?.roomRevenue || 0,
          goly: 0,
          ly: lyHotelRevData?.roomRevenue || 0,
          ty: tyHotelRevData?.roomRevenue || 0,
          var_vs_budget:
            (tyHotelRevData?.roomRevenue || 0) -
            (tyHotelBudgetData?.roomRevenue || 0),
        },
        totalRev: {
          budget: tyHotelBudgetData?.total || 0,
          goly: 0,
          ly: lyHotelRevData?.total || 0,
          ty: tyHotelRevData?.total || 0,
          var_vs_budget:
            (tyHotelRevData?.total || 0) - (tyHotelBudgetData?.total || 0),
        },
      } as {
        hotel: string;
        roomRev: Omit<UnitWiseRevenueSubDocument, 'pdi'>;
        FnBRev: Omit<UnitWiseRevenueSubDocument, 'pdi'>;
        otherRev: Omit<UnitWiseRevenueSubDocument, 'pdi'>;
        totalRev: UnitWiseRevenueSubDocument;
      };
    });
  }
}
