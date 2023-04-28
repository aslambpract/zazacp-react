import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import useCoinTypes from "src/hooks/useCoinTypes";
import useErrors from "src/hooks/useErrors";
import fetchUser from "src/utils/fetchUser";
import useUserCoinAddress from "./useUserCoinAddress";

const useCoinAddresses = () => {
  const coins = useUserCoinAddress();
  const available = useCoinTypes();
  const [data, setData] = useState({});
  const [addresses, setAddresses] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const handleError = useErrors();
  useEffect(() => {
    if (coins.length && available.length) {
      const newAvailable = available.map((item) => {
        const { address } =
          coins.find(({ coin_id }) => coin_id === item.id) || {};
        return { ...item, address };
      });
      const newData = {};
      newAvailable.map(({ id, address }) => {
        newData[id] = address;
      });

      setData(newData);
      setAddresses(newAvailable);
    } else {
      const newAvailable = available.map((item) => {
        return { ...item, address: "" };
      });
      const newData = {};
      newAvailable.map(({ id, address }) => {
        newData[id] = address;
      });
      setData(newData);
      setAddresses(newAvailable);
    }
  }, [available, coins]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const re = new RegExp(/^^$|[a-zA-Z0-9]+$/i);
    if (re.test(value)) setData({ ...data, [name]: value });
  };
  const onSubmit = async () => {
    const reqData = new FormData();
    Object.entries(data).forEach(([k, v]) => reqData.append(k, v));

    try {
      const { data, status } = await fetchUser.post(
        "user-coin-address",
        reqData
      );
      if (status === 200) {
        enqueueSnackbar(data.message);
      }
    } catch (err) {
      handleError(err);
    }
  };

  return { addresses, data, handleChange, onSubmit };
};

export default useCoinAddresses;
