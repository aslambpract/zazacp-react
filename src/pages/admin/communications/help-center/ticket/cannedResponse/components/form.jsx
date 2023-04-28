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
  RHFEditor,
} from "src/components/hook-form";
import useAddCannedResponse from "../hooks/useAddCannedResponse";
import useEditCannedResponse from "../hooks/useEditCannedResponse";
import useLocales from "src/hooks/useLocales";


const Form = ({ methods, onSubmit, onClose, label }) => {
  const { translate } = useLocales();
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <DialogTitle id="canned-response">{label}</DialogTitle>
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
            <RHFTextField name="title" label={translate("adminCommunication.helpCenter.cannedResponseTitle")} />
            <RHFTextField name="subject" label={translate("adminCommunication.helpCenter.cannedResponseSubject")} />
            <RHFEditor
              name="message"
              simple
              placeholder={translate("adminCommunication.helpCenter.cannedResponseMessage")}
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

export default Form;

export const AddForm = ({ onClose, reload }) => {
  const { translate } = useLocales();
  const { methods, onSubmit } = useAddCannedResponse(() => {
    onClose();
    reload();
  });
  return (
    <Form
      onClose={onClose}
      methods={methods}
      onSubmit={onSubmit}
      label={translate("adminCommunication.helpCenter.addCannedResponse")}
    />
  );
};

export const EditForm = ({ onClose, reload, selectedId }) => {
  const { translate } = useLocales();
  const { methods, onSubmit } = useEditCannedResponse(selectedId, () => {
    onClose();
    reload();
  });

  return (
    <Form
      onClose={onClose}
      methods={methods}
      onSubmit={onSubmit}
      label={translate("adminCommunication.helpCenter.editCannnedResponse")}
    />
  );
};
