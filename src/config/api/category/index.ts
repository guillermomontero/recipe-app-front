import { apiCallPOST, apiCallGET, apiCallPUT, apiCallDELETE } from '../controller';

export const apiGetAllCategories = async () => {
  return await apiCallGET('/categories/getAllCategories');
};

export const apiCreateCategory = async (payload: Object = {}) => {
  return await apiCallPOST('/categories/createCategory', payload);
};

export const apiGetCategory = async (id: number = 0) => {
  return await apiCallGET(`/categories/getCategory/${id}`);
};

export const apiDeleteCategory = async (id: number = 0) => {
  return await apiCallDELETE(`/categories/deleteCategory/${id}`);
};

export const apiEditCategory = async (payload: Object = {}) => {
  return await apiCallPUT('/categories/editCategory', payload);
};