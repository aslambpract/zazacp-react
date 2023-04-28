import { useEffect, useState } from "react";
import usePagination from "src/components/pagination/usePagination";
import axiosInstance from "src/utils/axios";

const useCoupons = () => {
  const [couponList, setCouponList] = useState([]);
  const { count, onChange, page, seed, rowStart } = usePagination();

  const fetchCouponList = async (page = 1) => {
    try {
      const { data } = await axiosInstance.get(
        `/api/admin/coupons?page=${page}`
      );
      const { status, data: coupons } = data;
      if (status) {
        const { last_page, data: list, from } = coupons;
        seed(last_page, from);
        setCouponList(list);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCouponList(page);
  }, [page]);

  return { couponList, fetchCouponList, count, onChange, page, rowStart };
};

export default useCoupons;
