import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from "src/components/hook-form";
import useAdd from "../hooks/useAdd";
import useEdit from "../hooks/useEdit";
import useLocales from "src/hooks/useLocales";


const Form = ({ methods, onSubmit, onClose, label }) => {
  const { translate } = useLocales();
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <DialogTitle id="add-business">{label}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Box
            sx={{
              display: "grid",
              rowGap: 3,
              columnGap: 2,
              marginTop: 3,
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(1, 1fr)",
              },
            }}
          >
            <RHFTextField name="name" label={translate("adminSettings.businessBuilder.name")} />
            <RHFTextField name="amount" label={translate("adminSettings.businessBuilder.amount")} type="number" />
            <RHFTextField name="bv" label={translate("adminSettings.businessBuilder.Bv")}/>
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <LoadingButton type="submit" variant="contained">
          {translate("adminSettings.businessBuilder.submit")}
        </LoadingButton>
        <Button onClick={onClose} autoFocus color="error">
         {translate("adminSettings.businessBuilder.close")} 
        </Button>
      </DialogActions>
    </FormProvider>
  );
};

export default Form;

export const AddForm = ({ onClose, reload }) => {
  const { translate } = useLocales();
  const { methods, onSubmit } = useAdd(() => {
    onClose();
    reload();
  });
  return (
    <Form
      onClose={onClose}
      methods={methods}
      onSubmit={onSubmit}
      label={translate("adminSettings.businessBuilder.addBusinessBuilder")}
    />
  );
};

export const EditForm = ({ onClose, reload, selectedId }) => {
  const { translate } = useLocales();
  const { methods, onSubmit } = useEdit(selectedId, () => {
    onClose();
    reload();
  });

  return (
    <Form
      onClose={onClose}
      methods={methods}
      onSubmit={onSubmit}
      label={translate("adminSettings.businessBuilder.editBusinessBuilder")}
    />
  );
};
