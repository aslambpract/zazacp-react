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
  TextField,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { FormProvider } from "src/components/hook-form";
import { PATH_DASHBOARD } from "src/routes/paths";
import axiosInstance from "src/utils/axios";
import * as Yup from "yup";
import useLocales from "src/hooks/useLocales";


const EditDialog = ({ editId, onClose }) => {
  const { translate } = useLocales();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();
  const { pid } = useParams();

  const ChangePassWordSchema = Yup.object().shape({
    doc: Yup.mixed().test("isFile", "Select an document", (value) =>
      Boolean(value?.length)
    ),
  });

  const defaultValues = {
    doc: "",
  };

  const methods = useForm({
    resolver: yupResolver(ChangePassWordSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async (data) => {
    const reqData = new FormData();
    reqData.append("_method", "PUT");
    reqData.append("product_id", pid);
    reqData.append("doc", data.doc[0]);

    const URL = `/api/admin/product-docs/${editId}`;

    try {
      const { status, data } = await axiosInstance.post(URL, reqData);
      if (status === 200) {
        navigate(PATH_DASHBOARD.store.products);
        enqueueSnackbar(data.message);
        onClose();
        reset();
        return;
      }
      enqueueSnackbar(data.message);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      open={Boolean(editId)}
      onClose={onClose}
      aria-labelledby="edit-document"
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="edit-document"> {translate("adminStore.products.editDocument")}</DialogTitle>
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
              <TextField
                name="doc"
                type="file"
                label= {translate("adminStore.products.uploadDocument")}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{ accept: ".xlsx, .xls, .pdf" }}
                {...methods.register("doc")}
                error={Boolean(errors.doc)}
                helperText={errors.doc?.message}
              />
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            {translate("adminStore.products.update")} 
          </LoadingButton>
          <Button onClick={onClose} autoFocus color="error">
             {translate("adminStore.products.close")}
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

export default EditDialog;
