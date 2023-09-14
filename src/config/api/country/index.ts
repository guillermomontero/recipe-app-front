import { apiCallGET } from '../controller';

export const apiGetAllCountries = async () => {
  return await apiCallGET('/countries/getAllCountries');
};

export const apiGetCountry = async (id: number = 0) => {
  return await apiCallGET(`/countries/getCountry/${id}`);
};

export const apiGetCountriesForPanel = async () => {
  return await apiCallGET('/countries/getCountriesForPanel');
};
