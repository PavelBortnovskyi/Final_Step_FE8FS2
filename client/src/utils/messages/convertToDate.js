export const timestampToDate = (timestamp) => {
  const date = new Date(timestamp); // Создаем объект Date из временной метки
  const utcString = date.toISOString();
  return utcString;
};
