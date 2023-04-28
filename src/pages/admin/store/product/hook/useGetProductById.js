import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axiosInstance from "src/utils/axios";
import convertDMYToMDY from "src/utils/convertDMYToMDY";
import useProductForm from "./useProductForm";

const useGetProductById = () => {
  const { pid } = useParams();
  const methods = useProductForm(true);
  const fetchData = async (productId) => {
    try {
      const { status, data } = (
        await axiosInstance.get(`/api/admin/products/${productId}`)
      ).data;

      if (status) {
        const {
          product_videos,
          product_payment_types,
          subscription_type,
          product_images,
          product_prices,
          product_price_life_times,
          available_from,
          available_to,
          name,
          ...rest
        } = data;
        const { life_time_business_volume, life_time_price, no_of_days } =
          product_price_life_times[0] || {};
        if (rest) {
          methods.reset({
            ...rest,
            name: name,
            ...parsePriceAndBv(product_prices),
            available_from: new Date(convertDMYToMDY(available_from)),
            available_to: new Date(convertDMYToMDY(available_to)),
            life_time_business_volume: parseInt(life_time_business_volume) || 0,
            life_time_price: parseInt(life_time_price) || 0,
            no_of_days: parseInt(no_of_days) || 0,
            life_time_access: Boolean(product_price_life_times.length),
            image: product_images.map((v) => v.image_url),
            productImages: product_images,
            video: product_videos.find(Boolean)?.video_url,
            payment_types: product_payment_types?.map(({ id }) => id) || [],
            subscription_type: Boolean(parseInt(subscription_type))
              ? "Subscription"
              : "One Off Payment",
          });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (pid) {
      fetchData(pid);
    }
  }, [pid]);

  return { methods, fetchData };
};

const parsePriceAndBv = (productPrices) => {
  const price = {};
  const bv = {};

  productPrices.forEach((item) => {
    price[item.validity] = item.price;
    bv[item.validity] = item.business_volume;
  });

  return { price, bv };
};

export default useGetProductById;
