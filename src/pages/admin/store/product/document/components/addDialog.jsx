import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";

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

import { useParams } from "react-router";
import { FormProvider } from "src/components/hook-form";
import useLocales from "src/hooks/useLocales";
import axiosInstance from "src/utils/axios";

const AddDialog = ({ open, onClose, fetchDocs }) => {
  const { translate } = useLocales();
  const { pid } = useParams();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm();
  const {
    formState: { isSubmitting },
  } = methods;
  const onSubmit = async (data) => {
    const reqData = new FormData();

    reqData.append("sample_doc", data.doc[0]);
    reqData.append("product_id", pid);

    const URL = "/api/admin/product-sample-docs";

    try {
      const { status, data } = await axiosInstance.post(URL, reqData);
      if (status === 200) {
        fetchDocs();
        enqueueSnackbar(data.message);
        onClose();
        return;
      }
      enqueueSnackbar(data.message);
    } catch (err) {
      enqueueSnackbar("Failed to upload doc", { variant: "error" });
    }
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={onClose}
      aria-labelledby="add-document"
    >
      <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
        <DialogTitle id="add-document">
          {translate("adminStore.products.addSampleDocument")}
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
              <TextField name="doc" type="file" {...methods.register("doc")} />
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} autoFocus color="error" variant="outlined">
            {translate("adminStore.products.cancel")}
          </Button>

          <LoadingButton
            loading={isSubmitting}
            type="submit"
            variant="contained"
          >
            {translate("adminStore.products.upload")}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

export default AddDialog;
