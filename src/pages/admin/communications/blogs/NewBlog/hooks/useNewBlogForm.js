import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const defaultValues = {
  title: "",
  category_id: "",
  type: "Private",
  document_url: null,
  image: [],
  meta_description: "",
  short_description: "",
  meta_keywords: "",
  content: "",
};

const schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  category_id: Yup.string().required("Category is required"),
  meta_keywords: Yup.string().required("Meta Keywords is required"),
  meta_description: Yup.string().required("Meta Description is required"),
  short_description: Yup.string().required("Short Description is required"),

  image: Yup.mixed().test("isFile", "Select an image", (value) =>
    Boolean(value.length)
  ),
  product_id: Yup.string().when("type", {
    is: "Private",
    then: Yup.string().required("Product is required"),
  }),
});
const addSchema = schema.shape({
  document_url: Yup.mixed().test("isFile", "Select a doc", (value) =>
    Boolean(value?.length)
  ),
});

const useNewBlogForm = (isAdd) => {
  return useForm({
    resolver: yupResolver(isAdd ? addSchema : schema),
    defaultValues,
  });
};

export default useNewBlogForm;
