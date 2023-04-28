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


const Form = ({ methods, onSubmit, onClose, label }) => {
  const { translate } = useLocales();
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <DialogTitle id="add-categories">{label}</DialogTitle>
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
            <RHFTextField name="name" label={translate("adminCommunication.helpCenter.categoryName")} />
            <RHFTextField
              rows={3}
              fullwidth
              multiline
              name="description"
              label={translate("adminCommunication.helpCenter.descriptions")}
            />
            <Box
              sx={{
                display: "grid",
                rowGap: 3,
                columnGap: 2,
                marginTop: 3,
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                },
              }}
            >
              <RHFSelect name="active" label={translate("adminCommunication.helpCenter.status")}>
                <option value="" />
                <option value="1">{translate("adminCommunication.helpCenter.yes")}</option>
                <option value="0">{translate("adminCommunication.helpCenter.no")}</option>
              </RHFSelect>
              <RHFTextField
                type="number"
                name="sort_order"
                label={translate("adminCommunication.helpCenter.sortOrder")}
              />
            </Box>
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <LoadingButton type="submit" variant="contained">
          {translate("adminCommunication.helpCenter.submit")}
        </LoadingButton>
        <Button onClick={onClose} autoFocus color="error">
         {translate("adminCommunication.helpCenter.close")} 
        </Button>
      </DialogActions>
    </FormProvider>
  );
};

export default Form;

export const AddForm = ({ onClose, reload }) => {
  const { translate } = useLocales();
  const { methods, onSubmit } = useAddCategory(() => {
    onClose();
    reload();
  });
  return (
    <Form
      onClose={onClose}
      methods={methods}
      onSubmit={onSubmit}
      label={translate("adminCommunication.helpCenter.addCategory")}
    />
  );
};

export const EditForm = ({ onClose, reload, selectedId }) => {
  const { translate } = useLocales();
  const { methods, onSubmit } = useEditCategory(selectedId, () => {
    onClose();
    reload();
  });

  return (
    <Form
      onClose={onClose}
      methods={methods}
      onSubmit={onSubmit}
      label={translate("adminCommunication.helpCenter.editCategory")}
    />
  );
};
