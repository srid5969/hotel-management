import {BaseError, Optional} from 'sequelize';
import {
  DailySalesReport,
  HolelMonthlyDataImportDTO,
} from './../business_objects/hotelSales';
import sequelize from './../config/sequelize';
import {HotelSales} from './../models/hotelSales.model';
import {InternalError} from './../util/app-error';
import {HotelSalesDetails} from '../models/hotelSalesDetails';

export class ImportHotelReportReportFromExsl {
  async importMonthlyReport(data: HolelMonthlyDataImportDTO[]) {
    const t = await sequelize.transaction();
    try {
      await Promise.all(
        data.map(async (sale: HolelMonthlyDataImportDTO) => {
          const findSale = await HotelSales.findOne({
            transaction: t,
            where: {hotel: sale.hotel, date: sale.date},
          });
          if (findSale)
            await HotelSales.update(sale, {
              transaction: t,
              where: {hotel: sale.hotel, date: sale.date},
            });
          else
            await HotelSales.create(
              sale as Optional<HolelMonthlyDataImportDTO, 'id'>,
              {transaction: t}
            );
        })
      );
      await t.commit();
      return data;
    } catch (error) {
      await t.rollback();
      if (error instanceof BaseError) throw new InternalError(error.message); // sequelize base error
      throw new InternalError('Unexpected error');
    }
  }
  async importDailyReport(data: DailySalesReport[]) {
    const t = await sequelize.transaction();
    try {
      await Promise.all(
        data.map(async (sale: DailySalesReport) => {
          const findSale = await HotelSales.findOne({
            transaction: t,
            where: {hotel: sale.hotel},
          });
          if (findSale) {
            const details = await HotelSalesDetails.findOne({
              transaction: t,
              where: {hotel: findSale.toJSON().id, orderId: sale.orderId},
            });
            sale.hotel = findSale.toJSON().id;
            if (details)
              await HotelSalesDetails.update(
                {...sale},
                {
                  transaction: t,
                  where: {hotel: findSale.toJSON().id, orderId: sale.orderId},
                }
              );
            else await HotelSalesDetails.create(sale as any, {transaction: t});
          }
        })
      );
      await t.commit();
      return data;
    } catch (error) {
      await t.rollback();
      if (error instanceof BaseError) throw new InternalError(error.message); // sequelize base error
      throw new InternalError('Unexpected error');
    }
  }
}
