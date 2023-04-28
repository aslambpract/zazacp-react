import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useSnackbar } from "notistack";

import {
  FormProvider,
  RHFEditor,
  RHFTextField,
} from "src/components/hook-form";
import useErrors from "src/hooks/useErrors";
import useLocales from "src/hooks/useLocales";
import axiosInstance from "src/utils/axios";
import useGetTicketById from "../../hooks/useGetTicketById";
import useTicketForm from "../../hooks/useTicketForm";
import Category from "./components/Category";
import Departments from "./components/Departments";
import Priorities from "./components/Priorities";
import Status from "./components/Status";
import Users from "./components/users";

const Form = ({ methods, onSubmit, onClose }) => {
  const { translate } = useLocales();
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <DialogTitle id="responsive-dialog-title">
        {" "}
        {translate("adminCommunication.helpCenter.createATicket")}{" "}
      </DialogTitle>
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
            <Users />
            <RHFTextField
              name="subject"
              label={translate("adminCommunication.helpCenter.subjects")}
            />
            <RHFEditor simple name="description" />
          </Box>
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
            <Priorities />
            <Departments />
            <Category />
            <Status />
            <RHFTextField
              fullWidth
              multiline
              rows={3}
              name="content"
              placeholder={translate("adminCommunication.helpCenter.content")}
            />
            <TextField
              {...methods.register("attachments_url")}
              label={translate("adminCommunication.helpCenter.documents")}
              type="file"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          {translate("adminCommunication.helpCenter.cancel")}
        </Button>
        <Button type="submit" variant="contained" autoFocus>
          {translate("adminCommunication.helpCenter.submit")}
        </Button>
      </DialogActions>
    </FormProvider>
  );
};

export const AddForm = ({ onClose }) => {
  const methods = useTicketForm();
  const handleErrors = useErrors();
  const { enqueueSnackbar } = useSnackbar();
  const onSubmit = async (inputData) => {
    const reqData = new FormData();
    const { attachments_url, ...rest } = inputData;

    Object.entries(rest).forEach(([key, value]) => reqData.append(key, value));
    reqData.append("attachments_url", attachments_url[0]);

    try {
      const { data, status } = await axiosInstance.post(
        "api/admin/support-tickets",
        reqData
      );

      if (status === 200) {
        enqueueSnackbar(data.message);
        onClose();
      }
    } catch (err) {
      handleErrors(err);
    }
  };

  return (
    <Form
      methods={methods}
      onClose={onClose}
      onSubmit={methods.handleSubmit(onSubmit)}
    />
  );
};

export const EditForm = ({ onClose, selectedId, reload }) => {
  const methods = useGetTicketById(selectedId);
  const handleErrors = useErrors();
  const { enqueueSnackbar } = useSnackbar();
  const onSubmit = async (inputData) => {
    const reqData = new FormData();
    const { attachments_url, ...rest } = inputData;

    Object.entries(rest).forEach(([key, value]) => reqData.append(key, value));
    reqData.append("attachments_url", attachments_url[0]);
    reqData.append("_method", "PUT");

    try {
      const { data, status } = await axiosInstance.post(
        `api/admin/support-tickets/${selectedId}`,
        reqData
      );

      if (status === 200) {
        onClose();
        reload();
        enqueueSnackbar(data.message);
      }
    } catch (err) {
      handleErrors(err);
    }
  };

  return (
    <Form
      methods={methods}
      onClose={onClose}
      onSubmit={methods.handleSubmit(onSubmit)}
    />
  );
};

export default Form;
