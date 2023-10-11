import { apiCallGET, apiCallPOST, apiCallPUT, apiCallDELETE } from '../controller';

export const apiGetAllWeightTypes = async () => {
  return await apiCallGET('/weightTypes/getAllWeightTypes');
};

export const apiGetWeightType = async (id: string = '') => {
  return await apiCallGET(`/weightTypes/getWeightType/${id}`);
};

export const apiCreateWeightType = async (payload: Object = {}) => {
  return await apiCallPOST('/weightTypes/createWeightType', payload);
};

export const apiEditWeightTypeAdmin = async (payload: Object = {}) => {
  return await apiCallPUT('/weightTypes/editWeightTypeAdmin', payload);
};

export const apiDeleteWeightTypeAdmin = async (id: string = '') => {
  return await apiCallDELETE(`/weightTypes/deleteWeightTypeAdmin/${id}`);
};

export const apiGetWeightTypesForPanel = async () => {
  return await apiCallGET('/weightTypes/getWeightTypesForPanel');
};