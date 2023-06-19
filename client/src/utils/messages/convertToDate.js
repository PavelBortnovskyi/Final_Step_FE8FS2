// convert message.sent[] to Date
export const arrToDate = (arr) => {
  const year = arr[0];
  const month = arr[1] - 1; // Месяцы в JavaScript начинаются с 0, поэтому вычитаем 1
  const day = arr[2];
  const hour = arr[3];
  const minute = arr[4];
  const second = arr[5];
  // const millisecond = arr[6];

  const date = new Date(Date.UTC(year, month, day, hour, minute, second));
  return date.toISOString();
};
