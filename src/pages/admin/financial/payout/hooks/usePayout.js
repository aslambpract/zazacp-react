import { useEffect, useState } from "react";
import axiosInstance from "src/utils/axios";

const usePayout = () => {
  const [payoutHistory, setPayoutHistory] = useState({ data: [] });
  const [pendingPayout, setPendingPayout] = useState({ data: [] });

  const fetchPayoutData = async (query = "", page) => {
    const { data } = await axiosInstance.get(
      `/api/admin/payout-requests?${query}&page=${page}`
    );
    const { status, data: payout } = data;
    if (status) {
      setPayoutHistory(payout.payout_history);
      setPendingPayout(payout.pending_payout);
    }
  };

  useEffect(() => {
    fetchPayoutData();
  }, []);

  return { payoutHistory, pendingPayout, fetchPayoutData };
};

export default usePayout;
