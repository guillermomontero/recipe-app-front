import { useAuthStore } from '../../store/auth';
import { useSpinnerStore } from '../../store/spinner';

const apiUrl: string = import.meta.env.VITE_URL_DB_LOCAL;

let spinnerCounter = 0;

const getTokenRole = () => {
  const authStore = useAuthStore();
  const token = authStore.token || '';
  const role = authStore.user.role || 2;

  return { token, role };
};

const setSpinner = (value: boolean = false) => {
  const spinnerStore = useSpinnerStore();

  if (value) {
    if (spinnerCounter === 0) spinnerStore.switchSpinner(value);
    spinnerCounter += 1;
  } else {
    spinnerCounter -= 1;
    if (spinnerCounter === 0) spinnerStore.switchSpinner(value);
  }
};

export const apiCallPOST = async (url: string = '', data: Object = {}, allowSpinner: boolean = true) => {
  if (allowSpinner) setSpinner(true);

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
  } finally {
    setSpinner(false);
  }
};

export const apiCallFormPOST = async (url: string = '', payload: FormData, allowSpinner: boolean = true) => {
  if (allowSpinner) setSpinner(true);

  const params = getTokenRole();
  
  const options: Object = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${params.token}`,
      role: params.role
    },
    body: payload
  };

  try {
    const response = await fetch(`${apiUrl}${url}`, options);
    if (!response.ok) throw new Error(`${response.status} - ${response.statusText}`);
    const data = await response.json();

    return data
  } catch (error: any) {
    throw new Error(error.message);
  } finally {
    setSpinner(false);
  }
};

export const apiCallGET = async (url: string = '', allowSpinner: boolean = true) => {
  if (allowSpinner) setSpinner(true);

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

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  } finally {
    setSpinner(false);
  }
};

export const apiCallPUT = async (url: string = '', data: Object = {}, allowSpinner: boolean = true) => {
  if (allowSpinner) setSpinner(true);

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
  } finally {
    setSpinner(false);
  }
};

export const apiCallDELETE = async (url: string = '', allowSpinner: boolean = true) => {
  if (allowSpinner) setSpinner(true);

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
  } finally {
    setSpinner(false);
  }
};