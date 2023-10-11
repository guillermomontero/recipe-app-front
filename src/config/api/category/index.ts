import { apiCallGET, apiCallPOST, apiCallPUT, apiCallDELETE } from '../controller';

export const apiGetAllCategories = async () => {
  return await apiCallGET('/categories/getAllCategories');
};

export const apiGetCategory = async (id: string = '') => {
  return await apiCallGET(`/categories/getCategory/${id}`);
};

export const apiCreateCategory = async (payload: Object = {}) => {
  return await apiCallPOST('/categories/createCategory', payload);
};

export const apiEditCategoryAdmin = async (payload: Object = {}) => {
  return await apiCallPUT('/categories/editCategoryAdmin', payload);
};

export const apiDeleteCategoryAdmin = async (id: string = '') => {
  return await apiCallDELETE(`/categories/deleteCategoryAdmin/${id}`);
};

export const apiGetCategoriesForPanel = async () => {
  return await apiCallGET('/categories/getCategoriesForPanel');
};
