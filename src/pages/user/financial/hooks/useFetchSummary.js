import { useEffect, useState } from "react";
import useErrors from "src/hooks/useErrors";
import fetchUser from "src/utils/fetchUser";

const useFetchSummary = (url) => {
  const [summary, setSummary] = useState({});
  const handleErrors = useErrors();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, status } = await (await fetchUser(url)).data;

        if (status) {
          setSummary(data);
        }
      } catch (err) {
        handleErrors(err);
      }
    };

    fetchData();
  }, []);

  return summary;
};

export default useFetchSummary;
