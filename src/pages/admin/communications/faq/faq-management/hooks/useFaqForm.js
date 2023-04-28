import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  category_id: Yup.string().required("Category Name is required"),
  question: Yup.string().required("Question is required"),
  answer: Yup.string().required("Answer is required"),
});

const defaultValues = {
  category_id: "",
  question: "",
  answer: "",
  active: 1,
};
const useFaqForm = () => {
  return useForm({
    resolver: yupResolver(Schema),
    defaultValues,
  });
};

export default useFaqForm;
