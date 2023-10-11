import { apiCallGET, apiCallPOST, apiCallPUT, apiCallDELETE } from '../controller';

export const apiGetAllUnitTimes = async () => {
  return await apiCallGET('/unitTimes/getAllUnitTimes');
};

export const apiGetUnitTime = async (id: string = '') => {
  return await apiCallGET(`/unitTimes/getUnitTime/${id}`);
};

export const apiCreateUnitTime = async (payload: Object = {}) => {
  return await apiCallPOST('/unitTimes/createUnitTime', payload);
};

export const apiEditUnitTimeAdmin = async (payload: Object = {}) => {
  return await apiCallPUT('/unitTimes/editUnitTimeAdmin', payload);
};

export const apiDeleteUnitTimeAdmin = async (id: string = '') => {
  return await apiCallDELETE(`/unitTimes/deleteUnitTimeAdmin/${id}`);
};

export const apiGetUnitTimesForPanel = async () => {
  return await apiCallGET('/unitTimes/getUnitTimesForPanel');
};