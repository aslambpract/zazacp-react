import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import useAuth from "src/hooks/useAuth";
import * as Yup from "yup";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Email must be a valid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const defaultValues = {
  email: "",
  password: "",
  remember: true,
};

const useLogin = () => {
  const { login, getUser } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { reset, setError, handleSubmit } = methods;

  const onSubmit = async (data) => {
    const {
      status,
      data: username,
      message,
    } = await login(data.email, data.password, data.remember);
    if (status) {
      getUser();
      enqueueSnackbar(`Welcome ${username}`);
      reset();
    } else {
      setError("afterSubmit", {
        message,
      });
    }
  };

  return { methods, onSubmit: handleSubmit(onSubmit) };
};

export default useLogin;
