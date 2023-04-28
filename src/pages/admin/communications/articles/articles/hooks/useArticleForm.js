import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  category_id: Yup.string().required("Category is required"),
});

const defaultValues = {
  title: "",
  description: "",
  category_id: "",
  active: 1,
};

const useArticleForm = () => {
  return useForm({
    resolver: yupResolver(Schema),
    defaultValues,
  });
};

export default useArticleForm;
