import { useEffect, useState } from "react";
import useErrors from "src/hooks/useErrors";
import fetchUser from "src/utils/fetchUser";

const useCoinTypes = () => {
  const [coinTypes, setCoinTypes] = useState([]);

  const handleErrors = useErrors();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await (
          await fetchUser("available-coins")
        ).data;

        if (status) {
          setCoinTypes(data);
        }
      } catch (err) {
        handleErrors(err);
      }
    };

    fetchData();
  }, []);

  return coinTypes;
};

export default useCoinTypes;
