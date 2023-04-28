import { Box, Button, DialogActions } from "@mui/material";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FormProvider, RHFTextField } from "src/components/hook-form";
import { object, string } from "yup";
import useLocales from "src/hooks/useLocales";


const schema = object().shape({
  firstName: string().required("First Name is required"),
  lastName: string().required("Last Name is required"),
  email: string().required("Email is required"),
});

const NewUser = ({ onClose, addToCard }) => {
  const { translate } = useLocales();
  const methods = useForm({ resolver: yupResolver(schema) });
  const onSubmit = () => {
    addToCard();
    onClose();
    console.log("submitting...");
  };
  return (
    <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <Box
        sx={{
          // TODO: Need to change this margin only a hack
          marginTop: "1rem",
          display: "grid",
          gap: 3,
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(2, 1fr)",
          },
        }}
      >
        <RHFTextField label= {translate("profuctDetails.firstName")} name="firstName" />
        <RHFTextField label= {translate("profuctDetails.lastName")} name="lastName" />
        <RHFTextField label= {translate("profuctDetails.email")} type="email" name="email" />
      </Box>
      <DialogActions>
        <Button autoFocus variant="contained" type="submit">
        {translate("profuctDetails.buy")} 
        </Button>
        <Button onClick={onClose} autoFocus>
        {translate("profuctDetails.cancel")}
        </Button>
      </DialogActions>
    </FormProvider>
  );
};

export default NewUser;
