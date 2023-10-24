import {countryModel} from '../models/country.model';

export class CountryRepository {
  async getCountryList() {
    const getCountry = await countryModel.findAll();
    return getCountry;
  }
}
