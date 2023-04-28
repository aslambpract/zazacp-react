import { useEffect, useState } from "react";
import useErrors from "src/hooks/useErrors";
import fetchUser from "src/utils/fetchUser";

const useUserCoinAddress = () => {
  const [coinAddress, setCoinAddress] = useState([]);
  const handleErrors = useErrors();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, status } = await fetchUser("user-coin-address");
        if (status === 200) {
          setCoinAddress(data.data);
        }
      } catch (err) {
        handleErrors(err);
      }
    };

    fetchData();
  }, []);

  return coinAddress;
};

export default useUserCoinAddress;
