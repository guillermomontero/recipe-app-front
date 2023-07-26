export const formatDateToInput = (date: string = '2023-01-01T00:00:00') => date.split('T')[0];
export const formatDateToClient = (date: string = '2023-01-01') => new Date(date);
export const formatDateFront = (date: string = '2023-01-01') => date.split('-').reverse().join('/');