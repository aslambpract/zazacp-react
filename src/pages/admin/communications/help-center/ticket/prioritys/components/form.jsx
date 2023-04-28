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
  RHFEditor,
  RHFTextField,
} from "src/components/hook-form";
import useAddPriority from "../hooks/useAddPriority";
import useEditPriority from "../hooks/useEditPriority";
import useLocales from "src/hooks/useLocales";


const Form = ({ methods, label, onSubmit, onClose }) => {
  const { translate } = useLocales();
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <DialogTitle id="add-priority">{label}</DialogTitle>
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
                sm: "repeat(2, 1fr)",
              },
            }}
          >
            <RHFTextField name="name" label={translate("adminCommunication.helpCenter.Priorities")} />
            <RHFTextField type="color" name="color" label={translate("adminCommunication.helpCenter.priorityColors")}  />
          </Box>
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
            <RHFTextField
              rows={3}
              multiline
              name="description"
              simple
              placeholder={translate("adminCommunication.helpCenter.descriptions")} 
            />
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

export const AddForm = ({ refresh, onClose }) => {
  const { translate } = useLocales();
  const { methods, onSubmit } = useAddPriority(() => {
    refresh();
    onClose();
  });

  return (
    <Form
      label={translate("adminCommunication.helpCenter.addPriority")} 
      methods={methods}
      onSubmit={onSubmit}
      onClose={onClose}
    />
  );
};
export const EditForm = ({ editId, refresh, onClose }) => {
  const { translate } = useLocales();
  const { methods, onSubmit } = useEditPriority(editId, () => {
    refresh();
    onClose();
  });

  return (
    <Form
      label={translate("adminCommunication.helpCenter.editPriority")} 
      methods={methods}
      onSubmit={onSubmit}
      onClose={onClose}
    />
  );
};
