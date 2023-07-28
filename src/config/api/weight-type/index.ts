import { apiCallPOST, apiCallGET, apiCallPUT, apiCallDELETE } from '../controller';

export const apiGetAllWeightTypes = async () => {
  return await apiCallGET('/weightTypes/getAllWeightTypes');
};

export const apiCreateWeightType = async (payload: Object = {}) => {
  return await apiCallPOST('/weightTypes/createWeightType', payload);
};

export const apiDeleteWeightType = async (id: number = 0) => {
  return await apiCallDELETE(`/weightTypes/deleteWeightType/${id}`);
};

export const apiEditWeightType = async (payload: Object = {}) => {
  return await apiCallPUT('/weightTypes/editWeightType', payload);
};