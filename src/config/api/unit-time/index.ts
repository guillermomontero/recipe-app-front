import { apiCallPOST, apiCallGET, apiCallPUT, apiCallDELETE } from '../controller';

export const apiGetAllUnitTimes = async () => {
  return await apiCallGET('/unitTimes/getAllUnitTimes');
};

export const apiCreateUnitTime = async (payload: Object = {}) => {
  return await apiCallPOST('/unitTimes/createUnitTime', payload);
};

export const apiDeleteUnitTime = async (id: number = 0) => {
  return await apiCallDELETE(`/unitTimes/deleteUnitTime/${id}`);
};

export const apiEditUnitTime = async (payload: Object = {}) => {
  return await apiCallPUT('/unitTimes/editUnitTime', payload);
};

export const apiGetUnitTimesForPanel = async () => {
  return await apiCallGET('/unitTimes/getUnitTimesForPanel');
};