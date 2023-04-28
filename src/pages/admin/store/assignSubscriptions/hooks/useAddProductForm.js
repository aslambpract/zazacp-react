import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { object, string } from "yup";

const schema = object().shape({
  product_id: string()
    .typeError("Product is required")
    .required("Product is required"),
  user_id: string().typeError("User is required").required("User is required"),
  note: string().required("Note is required"),
  date: string().required("Certified date is required"),
  category_id: string().required("Category is required"),
  period_month: string().nullable(),
  product_price_id: string().nullable(),
});

export const addProductFormDefaultValues = {
  product_id: "",
  user_id: "",
  note: "",
  date: "",
  category_id: "",
  period_month: "",
  product_price_id: "",
  is_with_commissions: false,
  is_with_materials: false,
  custom_days: 0,
};

const useAddProductForm = () => {
  return useForm({
    addProductFormDefaultValues,
    resolver: yupResolver(schema),
  });
};

export default useAddProductForm;
