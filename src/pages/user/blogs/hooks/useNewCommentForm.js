import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import fetchUser from "src/utils/fetchUser";
import * as Yup from "yup";

const schema = Yup.object().shape({
  comment: Yup.string().required("Comment is required"),
  title: Yup.string().required("Title is required"),
  rating: Yup.number()
    .max(5, "The maximum possible rating is 5")
    .required("Email is required"),
});

const defaultValues = {
  comment: "",
  title: "",
  blog_id: "",
  rating: 5,
};

const useNewCommentForm = (reload) => {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { reset, setValue } = methods;

  const onSubmit = async (inputData) => {
    const reqData = new FormData();
    Object.entries(inputData).forEach(([key, value]) =>
      reqData.append(key, value)
    );
    try {
      const { status, message } = await (
        await fetchUser.post("blog-review", reqData)
      ).data;
      if (status) {
        enqueueSnackbar(message);
        reload(id);
        reset({ ...defaultValues, blog_id: id });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setValue("blog_id", id);
  }, [id]);

  return { methods, onSubmit: methods.handleSubmit(onSubmit) };
};

export default useNewCommentForm;
