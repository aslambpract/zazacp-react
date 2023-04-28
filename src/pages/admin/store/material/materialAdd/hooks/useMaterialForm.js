import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export const UrlSchema =
  /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;

const schema = yup.object().shape({
  product_list: yup.array().min(1, "Select at least one product"),
  category_id: yup.string().required("Select a category"),
  description: yup.string().required("Description is required"),
  video: yup
    .string()
    .required("Video url is required")
    .matches(UrlSchema, "Video must me a url"),
  video_title: yup.string().required("Video title is required"),
  video_access_time: yup
    .string()
    .required("Video access time is required")
    .nullable(),
  doc_title: yup.string().required("Document title is required"),
  doc_access_time: yup
    .string()
    .required("Document access time is required")
    .nullable(),
  doc: yup
    .mixed()
    .test("isFile", "Select an doc", (value) => Boolean(value?.length)),
});

const defaultValues = {
  product_list: [],
  active: 1,
  name: "material",
  category_id: "",
  description: "",
  doc: "",
  video: "",
  video_title: "",
  video_access_time: "",
  doc_title: "",
  doc_access_time: "",
};
const useMaterialForm = () => {
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  return methods;
};

export default useMaterialForm;
