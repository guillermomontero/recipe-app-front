import { useAuthStore } from '../../store/auth';

const apiUrl: string = 'http://localhost:3000/api/v1';

const getTokenRole = () => {
  const authStore = useAuthStore();
  const token = authStore.token || '';
  const role = authStore.user.role || 2;

  return { token, role };
};

export const apiCallPOST = async (url: string = '', data: Object = {}) => {
  const params = getTokenRole();
  
  const options: Object = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${params.token}`,
      role: params.role
    },
    body: JSON.stringify(data)
  };

  try {
    const response = await fetch(`${apiUrl}${url}`, options);
    if (!response.ok) throw new Error(`${response.status} - ${response.statusText}`);
    const data = await response.json();

    return data
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const apiCallGET = async (url: string = '') => {
  const params = getTokenRole();

  const options: Object = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${params.token}`,
      role: params.role
    }
  };

  try {
    const response = await fetch(`${apiUrl}${url}`, options);
    if (!response.ok) throw new Error(`${response.status} - ${response.statusText}`);
    const data = await response.json();

    return data
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const apiCallPUT = async (url: string = '', data: Object = {}) => {
  const params = getTokenRole();

  const options: Object = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${params.token}`,
      role: params.role
    },
    body: JSON.stringify(data)
  };

  try {
    const response = await fetch(`${apiUrl}${url}`, options);
    if (!response.ok) throw new Error(`${response.status} - ${response.statusText}`);
    const data = await response.json();

    return data
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const apiCallDELETE = async (url: string = '') => {
  const params = getTokenRole();

  const options: Object = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${params.token}`,
      role: params.role
    },
  };

  try {
    const response = await fetch(`${apiUrl}${url}`, options);
    if (!response.ok) throw new Error(`${response.status} - ${response.statusText}`);
    const data = await response.json();

    return data
  } catch (error: any) {
    throw new Error(error.message);
  }
};