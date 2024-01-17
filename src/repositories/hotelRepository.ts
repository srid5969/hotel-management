import { BaseError } from 'sequelize';
import { InternalError, NotFoundError } from '../util/app-error';
import { HotelModel } from './../models/hotel.model';

export class HotelRepository {
  public async registerHotel(hotel: any) {
    try {
        
      const saveHoltel = await HotelModel.create(hotel);
      return saveHoltel.toJSON(); // return saved Holtel to client
    } catch (error) {
      if (error instanceof BaseError) throw new InternalError(error.message);
      throw new InternalError('Unexpected error');
    }
  }
  public async getHotelById(id: string) {
    try {
      const Hotel = await HotelModel.findByPk(id);
      return Hotel; // return saved Hotel to client
    } catch (error) {
      if (error instanceof BaseError) throw new InternalError(error.message); // sequelize base error
      throw new InternalError('Unexpected error');
    }
  }
  public async updateHotelById(id: string, data: any) {
    try {
      const [affectedCount] = await HotelModel.update(data, {where: {id: id}});
      if (affectedCount== 0) throw new NotFoundError('Hotel not found');
      const Hotel = await this.getHotelById(id);
      return Hotel; // return saved Hotel to client
    } catch (error) {
      if (error instanceof BaseError) throw new InternalError(error.message); // sequelize base error
      throw error;
    }
  }
  public async deleteHotelById(id: string) {
    try {
      const deleted = await HotelModel.destroy({where: {id}});
      if (deleted > 0)
        return Promise.resolve({message: 'Successfully deleted'});
      throw new NotFoundError('Hotel not found');
    } catch (error) {
      if (error instanceof BaseError) throw new InternalError(error.message); // sequelize base error
      throw error;
    }
  }
  public async getAllHotels(limit: number = 20, offset: number = 0) {
    try {
      const holtels = await HotelModel.findAll({limit, offset});
      return holtels; // return saved Hotel to client
    } catch (error) {
      if (error instanceof BaseError) throw new InternalError(error.message); // sequelize base error
      throw new InternalError('Unexpected error');
    }
  }
}
