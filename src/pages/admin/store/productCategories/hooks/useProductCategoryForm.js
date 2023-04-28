import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { number, object, string } from "yup";

const Validator = object().shape({
  name: string().required("Category is required"),
  active: number().required("Status is required"),
});

const defaultValues = {
  name: "",
  active: 1,
};

const useProductCategoryForm = () => {
  return useForm({
    resolver: yupResolver(Validator),
    defaultValues,
  });
};
export default useProductCategoryForm;
