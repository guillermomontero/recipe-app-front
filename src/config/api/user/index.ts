import { apiCallPOST, apiCallFormPOST, apiCallGET, apiCallPUT, apiCallDELETE } from '../controller';
import { IPagination } from '../../../../types';

export const apiGetAllUsers = async () => {
  return await apiCallGET('/users/getAllUsers');
};

export const apiCreateUser = async (payload: Object = {}) => {
  return await apiCallPOST('/users/createUser', payload);
};

export const apiGetUser = async (id: string = '') => {
  return await apiCallGET(`/users/getUser/${id}`);
};

export const apiGetUserData = async (id: string = '') => {
  return await apiCallGET(`/users/getUserData/${id}`);
};

export const apiDeleteUser = async (payload: object = {}) => {
  return await apiCallPUT('/users/deleteUser', payload);
};

export const apiDeleteUserAdmin = async (id: string = '') => {
  return await apiCallDELETE(`/users/deleteUserAdmin/${id}`);
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

export const apiUploadAvatar = async (id: string = '', timestamp: number, payload: FormData) => {
  return await apiCallFormPOST(`/files/uploadAvatar/${id}/${timestamp}`, payload);
};

export const apiDeleteImageProfile = async (payload: Object = {}) => {
  return await apiCallPUT('/users/deleteImageProfile', payload);
};

export const apiGetMyFavorites = async (id: string = '', payload: IPagination) => {
  const { skip, limit } = payload;

  return await apiCallGET(`/users/getMyFavorites/${id}?skip=${skip}&limit=${limit}`);
};

export const apiGetUsersForPanel = async () => {
  return await apiCallGET('/users/getUsersForPanel');
};

export const apiUnsuscribeUserAdmin = async (payload: Object = {}) => {
  return await apiCallPUT('/users/unsuscribeUserAdmin', payload);
};

export const apiEditUserAdmin = async (payload: Object = {}) => {
  return await apiCallPUT('/users/editUserAdmin', payload);
};