import { useEffect, useState } from "react";
import useErrors from "src/hooks/useErrors";
import { findGrowthRate } from "src/pages/admin/dashboard/components/widgets/utils";
import axiosInstance from "src/utils/axios";

const getGrowth = (data = []) => findGrowthRate(...data.splice(-2));

const useTotal = () => {
  const handleErrors = useErrors();
  const [data, setData] = useState({
    total_network_bonus: 0,
    network_bonus_graph: [],
    network_growthRate: 0,
    total_payout: 0,
    payout_graph: [],
    payout_growth: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const URI = "/api/admin/dashboard/network-widgets";
        const { status, data } = await axiosInstance(URI);

        if (status === 200) {
          const { network_bonus_graph, payout_graph } = data.data;

          setData({
            ...data.data,
            network_growthRate: getGrowth([...network_bonus_graph]),
            payout_growth: getGrowth([...payout_graph]),
          });
        }
      } catch (err) {
        handleErrors(err);
      }
    };

    fetchData();
  }, []);

  return data;
};

export default useTotal;
