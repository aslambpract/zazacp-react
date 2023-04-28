import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

const PrioritySchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  color: Yup.string().required("Color is required"),
});

const defaultValues = {
  name: "",
  description: "",
  sort_order: 1,
  active: 1,
  color: "",
};

const usePriorityForm = () => {
  const methods = useForm({
    resolver: yupResolver(PrioritySchema),
    defaultValues,
  });
  useEffect(
    () => () => {
      methods.reset(defaultValues);
    },
    []
  );
  return methods;
};

export default usePriorityForm;
