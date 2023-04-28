import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import axiosInstance from "src/utils/axios";

const defaultValues = {
  active: 1,
  category_id: "",
  date: "",
  note: "",
  _method: "PUT",
  user_id: "",
  product_id: "",
};

const useGetSubscriptionById = () => {
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm({
    defaultValues,
  });

  const fetchSubScriptionById = async (subscriptionId) => {
    try {
      const { status, data } = await axiosInstance.get(
        `api/admin/product-subscriptions/${subscriptionId}`
      );
      if (status === 200) {
        const {
          created_at,
          active,
          user_id,
          product_id,
          effective_until,
          user_purchase,
        } = data.data;
        methods.reset({
          effective_until: new Date(effective_until),
          user_id,
          product_id,
          note: user_purchase.note,
          category_id: user_purchase?.product_subscription_category?.id,
          date: new Date(created_at),
          active,
        });
      }
    } catch (err) {
      console.error(err);
      enqueueSnackbar(err.message, { variant: "error" });
    }
  };

  return { methods, fetchSubScriptionById };
};

export default useGetSubscriptionById;
