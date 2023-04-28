import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const Index = Yup.object().shape({
  name: Yup.string().required(" Name is required"),
  sort_order: Yup.string().required("Sort Order is required"),
});

const defaultValues = {
  name: "",
  sort_order: "",
  active: 1,
  type: "product",
};

const useCategoriesForm = () => {
  return useForm({
    resolver: yupResolver(Index),
    defaultValues,
  });
};

export default useCategoriesForm;
