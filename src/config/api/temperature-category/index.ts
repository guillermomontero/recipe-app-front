import { apiCallPOST, apiCallGET, apiCallPUT, apiCallDELETE } from '../controller';

export const apiGetAllTemperatureCategories = async () => {
  return await apiCallGET('/temperatureCategories/getAllTemperatureCategories');
};

export const apiCreateTemperatureCategory = async (payload: Object = {}) => {
  return await apiCallPOST('/temperatureCategories/createTemperatureCategory', payload);
};

export const apiGetTemperatureCategory = async (id: number = 0) => {
  return await apiCallGET(`/temperatureCategories/getTemperatureCategory/${id}`);
};

export const apiDeleteTemperatureCategory = async (id: number = 0) => {
  return await apiCallDELETE(`/temperatureCategories/deleteTemperatureCategory/${id}`);
};

export const apiEditTemperatureCategory = async (payload: Object = {}) => {
  return await apiCallPUT('/temperatureCategories/editTemperatureCategory', payload);
};

export const apiGetTemperatureCategoriesForPanel = async () => {
  return await apiCallGET('/temperatureCategories/getTemperatureCategoriesForPanel');
};