import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const Index = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  active: Yup.string().required("Status is required"),
  sort_order: Yup.number()
    .typeError("Sort Order is required")
    .required("Sort Order is required"),
});

const defaultValues = {
  name: "",
  description: "",
  active: "",
  sort_order: "",
};

const useCategoriesForm = () => {
  return useForm({
    resolver: yupResolver(Index),
    defaultValues,
  });
};

export default useCategoriesForm;
