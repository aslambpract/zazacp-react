import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { mixed, number, object, string } from "yup";

export const NewUserSchema = object().shape({
  first_name: string()
    .required("First Name is  required field")
    .matches(/^[a-z\s]+$/i, "Must only contain alphabets")
    .nullable(),
  last_name: string()
    .required("Last Name is a required field")
    .matches(/^[a-z\s]+$/i, "Must only contain alphabets")
    .nullable(),
  mobile: number()
    .typeError("Enter a valid phone number")
    .required("Mobile is required")
    .nullable(),
  gender: string().required("Gender is required").nullable(),
  zipcode: string().required("Zipcode is required").nullable(),
  country: string().required("Country is required").nullable(),
  state: string()
    .required("State is required")
    .matches(/^[a-z\s]+$/i, "Must only contain alphabets")
    .nullable(),
  city: string()
    .required("City is required")
    .matches(/^[a-z\s]+$/i, "Must only contain alphabets")
    .nullable(),
  whatsapp: string()
    .matches(/^[0-9]*$/, "Must be only digits")
    .typeError()
    .test(
      "number-check",
      "The number must be of length between 4 and 13",
      (number) =>
        (number.length >= 4 && number.length <= 13) || number.length === 0
    ),
  medium: string().url("Enter a valid url").nullable(),
  facebook: string().url("Enter a valid url").nullable(),
  twitter: string().url("Enter a valid url").nullable(),
  instagram: string().url("Enter a valid url").nullable(),
  profile_image: mixed().test(
    "required",
    "Avatar is required",
    (value) => value !== ""
  ),
});

const defaultValues = {
  first_name: "",
  last_name: "",
  mobile: "",
  gender: "",
  zipcode: "",
  address: "",
  country: "",
  state: "",
  city: "",
  facebook: "",
  twitter: "",
  instagram: "",
  telegram: "",
  whatsapp: "",
  profile_image: "",
  social: {
    scope_phone: 0,
    scope_email: 0,
    scope_facebook: 0,
    scope_twitter: 0,
    scope_whatsapp: 0,
    scope_instagram: 0,
    scope_telegram: 0,
    scope_medium: 0,
  },
};

const useUserForm = () => {
  return useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });
};

export default useUserForm;
