export const formatHourFront = (hour: string = '2023-01-01T00:00:00:000') => {
  if (hour.includes('T')) return hour.split('T')[1].slice(0, 5);
  return hour.slice(0, 5);
}