const genReqData = (data) => {
  const { hr, min, image, time, date, ...rest } = data;
  const reqData = new FormData();
  reqData.append("duration", `${hr}:${min}`);
  reqData.append("img", image[0]);
  reqData.append(
    "date_time",
    `${new Date(date).toLocaleDateString("en-GB")} ${time}`
  );
  [...Object.entries(rest)].forEach(([key, value]) =>
    reqData.append(key, value)
  );

  return reqData;
};

export default genReqData;
