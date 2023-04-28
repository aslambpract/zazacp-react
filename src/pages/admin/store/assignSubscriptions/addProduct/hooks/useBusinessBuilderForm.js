import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const schema = Yup.object().shape({
  user_id: Yup.string().required("user name is required"),
  custom_days: Yup.number()
    .integer("Should be a integer not a decimal")
    .typeError("")
    .nullable(),
  business_builder_id: Yup.string().required("Business builder is required"),
  amount: Yup.number()
    .required("Amount is required")
    .typeError("Select a month"),
});

export const businessBuilderDefaultValue = {
  user_id: "",
  amount: "",
  buffer_amount: "",
  period_month: "",
  custom_days: "",
  business_builder_id: "",
  is_with_points: 1,
};
const useBusinessBuilderForm = () => {
  return useForm({
    resolver: yupResolver(schema),
    businessBuilderDefaultValue,
  });
};

export default useBusinessBuilderForm;
