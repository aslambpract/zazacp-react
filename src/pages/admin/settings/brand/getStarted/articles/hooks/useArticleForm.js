import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

export const articleDefaultValues = {
  section_id: "",
  menu_name: "",
  content: "",
  sort_order: "",
  active: 1,
};

const ArticleSchema = Yup.object().shape({
  section_id: Yup.string().required("Section is required"),
  menu_name: Yup.string().required("Menu name is required"),
  content: Yup.string().required("Description is required"),
  sort_order: Yup.number()
    .typeError("Should be a number")
    .min(1)
    .required("Sort order is required"),
});

const useArticleForm = () => {
  return useForm({
    resolver: yupResolver(ArticleSchema),
    articleDefaultValues,
  });
};

export default useArticleForm;
