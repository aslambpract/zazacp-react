const objectToQueryString = (arg) =>
  Object.entries(arg)
    .map(([key, value]) => {
      if (value) return `${key}=${value}`;
      return null;
    })
    .filter((v) => v !== null)
    .join("&")
    .trim();

export default objectToQueryString;
