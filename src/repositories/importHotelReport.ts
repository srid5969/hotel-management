import { BaseError, Optional } from 'sequelize';
import { HolelMonthlyDataImportDTO } from './../business_objects/hotelSales';
import sequelize from './../config/sequelize';
import { HotelSales } from './../models/hotelSales.model';
import { InternalError } from './../util/app-error';

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
      console.log(error);
      
      await t.rollback();
      if (error instanceof BaseError) throw new InternalError(error.message); // sequelize base error
      throw new InternalError('Unexpected error');
    }
  }
}
