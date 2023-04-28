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
  IconButton,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormProvider, RHFTextField } from "src/components/hook-form";
import Iconify from "src/components/Iconify";
import useErrors from "src/hooks/useErrors";
import useLocales from "src/hooks/useLocales";
import axiosInstance from "src/utils/axios";
import * as Yup from "yup";

const validationSchema = Yup.object({
  username: Yup.string().required("User Name is required"),
  password: Yup.string().min(8).required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const defaultValues = {
  username: "",
  password: "",
  confirmPassword: "",
  _method: "PUT",
};

const UpdatePasswordDialog = ({ open, username, onClose, fetchData }) => {
  const { translate } = useLocales();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { enqueueSnackbar } = useSnackbar();
  const handleErrors = useErrors();
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const onSubmit = async (inputData) => {
    const reqData = new FormData();
    delete inputData.confirmPassword;

    [...Object.entries(inputData)].forEach(([key, value]) =>
      reqData.append(key, value)
    );

    try {
      const { status, data } = await axiosInstance.post(
        "api/change-user-password",
        reqData
      );
      if (status === 200) {
        fetchData();
        onClose();
        enqueueSnackbar(data.message);
      }
    } catch (err) {
      handleErrors(err);
    }
  };

  useEffect(() => {
    if (username) methods.setValue("username", username);
  }, [username]);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

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
        {translate("adminMembersManagement.networkMembers.changePassword")}
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
                  "adminMembersManagement.networkMembers.userName"
                )}
                disabled
              />
              <RHFTextField
                name="password"
                label={translate(
                  "adminMembersManagement.networkMembers.password"
                )}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <Iconify
                          icon={
                            showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                          }
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <RHFTextField
                name="confirmPassword"
                label={translate(
                  "adminMembersManagement.networkMembers.confirmPassword"
                )}
                type={showRePassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => setShowRePassword(!showRePassword)}
                      >
                        <Iconify
                          icon={
                            showRePassword ? "eva:eye-fill" : "eva:eye-off-fill"
                          }
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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
            {translate("adminMembersManagement.networkMembers.edit")}
          </LoadingButton>

          <Button onClick={onClose} autoFocus color="error">
            {translate("adminMembersManagement.networkMembers.close")}
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

export default UpdatePasswordDialog;
