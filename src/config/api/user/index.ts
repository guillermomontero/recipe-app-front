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

export const apiGetUserData = async (id: number = 0) => {
  return await apiCallGET(`/users/getUserData/${id}`);
};

export const apiDeleteUser = async (payload: object = {}) => {
  return await apiCallPUT('/users/deleteUser', payload);
};

export const apiDeleteUserAdmin = async (id: number = 0) => {
  return await apiCallDELETE(`/users/deleteUser/${id}`);
};

export const apiEditUser = async (payload: Object = {}) => {
  return await apiCallPUT('/users/editUser', payload);
};

export const apiChangeEmail = async (payload: Object = {}) => {
  return await apiCallPUT('/users/changeEmail', payload);
};

export const apiChangePassword = async (payload: Object = {}) => {
  return await apiCallPUT('/users/changePassword', payload);
};

export const apiChangePreferences = async (payload: Object = {}) => {
  return await apiCallPUT('/users/changePreferences', payload);
};

export const apiChangePlan = async (payload: Object = {}) => {
  return await apiCallPUT('/users/changePlan', payload);
};