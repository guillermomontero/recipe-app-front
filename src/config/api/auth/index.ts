import { apiCallPOST } from '../controller';

export const apiLogin = async (payload: Object = {}) => {
  return apiCallPOST('/auth/login', payload, false);
};

export const apiRegister = async (payload: Object = {}) => {
  return await apiCallPOST('/auth/register', payload);
};