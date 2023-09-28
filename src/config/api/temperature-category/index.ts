import { apiCallPOST, apiCallGET, apiCallPUT, apiCallDELETE } from '../controller';

export const apiGetAllTemperatureCategories = async () => {
  return await apiCallGET('/temperatureCategories/getAllTemperatureCategories');
};

export const apiCreateTemperatureCategory = async (payload: Object = {}) => {
  return await apiCallPOST('/temperatureCategories/createTemperatureCategory', payload);
};

export const apiGetTemperatureCategory = async (id: string = '') => {
  return await apiCallGET(`/temperatureCategories/getTemperatureCategory/${id}`);
};

export const apiDeleteTemperatureCategoryAdmin = async (id: string = '') => {
  return await apiCallDELETE(`/temperatureCategories/deleteTemperatureCategoryAdmin/${id}`);
};

export const apiEditTemperatureCategoryAdmin = async (payload: Object = {}) => {
  return await apiCallPUT('/temperatureCategories/editTemperatureCategoryAdmin', payload);
};

export const apiGetTemperatureCategoriesForPanel = async () => {
  return await apiCallGET('/temperatureCategories/getTemperatureCategoriesForPanel');
};