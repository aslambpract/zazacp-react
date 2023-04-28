import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const DataTable = Yup.object().shape({
  name: Yup.string().required("Category Name is required"),
  description: Yup.string().required("Description is required"),
});

const defaultValues = {
  name: "",
  description: "",
  active: 1,
};
const useCategoryForm = () => {
  return useForm({
    resolver: yupResolver(DataTable),
    defaultValues,
  });
};

export default useCategoryForm;
