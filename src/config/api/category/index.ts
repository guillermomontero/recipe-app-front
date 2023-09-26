import { apiCallPOST, apiCallGET, apiCallPUT, apiCallDELETE } from '../controller';

export const apiGetAllCategories = async () => {
  return await apiCallGET('/categories/getAllCategories');
};

export const apiCreateCategory = async (payload: Object = {}) => {
  return await apiCallPOST('/categories/createCategory', payload);
};

export const apiGetCategory = async (id: string = '') => {
  return await apiCallGET(`/categories/getCategory/${id}`);
};

export const apiDeleteCategoryAdmin = async (id: string = '') => {
  return await apiCallDELETE(`/categories/deleteCategoryAdmin/${id}`);
};

export const apiEditCategoryAdmin = async (payload: Object = {}) => {
  return await apiCallPUT('/categories/apiEditCategoryAdmin', payload);
};

export const apiGetCategoriesForPanel = async () => {
  return await apiCallGET('/categories/getCategoriesForPanel');
};
