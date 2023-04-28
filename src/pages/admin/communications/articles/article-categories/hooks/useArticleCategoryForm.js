import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  name: Yup.string().required("Article Name is required"),
  description: Yup.string().required("Description is required"),
});

const defaultValues = {
  name: "",
  description: "",
  active: 0,
};

const useArticleCategoryForm = () => {
  return useForm({
    resolver: yupResolver(Schema),
    defaultValues,
  });
};

export default useArticleCategoryForm;
