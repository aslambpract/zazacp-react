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
import useAddCategory from "../hooks/useAddCategory";
import useEditCategory from "../hooks/useEditCategory";
import useLocales from "src/hooks/useLocales";


const Form = ({ onClose, methods, onSubmit, label }) => {
  const { translate } = useLocales();
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <DialogTitle id="faqs-category">{label}</DialogTitle>
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
            <RHFTextField name="name" label={translate("adminCommunication.faqs.categoryName")} />
            <RHFTextField
              fullwidth
              rows={3}
              multiline
              name="description"
              label={translate("adminCommunication.faqs.description")}
            />
            <RHFSelect name="active">
              <option value={1}>{translate("adminCommunication.faqs.enabled")}</option>
              <option value={0}>{translate("adminCommunication.faqs.disabled")}</option>
            </RHFSelect>
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <LoadingButton type="submit" variant="contained">
          {translate("adminCommunication.faqs.submit")}
        </LoadingButton>
        <Button onClick={onClose} autoFocus color="error">
         {translate("adminCommunication.faqs.close")} 
        </Button>
      </DialogActions>
    </FormProvider>
  );
};

export const AddForm = ({ onClose, reload }) => {
  const { translate } = useLocales();
  const { methods, onSubmit } = useAddCategory(() => {
    onClose();
    reload();
  });
  return (
    <Form
      label={translate("adminCommunication.faqs.addFAQCategory")}
      onClose={onClose}
      methods={methods}
      onSubmit={onSubmit}
    />
  );
};

export const EditForm = ({ onClose, reload, editId }) => {
  const { translate } = useLocales();
  const { methods, onSubmit } = useEditCategory(editId, () => {
    onClose();
    reload();
  });
  return (
    <Form
      label={translate("adminCommunication.faqs.editFAQCategory")}
      onClose={onClose}
      methods={methods}
      onSubmit={onSubmit}
    />
  );
};
