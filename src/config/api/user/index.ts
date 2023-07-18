import { apiCallPOST, apiCallGET, apiCallPUT, apiCallDELETE } from '../controller';

export const apiGetAllUsers = async () => {
  return await apiCallGET('/users/getAllUsers');
};

export const apiCreateUser = async (payload: Object = {}) => {
  return await apiCallPOST('/users/createUser', payload);
};

export const apiGetUser = async (id: number = 0) => {
  return await apiCallGET(`/users/getUser/${id}`);
};

export const apiDeleteUser = async (id: number = 0) => {
  return await apiCallDELETE(`/users/deleteUser/${id}`);
};

export const apiEditUser = async (payload: Object = {}) => {
  return await apiCallPUT('/users/editUser', payload);
};