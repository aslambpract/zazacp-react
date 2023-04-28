import { Box, Button, DialogActions } from "@mui/material";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FormProvider, RHFTextField } from "src/components/hook-form";
import { object, string } from "yup";
import useLocales from "src/hooks/useLocales";

const schema = object().shape({
  user_id: string().required("User name is required"),
});

export const ExistingUser = ({ onClose, addToCart }) => {
  const { translate } = useLocales();
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = () => {
    console.log("Submitting...");
    addToCart();
    onClose();
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
            sm: "repeat(1, 1fr)",
            md: "repeat(1, 1fr)",
            lg: "repeat(1, 1fr)",
          },
        }}
      >
        <RHFTextField label={translate("userOnlineStore.userName")}   name="user_id" />
      </Box>

      <DialogActions>
        <Button autoFocus variant="contained" type="submit">
         {translate("buy")}   
        </Button>
        <Button onClick={onClose} autoFocus>
          {translate("cancel")}  
        </Button>
      </DialogActions>
    </FormProvider>
  );
};

const newUserSchema = object().shape({
  firstName: string().required("First Name is required"),
  lastName: string().required("Last Name is required"),
  email: string().required("Email is required"),
});

export const NewUser = ({ onClose, addToCard }) => {
  const { translate } = useLocales();
  const methods = useForm({ resolver: yupResolver(newUserSchema) });
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
        <RHFTextField label={translate("firstName")}  name="firstName" />
        <RHFTextField label={translate("lastName")}   name="lastName" />
        <RHFTextField label={translate("email")}   type="email" name="email" />
      </Box>
      <DialogActions>
        <Button autoFocus variant="contained" type="submit">
         {translate("buy")}   
        </Button>
        <Button onClick={onClose} autoFocus>
         {translate("cancel")}   
        </Button>
      </DialogActions>
    </FormProvider>
  );
};
