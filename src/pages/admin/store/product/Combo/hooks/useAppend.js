import { useState } from "react";

const useAppend = () => {
  const [data, setData] = useState([]);

  const addClick = () => {
    setData([...data, data.length + 1]);
  };

  const removeClick = (i) => () => {
    let values = [...data];
    values.splice(i, 1);
    setData(values);
  };

  return { data, addClick, removeClick };
};

export default useAppend;
