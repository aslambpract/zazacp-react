import { DialogContent } from "@material-ui/core";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from "src/components/hook-form";
import useLocales from "src/hooks/useLocales";
import Products from "src/pages/admin/subAdmin/active/components/Products.jsx";
import axiosInstance from "src/utils/axios";
import useSubAdminForm from "../subAdmins/hooks/useSubAdminForm";
import AdminGroups from "./components/AdminGroups";
import Departments from "./components/Departments";

const EditDialog = ({ open, selectedId, onClose, fetchData }) => {
  const { translate } = useLocales();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { enqueueSnackbar } = useSnackbar();
  const methods = useSubAdminForm(true);

  const fetchAdminData = async () => {
    try {
      const { status, data } = await axiosInstance.get(
        `api/admin/sub-admins/${selectedId}`
      );
      if (status === 200) {
        const {
          active,
          is_impersonation,
          sub_admin_departments,
          sub_admin_products,
          user,
          group_id,
        } = data.data;
        methods.reset({
          active,
          name: user?.user_profile?.first_name,
          mobile: user?.user_profile?.mobile,
          username: user?.username,
          email: user?.email,
          group_id,
          is_impersonation,
          department_ids: sub_admin_departments.map(({ id }) => id),
          product_ids: sub_admin_products.map(({ id }) => id),
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit = async (inputData) => {
    const reqData = new FormData();
    const { product_ids, department_ids, ...rest } = inputData;
    Object.entries(rest).forEach(([key, value]) => reqData.append(key, value));
    reqData.append("product_ids", `[${product_ids}]`);
    reqData.append("department_ids", `[${department_ids}]`);
    reqData.append("_method", "PUT");

    try {
      const { status, data } = await axiosInstance.post(
        `api/admin/sub-admins/${selectedId}`,
        reqData
      );

      if (status === 200) {
        fetchData();
        enqueueSnackbar(data.message);
        onClose();
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (open) fetchAdminData();
  }, [open]);

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={onClose}
      aria-labelledby="delete-subadmin"
    >
      <DialogTitle id="delete-subadmin" sx={{ mb: 2 }}>
        {translate("adminSubAdmin.subAdmin.editSubAdmin")}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <FormProvider
            methods={methods}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <Box
              sx={{
                display: "grid",
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: "repeat(2, 1fr)",
              }}
            >
              <RHFTextField
                name="name"
                type="text"
                label={translate("adminSubAdmin.subAdmin.names")}
              />
              <RHFTextField
                name="mobile"
                type="number"
                label={translate("adminSubAdmin.subAdmin.mobile")}
              />

              <Products />
              <Departments />
              <AdminGroups />

              <RHFTextField
                name="email"
                type="email"
                label={translate("adminSubAdmin.subAdmin.email")}
              />
              <RHFSelect
                name="is_impersonation"
                label={translate("adminSubAdmin.subAdmin.enableImpersonation")}
              >
                <option value="" />
                <option value={1}>
                  {translate("adminSubAdmin.subAdmin.enable")}{" "}
                </option>
                <option value={0}>
                  {translate("adminSubAdmin.subAdmin.disable")}{" "}
                </option>
              </RHFSelect>
              <RHFTextField
                name="username"
                type="text"
                label={translate("adminSubAdmin.subAdmin.userNames")}
              />
            </Box>
            <DialogActions>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={methods.formState.isSubmitting}
              >
                {translate("adminSubAdmin.subAdmin.submit")}
              </LoadingButton>
              <Button onClick={onClose}>
                {translate("adminSubAdmin.subAdmin.cancel")}{" "}
              </Button>
            </DialogActions>
          </FormProvider>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
