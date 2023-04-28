import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import axiosInstance from "src/utils/axios";
import convertDMYToMDY from "src/utils/convertDMYToMDY";

import getThreeYearsFromNow from "src/utils/getThreeYearsFromNow";

const defaultValues = {
  name: "",
  meta_keywords: "",
  product_category_id: "",
  meta_description: "",
  short_description: "",
  title: "",
  product_url: "",
  image: [],
  video: "",
  active: 0,
  subscription_type: "Subscription",
  available_from: new Date().toLocaleDateString("en-GB"),
  available_to: getThreeYearsFromNow(),
  bv: {
    "1 month": 0,
  },
  price: {
    "1 month": 0,
  },
  payment_types: {
    debit_credit: 1,
    paypal: 0,
    finpay: 0,
    deposit_wallet: 0,
    coin_payments: 0,
    bitcoin: 0,
  },
};

const useEditForm = () => {
  const methods = useForm({ defaultValues });
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async (productId) => {
      try {
        const res = await axiosInstance.get(`/api/admin/products/${productId}`);
        const { data } = res.data;

        const price = {};
        const bv = {};
        if (data) {
          data.product_prices.forEach((item) => {
            price[item.validity] = item.price;
            bv[item.validity] = item.business_volume;
          });
          methods.reset({
            ...data,
            images: data.product_images,
            available_from: convertDMYToMDY(data.available_from),
            available_to: convertDMYToMDY(data.available_to),
            price,
            bv,
            video: data.product_videos
              ? data.product_videos[0]?.video_url
              : null,
            payment_types: JSON.parse(data.payment_types),
            subscription_type: Boolean(parseInt(data.subscription_type))
              ? "Subscription"
              : "One Off Payment",
          });
          setIsLoading(false);
        }
      } catch (err) {
        enqueueSnackbar("Failed to load data", { variant: "error" });
        console.error(err);
      }
    };

    if (id) {
      fetchData(id);
    }
  }, [id]);

  return { methods, isLoading };
};

export default useEditForm;
