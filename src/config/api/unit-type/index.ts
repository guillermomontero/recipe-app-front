import { apiCallPOST, apiCallGET, apiCallPUT, apiCallDELETE } from '../controller';

export const apiGetAllUnitTypes = async () => {
  return await apiCallGET('/unitTypes/getAllUnitTypes');
};

export const apiCreateUnitType = async (payload: Object = {}) => {
  return await apiCallPOST('/unitTypes/createUnitType', payload);
};

export const apiDeleteUnitType = async (id: number = 0) => {
  return await apiCallDELETE(`/unitTypes/deleteUnitType/${id}`);
};

export const apiEditUnitType = async (payload: Object = {}) => {
  return await apiCallPUT('/unitTypes/editUnitType', payload);
};