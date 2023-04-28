const getThreeYearsFromNow = () => {
  const currentDate = new Date();
  return new Date(
    currentDate.getFullYear() + 3,
    currentDate.getMonth(),
    currentDate.getDate()
  );
};

export default getThreeYearsFromNow;
