import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { FormProvider, RHFTextField } from "src/components/hook-form";
import useErrors from "src/hooks/useErrors";
import axiosInstance from "src/utils/axios";
import * as Yup from "yup";

const ValidationSchema = Yup.object({
  username: Yup.string().required("User name is required"),
  name: Yup.string().required("Name is required"),
  email: Yup.string().required("Email is required"),
  password: Yup.string().min(8).required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const AddUser = ({ onClose, addUser }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm({
    resolver: yupResolver(ValidationSchema),
  });
  const handleErrors = useErrors();
  const onSubmit = async (inputData) => {
    const reqData = new FormData();

    Object.entries({ ...inputData, ...addUser }).forEach(([key, value]) =>
      reqData.append(key, value)
    );
    try {
      const { data, status } = await axiosInstance.post(
        "/api/register",
        reqData
      );

      if (status === 200) {
        onClose();
        enqueueSnackbar("Successfully created the user");
      }
    } catch (err) {
      handleErrors(err);
    }
  };

  return (
    <Dialog
      open={addUser.status}
      onClose={onClose}
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Add User</DialogTitle>

      <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
        <DialogContent>
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
            <RHFTextField name="username" label="User name" />
            <RHFTextField name="name" label="Enter First name" />
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
            <RHFTextField name="email" label="Enter Email" />
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
            <RHFTextField
              name="password"
              label="Enter Password"
              type="password"
            />
            <RHFTextField
              name="confirmPassword"
              label="Confirm Password"
              type="password"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

export default AddUser;
