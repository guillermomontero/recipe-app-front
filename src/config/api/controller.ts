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
    const data = await response.json();

    return data;
  } catch (err) {
    return err;
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
    const data = await response.json();

    return data;
  } catch (err) {
    return err;
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
    const data = await response.json();

    return data;
  } catch (err) {
    return err;
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
    const data = await response.json();

    return data;
  } catch (err) {
    return err;
  }
};