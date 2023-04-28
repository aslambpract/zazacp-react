import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import fetchUser from "src/utils/fetchUser";
import { number, object, string } from "yup";

const defaultValues = {
  amount: "",
  coin_id: "",
};

const schema = (minimumWithdrawal) =>
  object().shape({
    amount: number()
      .typeError("Amount is required")
      .min(
        minimumWithdrawal,
        `Minium withdrawal amount is ${minimumWithdrawal}`
      )
      .required("Amount is required"),

    coin_id: string().required("Coin Type is required"),
  });

const useRequestForm = (minimumWithdrawal) => {
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema(minimumWithdrawal)),
  });

  const onSubmit = async (inputData) => {
    const reqData = new FormData();
    Object.entries(inputData).forEach(([key, value]) =>
      reqData.append(key, value)
    );

    try {
      const { status, message } = await (
        await fetchUser.post("payout-request", reqData)
      ).data;
      if (status) {
        enqueueSnackbar(message);
      }
    } catch (err) {
      enqueueSnackbar(err.message, { variant: "error" });
    }
  };

  return { methods, onSubmit: methods.handleSubmit(onSubmit) };
};

export default useRequestForm;
