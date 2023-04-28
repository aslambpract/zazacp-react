import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormProvider, RHFTextField } from "src/components/hook-form";
import useErrors from "src/hooks/useErrors";
import useLocales from "src/hooks/useLocales";
import axiosInstance from "src/utils/axios";
import * as yup from "yup";

const validatorSchema = yup.object().shape({
  username: yup.string().required("User Name is required"),
  new_username: yup.string().required("New User Name is required"),
});

const defaultValues = {
  username: "",
  new_username: "",
  _method: "PUT",
};

const EditUserNameDialog = ({ username, onClose, fetchData, open }) => {
  const { translate } = useLocales();
  const theme = useTheme();
  const handleErrors = useErrors();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(validatorSchema),
  });

  const onSubmit = async (inputData) => {
    const reqData = new FormData();
    [...Object.entries(inputData)].forEach(([key, value]) =>
      reqData.append(key, value)
    );

    try {
      const { status, data } = await axiosInstance.post(
        "api/change-user-username",
        reqData
      );
      if (status === 200) {
        fetchData();
        onClose();
        enqueueSnackbar(data.message);
        methods.setValue("new_username", "");
      }
    } catch (err) {
      handleErrors(err);
    }
  };

  useEffect(() => {
    if (username) methods.setValue("username", username);
  }, [username]);
  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={onClose}
      aria-labelledby="change-username"
    >
      <DialogTitle id="change-username">
        {translate("adminMembersManagement.networkMembers.changeUserName")}
      </DialogTitle>
      <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
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
              <RHFTextField
                name="username"
                label={translate(
                  "adminMembersManagement.networkMembers.currentUserName"
                )}
                disabled
              />
              <RHFTextField
                name="new_username"
                label={translate(
                  "adminMembersManagement.networkMembers.newUserName"
                )}
              />
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={methods.formState.isSubmitting}
          >
            {translate("adminMembersManagement.networkMembers.update")}
          </LoadingButton>

          <Button onClick={onClose} autoFocus color="error">
            {translate("adminMembersManagement.networkMembers.close")}
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

export default EditUserNameDialog;
