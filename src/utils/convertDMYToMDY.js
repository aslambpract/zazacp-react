const convertDMYToMDY = (dateToConvert) => {
  const [date, month, year] = dateToConvert.split("/");
  return [month, date, year].join("/");
};

export const convertMDYToDMY = (dateToConvert) => {
  const [month, date, year] = dateToConvert.split("/");
  return [date, month, year].join("/");
};


export default convertDMYToMDY;
