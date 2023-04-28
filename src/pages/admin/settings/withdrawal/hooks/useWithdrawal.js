import { capitalCase } from "change-case";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import useErrors from "src/hooks/useErrors";
import axiosInstance from "src/utils/axios";

const useWithdrawal = () => {
  const [data, setData] = useState({
    id: "",
    min_amount: "",
    admin_fee_percent: "",
    available_coins: "",
    withdrawal_open_days: [],
  });
  const { enqueueSnackbar } = useSnackbar();
  const handleErrors = useErrors();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await axiosInstance.get(
          "api/admin/withdrawal-settings"
        );
        if (status === 200) {
          const {
            id,
            min_amount,
            admin_fee_percent,
            available_coins,
            withdrawal_open_days,
          } = data.data;
          setData({
            id,
            min_amount,
            admin_fee_percent,
            available_coins,
            withdrawal_open_days,
          });
        }
      } catch (err) {
        handleErrors(err);
      }
    };

    fetchData();
  }, []);

  const handleChange =
    (type = "") =>
    (e) => {
      setData((prevState) => {
        const { value, name } = e.target;
        const temp = { ...prevState };

        switch (type) {
          case "open": {
            return handleOpened(temp, capitalCase(value));
          }
          case "coin": {
            return handleCoin(temp, value);
          }
          default: {
            return { ...temp, [name]: value };
          }
        }
      });
    };

  const onSubmit = async () => {
    const { withdrawal_open_days, available_coins, ...rest } = data;
    const reqData = new FormData();
    Object.entries(rest).forEach(([k, v]) => reqData.append(k, v));
    reqData.append(
      "withdrawal_open_days",
      `[${withdrawal_open_days.map((day) => `"${day}"`)}]`
    );
    reqData.append("available_coins", `[${available_coins}]`);
    try {
      const { status, data } = await axiosInstance.post(
        "/api/admin/withdrawal-settings",
        reqData
      );
      if (status === 200) {
        enqueueSnackbar(data.message);
      }
    } catch (err) {}
  };

  return { data, handleChange, onSubmit };
};

const handleOpened = (temp, value) => {
  const { withdrawal_open_days } = temp;

  const itemIndex = withdrawal_open_days.findIndex((v) => value === v);
  if (itemIndex > -1) {
    temp.withdrawal_open_days.splice(itemIndex, 1);
    return temp;
  }

  temp.withdrawal_open_days.push(value);
  return temp;
};

const handleCoin = (temp, value) => {
  const { available_coins } = temp;

  const iValue = parseInt(value);
  const coins = available_coins;
  const itemIndex = coins.findIndex((v) => iValue === v);

  if (itemIndex > -1) {
    coins.splice(itemIndex, 1);
    temp.available_coins = coins;
    return temp;
  }
  coins.push(iValue);
  temp.available_coins = coins;
  return temp;
};

export default useWithdrawal;
