import { useEffect } from "react";
import { useParams } from "react-router";
import axiosInstance from "src/utils/axios";
import convertDMYToMDY from "src/utils/convertDMYToMDY";
import useCouponForm from "./useCouponForm";

const useGetCouponById = () => {
  const { cid } = useParams();
  const methods = useCouponForm();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await axiosInstance(
          `api/admin/coupons/${cid}`
        );

        if (status === 200) {
          const {
            created_at,
            deleted_at,
            start_date,
            end_date,
            coupon_products: product,
            ...rest
          } = data.data;
          methods.reset({
            start_date: new Date(convertDMYToMDY(start_date)),
            end_date: new Date(convertDMYToMDY(end_date)),
            product_ids: product.map(({ id }) => id),
            ...rest,
          });
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (cid) fetchData();
  }, [cid]);

  return methods;
};

export default useGetCouponById;
