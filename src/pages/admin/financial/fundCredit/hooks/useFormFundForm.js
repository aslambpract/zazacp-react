import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { number, object, string } from "yup";

const schema = object().shape({
  user_id: string().required("Name is required"),
  amount: number()
    .typeError("Amount should be a number")
    .required("Amount is required"),
  wallet_type: string().required("Choose To is required"),
});

const defaultValues = {
  user_id: "",
  amount: "",
  wallet_type: "",
  notes: "",
};

const useFormFundForm = () => {
  return useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });
};

export default useFormFundForm;
