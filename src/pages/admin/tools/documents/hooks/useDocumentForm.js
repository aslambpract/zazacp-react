import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const ValidationSchema = yup.object().shape({
  title: yup.string().required(),
  sort_order: yup
    .number()
    .required("Sort order is required")
    .integer("Sort order must be an integer")
    .typeError("Should be a number"),
  document_url: yup
    .mixed()
    .test("isFile", "Select an Doc", (value) => Boolean(value.length)),
});

export const documentFormDefaultValues = {
  title: "",
  sort_order: "",
  document_url: "",
};

const useDocumentForm = () => {
  return useForm({
    documentFormDefaultValues,
    resolver: yupResolver(ValidationSchema),
  });
};

export default useDocumentForm;
