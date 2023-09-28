import { apiCallPOST, apiCallFormPOST, apiCallGET, apiCallPUT, apiCallDELETE } from '../controller';

interface IPagination {
  skip: number;
  limit: number;
}

export const apiGetAllRecipes = async (payload: IPagination) => {
  const { skip, limit } = payload;

  return await apiCallGET(`/recipes/getAllRecipes?skip=${skip}&limit=${limit}`);
};

export const getAllRecipesForSearch = async () => {
  return await apiCallGET('/recipes/getAllRecipesForSearch');
};

export const apiCreateRecipe = async (payload: Object = {}) => {
  return await apiCallPOST('/recipes/createRecipe', payload);
};

export const apiGetRecipe = async (id: string = '') => {
  return await apiCallGET(`/recipes/getRecipe/${id}`);
};

export const apiDeleteRecipe = async (id: string = '') => {
  return await apiCallDELETE(`/recipes/deleteRecipe/${id}`);
};

export const apiDeleteRecipeAdmin = async (id: string = '') => {
  return await apiCallDELETE(`/recipes/deleteRecipeAdmin/${id}`);
};

export const apiEditRecipe = async (payload: Object = {}) => {
  return await apiCallPUT('/recipes/editRecipe', payload);
};

export const apiGetMyRecipes = async (id: string = '', payload: IPagination) => {
  const { skip, limit } = payload;

  return await apiCallGET(`/recipes/getMyRecipes/${id}?skip=${skip}&limit=${limit}`);
};

export const apiGetLatestRecipes = async (payload: IPagination) => {
  const { skip, limit } = payload;

  return await apiCallGET(`/recipes/getLatestRecipes?skip=${skip}&limit=${limit}`);
};

export const apiGetBestRecipes = async (payload: IPagination) => {
  const { skip, limit } = payload;

  return await apiCallGET(`/recipes/getBestRecipes?skip=${skip}&limit=${limit}`);
};

export const apiGetWorstRecipes = async (payload: IPagination) => {
  const { skip, limit } = payload;

  return await apiCallGET(`/recipes/getWorstRecipes?skip=${skip}&limit=${limit}`);
};

export const apiDoLikeRecipe = async (payload: Object = {}) => {
  return await apiCallPUT('/recipes/doLikeRecipe', payload);
};

export const apiDoUnlikeRecipe = async (payload: Object = {}) => {
  return await apiCallPUT('/recipes/doUnlikeRecipe', payload);
};

export const apiUploadRecipe = async (id: string = '', timestamp: number, payload: FormData) => {
  return await apiCallFormPOST(`/files/uploadRecipe/${id}/${timestamp}`, payload);
};

export const apiGetRecipesForPanel = async () => {
  return await apiCallGET('/recipes/getRecipesForPanel');
};