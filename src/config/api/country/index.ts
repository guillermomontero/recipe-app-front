import { apiCallGET, apiCallPUT, apiCallDELETE } from '../controller';

export const apiGetAllCountries = async () => {
  return await apiCallGET('/countries/getAllCountries');
};

export const apiGetCountry = async (id: string = '') => {
  return await apiCallGET(`/countries/getCountry/${id}`);
};

export const apiGetCountriesForPanel = async () => {
  return await apiCallGET('/countries/getCountriesForPanel');
};

export const apiEditCountryAdmin = async (payload: Object = {}) => {
  return await apiCallPUT('/countries/editCountryAdmin', payload);
};

export const apiDeleteCountryAdmin = async (id: string = '') => {
  return await apiCallDELETE(`/countries/deleteCountryAdmin/${id}`);
};