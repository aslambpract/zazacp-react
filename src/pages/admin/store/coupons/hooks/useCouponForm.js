import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import getNextDate from "src/utils/getNextDate";

const CouponAddSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  code: Yup.string().required("Code is required"),
  type: Yup.string().required("Type is required"),
  discount: Yup.number()
    .typeError("Discount is required")
    .min(0, "Amount should be at least zero")
    .required("Discount is required"),
  total_amount: Yup.number()
    .typeError("Total amount is required")
    .min(0, "Amount should be at least zero")
    .required("Total amount is required"),
  uses_per_coupon: Yup.number()
    .integer("Should not contain decimal value")
    .min(0, "Amount should be at least zero")
    .required("Users per coupon is required")
    .typeError("Uses per coupon is required"),
  uses_per_customer: Yup.number()
    .integer("Should not contain decimal value")
    .min(0, "Amount should be at least zero")
    .required("Uses per customer is required")
    .typeError("Uses per Customer is required"),
  start_date: Yup.string()
    .typeError("Start date is required")
    .required("Start date is required"),
  end_date: Yup.string()
    .typeError("End Date is required")
    .required("End Date is required"),
  product_ids: Yup.array().min(1, "Select at least one product"),
});

const defaultValues = {
  product_ids: [],
  name: "",
  code: "",
  type: "",
  discount: "",
  total_amount: "",
  uses_per_coupon: "",
  uses_per_customer: "",
  start_date: new Date(),
  end_date: getNextDate(),
  active: 1,
};

const useCouponForm = () => {
  console.log(getNextDate());
  return useForm({
    resolver: yupResolver(CouponAddSchema),
    defaultValues,
  });
};

export default useCouponForm;
