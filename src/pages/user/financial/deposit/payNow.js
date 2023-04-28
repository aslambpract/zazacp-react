import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Card } from "@mui/material";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { FormProvider, RHFTextField } from "src/components/hook-form";
import useErrors from "src/hooks/useErrors";
import useLocales from "src/hooks/useLocales";
import fetchUser from "src/utils/fetchUser";
import { number, object } from "yup";

const genSchema = (limit) => {
  const schema = object().shape({
    amount: number()
      .typeError("The amount should be a number")
      .min(1, "The amount should be at least 1")
      .max(limit, `The amount should be less than ${limit}`)
      .required("Amount is required"),
  });

  return schema;
};

const PayNow = ({ balance }) => {
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const handleErrors = useErrors();

  const methods = useForm({
    defaultValues: { amount: "" },
    resolver: yupResolver(genSchema(balance)),
  });

  const onSubmit = async (inputData) => {
    const reqData = new FormData();
    reqData.append("amount", inputData.amount);

    try {
      const { message, status } = await (
        await fetchUser.post("deposit-wallet", reqData)
      ).data;

      if (status) {
        enqueueSnackbar(message);
        methods.reset({ amount: "" });
      }
    } catch (err) {
      console.log(err);
      handleErrors(err);
    }
  };

  return (
    <>
      <Card sx={{ p: 3 }}>
        <Box>
          <FormProvider
            methods={methods}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <Box
              sx={{
                display: "grid",
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(4, 1fr)",
                },
              }}
            >
              <RHFTextField
                type="number"
                name="amount"
                label={translate("userFinancial.depositWallet.amount")}
              />
              <Box sx={{ display: "flex" }}>
                <Button variant="contained" type="submit">
                  {translate("userFinancial.depositWallet.addCredit")}
                </Button>
              </Box>
            </Box>
          </FormProvider>
        </Box>
      </Card>
    </>
  );
};

export default PayNow;
