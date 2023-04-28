import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import useErrors from "src/hooks/useErrors";
import fetchUser from "src/utils/fetchUser";
import { mixed, number, object } from "yup";

const defaultValues = {
  wallet: "",
  amount: "",
  user_id: "",
  note: "",
};

const schema = object().shape({
  wallet: mixed()
    .oneOf(["ewallet", "deposit_wallet"], "Please choose a wallet")
    .required("Please choose a from wallet"),

  amount: number()
    .min(1, "The minimum amount should be 1")
    .typeError("Please enter a valid number")
    .required("Please choose an amount"),

  user_id: number()
    .typeError("Please select a user")
    .required("Please select a user"),
});

const useFundForm = (refetch) => {
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const onSubmit = async (inputData) => {
    const reqData = new FormData();
    Object.entries(inputData).forEach(([key, value]) =>
      reqData.append(key, value)
    );
    try {
      const { message, status } = await (
        await fetchUser.post("fund-transfer", reqData)
      ).data;

      if (status) {
        enqueueSnackbar(message);
        methods.reset(defaultValues);
        refetch();
      }
    } catch (err) {
      enqueueSnackbar(err.message, { variant: "error" });
      console.error(err);
    }
  };

  return { methods, onSubmit: methods.handleSubmit(onSubmit) };
};

export default useFundForm;
