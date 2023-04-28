import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const AddSubAdminSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  mobile: Yup.string()
    .required("Mobile Number is required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(20, "Must be exactly 20 digits"),

  group_id: Yup.string().required("User Group is required"),
  email: Yup.string()
    .email("email address is required")
    .required("email address is required"),
  is_impersonation: Yup.number().required("Impersonation is required"),
  username: Yup.string().required("User Name is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("New Password is required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  department_ids: Yup.array().min(1, "Select at least one department"),
  product_ids: Yup.array().min(1, "Select at least one Product"),
});

const EditSubAdminSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  mobile: Yup.string()
    .required("Mobile Number is required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(20, "Must be exactly 20 digits"),
  group_id: Yup.string().required("User Group is required"),
  email: Yup.string()
    .email("Enter a valid email address")
    .required("email address is required"),
  is_impersonation: Yup.number()
    .typeError("Choose a value")
    .required("Impersonation is required"),
  username: Yup.string().required("User Name is required"),
  department_ids: Yup.array().min(1, "Select at least one department"),
  product_ids: Yup.array().min(1, "Select at least one Product"),
});

const defaultValues = {
  name: "",
  mobile: "",
  product_ids: [],
  department_ids: [],
  group_id: "",
  email: "",
  is_impersonation: 0,
  active: 0,
  username: "",
  password: "",
  confirmPassword: "",
};

const useSubAdminForm = (isEdit = false) => {
  return useForm({
    resolver: yupResolver(isEdit ? EditSubAdminSchema : AddSubAdminSchema),
    defaultValues,
  });
};

export default useSubAdminForm;
