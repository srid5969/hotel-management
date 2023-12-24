import {QueryTypes} from 'sequelize';
import sequelize from './../config/sequelize';
import {hotelReportsQueries} from './../sql-providers/hotelReportsQueries';
import {InternalError} from './../util/app-error';

export class HotelReportsRepository {
  public async getHotelReportById(id: string | number) {
    try {
      const data = await sequelize.query(
        hotelReportsQueries.getHotelReportsByHotelId(id),
        {type: QueryTypes.SELECT, raw: true}
      );
      return data;
    } catch (error) {
      throw new InternalError(error?.message || 'Unexpected error');
    }
  }
}
