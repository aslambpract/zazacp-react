import { Box, Button, DialogActions } from "@mui/material";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { FormProvider, RHFTextField } from "src/components/hook-form";
import { object, string } from "yup";
import useLocales from "src/hooks/useLocales";


const schema = object().shape({
  user_id: string().required("User name is required"),
});

const ExistingUser = ({ onClose, addToCart }) => {
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
        <RHFTextField label="User name" name="user_id" />
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

export default ExistingUser;
