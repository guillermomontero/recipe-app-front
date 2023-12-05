import { apiCallPOST } from '../controller';

export const apiLogin = async (payload: Object = {}) => {
  return apiCallPOST('/auth/login', payload, false);
};
