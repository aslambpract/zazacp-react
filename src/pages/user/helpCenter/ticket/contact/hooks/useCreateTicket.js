import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { PATH_USER } from "src/routes/paths";
import fetchUser from "src/utils/fetchUser";
import { mixed, object, string } from "yup";

const schema = object().shape({
  department_id: string()
    .typeError("Please Select a document")
    .required("Please select a document"),

  priority_id: string()
    .typeError("Please Select a priority")
    .required("Please select a priority"),

  category_id: string()
    .typeError("Please Select a category")
    .required("Please select a category"),
  subject: string().required("Subject is required"),
  content: string().required("Content is required"),
  description: string().required("Description is required"),
  attachments_url: mixed().test("isFile", "Select a file", (value) =>
    Boolean(value.length)
  ),
});

const defaultValues = {
  subject: "",
  description: "",
  priority_id: null,
  department_id: null,
  category_id: null,
  content: "",
  description: "",
  active: 1,
  attachments_url: "",
};

const useCreateTicket = () => {
  const methods = useForm({ defaultValues, resolver: yupResolver(schema) });
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const onSubmit = methods.handleSubmit(async (inputData) => {
    const { attachments_url, ...rest } = inputData;
    const reqData = new FormData();
    Object.entries(rest).forEach(([k, v]) => reqData.append(k, v));
    const [file] = attachments_url;
    const FILE_SIZE = 2048000;
    if (file.size < FILE_SIZE) {
      reqData.append("attachments_url", file);
    } else {
      methods.setError("attachments_url", {
        message: `The file size should be less than ${FILE_SIZE}KB`,
      });
      return;
    }
    console.log(file.size);
    try {
      const { status, message } = await (
        await fetchUser.post("support-tickets", reqData)
      ).data;
      if (status) {
        enqueueSnackbar(message);
        navigate(PATH_USER.helpCenter.createTicket.new);
      }
    } catch (err) {
      console.error(err);
    }
  });

  return { methods, onSubmit };
};

export default useCreateTicket;
