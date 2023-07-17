import { apiCallPOST } from '../controller';

export const apiAuth = async (payload: Object = {}) => {
  return await apiCallPOST('/auth/login', payload);
};