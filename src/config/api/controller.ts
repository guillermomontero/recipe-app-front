import { useAuthStore } from '../../store/auth';

const apiUrl: string = 'http://localhost:3000/api/v1';

export const apiCallPOST = async (url: string = '', data: Object = {}) => {
  const options: Object = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  try {
    const response = await fetch(`${apiUrl}${url}`, options);

    if (!response.ok) return { msg: 'No se ha podido realizar la petición' };

    const data = await response.json();

    return data;
  } catch (err) {
    return err;
  }
};

export const apiCallGET = async (url: string = '', requireAuth: boolean = false) => {
  const authStore = useAuthStore();
  const token = authStore.token;

  const options: Object = {
    headers: {
      'auth-token': requireAuth ? token : '',
      // Authorization: `Bearer ${token}`
    }
  };

  try {
    const response = await fetch(`${apiUrl}${url}`, options);

    if (!response.ok) return { msg: 'No se ha podido realizar la petición' };

    const data = await response.json();

    return data;
  } catch (err) {
    return err;
  }
};