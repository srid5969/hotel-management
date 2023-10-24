import {cityModel} from '../models/city.model';

export class CityRepository {
  async getCityList() {
    const getCity = await cityModel.findAll();
    return getCity;
  }
}
