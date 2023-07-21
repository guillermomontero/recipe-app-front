import { apiCallPOST, apiCallGET, apiCallPUT, apiCallDELETE } from '../controller';

export const apiGetAllRecipes = async () => {
  return await apiCallGET('/recipes/getAllRecipes');
};

export const apiCreateRecipe = async (payload: Object = {}) => {
  return await apiCallPOST('/recipes/createRecipe', payload);
};

export const apiGetRecipe = async (id: string = '') => {
  return await apiCallGET(`/recipes/getRecipe/${id}`);
};

export const apiDeleteRecipe = async (id: number = 0) => {
  return await apiCallDELETE(`/recipes/deleteRecipe/${id}`);
};

export const apiEditRecipe = async (payload: Object = {}) => {
  return await apiCallPUT('/recipes/editRecipe', payload);
};

export const apiGetMyRecipes = async (id: string = '') => {
  return await apiCallGET(`/recipes/getMyRecipes/${id}`);
};

export const apiGetLatestRecipes = async () => {
  return await apiCallGET('/recipes/getLatestRecipes');
};

export const apiGetBestRecipes = async () => {
  return await apiCallGET('/recipes/getBestRecipes');
};

export const apiGetWorstRecipes = async () => {
  return await apiCallGET('/recipes/getWorstRecipes');
};

export const apiDoLikeRecipe = async (payload: Object = {}) => {
  return await apiCallPUT('/recipes/doLikeRecipe', payload);
};

export const apiDoUnlikeRecipe = async (payload: Object = {}) => {
  return await apiCallPUT('/recipes/doUnlikeRecipe', payload);
};
