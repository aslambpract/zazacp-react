import { useForm } from "react-hook-form";

const defaultValues = {
  product: "",
  username: "",
  certified_date: "",
  note: "",
};
const useSubScriptionForm = () => {
  return useForm({
    defaultValues,
  });
};

export default useSubScriptionForm;
