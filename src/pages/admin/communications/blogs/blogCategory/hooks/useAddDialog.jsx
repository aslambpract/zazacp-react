import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import axiosInstance from "src/utils/axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const useAddDialog = (reload, close) => {
  const { enqueueSnackbar } = useSnackbar();

  const Index = Yup.object().shape({
    name: Yup.string().required(" Name is required"),
    description: Yup.string().required("Description is required"),
  });

  const defaultValues = {
    name: "",
    description: "",
  };

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(Index),
  });

  const onSubmit = async (inputData) => {
    const reqData = new FormData();
    Object.entries(inputData).forEach(([key, value]) =>
      reqData.append(key, value)
    );
    try {
      const { status } = await axiosInstance.post(
        "api/admin/blog-categories",
        reqData
      );

      if (status === 200) {
        reload();
        close();
        methods.reset(defaultValues);
      }
    } catch (error) {
      Object.values(error).flatMap((item) =>
        enqueueSnackbar(item, { variant: "error" })
      );
      console.error(error);
    }
  };

  return { methods, onSubmit: methods.handleSubmit(onSubmit) };
};

export default useAddDialog;
