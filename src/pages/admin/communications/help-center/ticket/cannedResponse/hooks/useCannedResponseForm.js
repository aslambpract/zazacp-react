import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const Index = Yup.object().shape({
  title: Yup.string().required("Title Name is required"),
  subject: Yup.string().required("Subject is required"),
  message: Yup.string().required("Description is required"),
});

const defaultValues = {
  title: "",
  subject: "",
  message: "",
  active: 1,
};

const useCannedResponseForm = () =>
  useForm({
    resolver: yupResolver(Index),
    defaultValues,
  });

export default useCannedResponseForm;
