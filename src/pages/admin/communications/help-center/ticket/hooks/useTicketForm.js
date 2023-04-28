import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const Index = Yup.object().shape({
  description: Yup.string().required("Description Name is required"),
});

const defaultValues = {
  user_id: "",
  subject: "",
  description: "",
  priority_id: "",
  department_id: "",
  category_id: "",
  status: "",
  attachments_url: "",
  content: "",
  active: 1,
};

const useTicketForm = () =>
  useForm({
    resolver: yupResolver(Index),
    defaultValues,
  });

export default useTicketForm;
