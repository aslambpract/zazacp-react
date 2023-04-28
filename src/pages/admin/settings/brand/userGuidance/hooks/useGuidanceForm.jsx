import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { UrlSchema } from "src/pages/admin/store/material/materialAdd/hooks/useMaterialForm";
import { object, string } from "yup";

const Validator = object().shape({
  title: string().required("Title is required"),
  description: string().required("Description is required"),
  url: string().required("Url is required"),
});
export const guidanceDefaultValues = {
  url: "",
  title: "",
  description: "",
  active: 1,
};
const useGuidanceForm = () => {
  return useForm({
    defaultValues: guidanceDefaultValues,
    resolver: yupResolver(Validator),
  });
};

export default useGuidanceForm;
