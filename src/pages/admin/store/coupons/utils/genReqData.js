const genReqData = (data) => {
  const { start_date, end_date, ...rest } = data;
  const reqData = new FormData();
  [...Object.entries(rest)].map(([key, value]) => reqData.append(key, value));

  reqData.append(
    "start_date",
    new Date(start_date).toLocaleDateString("en-GB")
  );
  reqData.append("end_date", new Date(end_date).toLocaleDateString("en-GB"));

  return reqData;
};

export default genReqData;
