import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const Index = Yup.object().shape({
  name: Yup.string().required("Department Name is required"),
  description: Yup.string().required("Department Description is required"),
  active: Yup.string().required("Status is required"),
  sort_order: Yup.string().required("Sort Order is required"),
});

const defaultValues = {
  name: "",
  description: "",
  active: "",
  sort_order: "",
};

const useDepartmentTicketForm = () => {
  return useForm({
    resolver: yupResolver(Index),
    defaultValues,
  });
};

export default useDepartmentTicketForm;
