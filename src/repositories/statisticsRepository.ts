import {AppError, InternalError} from '../util/app-error';
import {Statistics} from '../models/statistics.model';
import sequelize from './../config/sequelize';
export class StatisticsRepository {
  public async bulkImportStatistics(
    type: string,
    username: string,
    userId: string,
    hotel: string,
    hotelId: string,
    date: number,
    data: any[]
  ) {
    const t = await sequelize.transaction();
    try {
      await Promise.all(
        data.map(async record => {
          record.username = username;
          record.userId = userId;
          record.hotel = hotel;
          record.hotelId = hotelId;
          record.reportDate = date;
          const ifAlreadyExits = await Statistics.findOne({
            where: {
              type: type,
              date: date,
              source: record.source,
              hotelId,
              hotel,
            },
            transaction: t,
          });
          if (ifAlreadyExits)
            await Statistics.update(record, {
              where: {
                type: type,
                date: date,
                source: record.source,
                hotelId,
                hotel,
              },
              transaction: t,
            });
          else
            await Statistics.create(
              {...record, date, type, source: record.source},
              {transaction: t}
            );
        })
      );
      await t.commit();
    } catch (error) {
      console.log(error);

      await t.rollback();
      if (error instanceof AppError) throw error;
      throw new InternalError('Unexpected Error');
    }
  }
}
