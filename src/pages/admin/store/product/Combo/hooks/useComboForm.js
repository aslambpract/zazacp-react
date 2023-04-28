import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import getThreeYearsFromNow from "src/utils/getThreeYearsFromNow";
import { number, string } from "yup";
import { baseSchema } from "../../hook/schemas";

const ComboSchema = baseSchema.shape({
  sort_order: number()
    .typeError("Sort order must be a number")
    .required("Sort order is required"),
  description: string().required("Description is required"),
});

const defaultValues = {
  name: "",
  meta_keywords: "",
  sort_order: "",
  product_category_id: "",
  product_ids: [],
  meta_description: "",
  short_description: "",
  title: "",
  product_url: "",
  image: [],
  active: 0,
  subscription_type: "Subscription",
  available_from: new Date().toLocaleDateString(),
  available_to: getThreeYearsFromNow(),
  payment_types: [],
};

const useComboForm = () => {
  return useForm({
    resolver: yupResolver(ComboSchema),
    defaultValues,
  });
};

export default useComboForm;
