import { useForm } from "react-hook-form";

const defaultValues = {
  start_date: "",
  end_date: "",
  user_id: "",
};

const useFilterForm = () => {
  return useForm({
    defaultValues,
  });
};

export default useFilterForm;
