import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { capitalCase } from "change-case";
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from "src/components/hook-form";
import useLocales from "src/hooks/useLocales";
import useAdd from "../hooks/useAdd";
import useEdit from "../hooks/useEdit";

const Form = ({ methods, onSubmit, onClose, label }) => {
  const { translate } = useLocales();
  const {
    formState: { isSubmitting },
  } = methods;

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <DialogTitle id="add-question">{label}</DialogTitle>
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
            <RHFTextField name="title" label={translate("question")} />
            <RHFTextField
              name="description"
              label={capitalCase(translate("answer"))}
              rows={3}
              multiline
              fullwidth
            />
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus color="error" variant="outlined">
          {translate("adminStore.products.close")}
        </Button>
        <LoadingButton loading={isSubmitting} type="submit" variant="contained">
          {translate("adminStore.products.submit")}
        </LoadingButton>
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
      label={translate("adminStore.products.addProductQuestion")}
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
      label={translate("adminStore.products.editProductQuestions")}
    />
  );
};
