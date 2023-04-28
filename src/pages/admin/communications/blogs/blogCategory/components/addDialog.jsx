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

import { useForm } from "react-hook-form";
import {
  FormProvider,
  RHFEditor,
  RHFTextField,
} from "src/components/hook-form";
import useAddDialog from "../hooks/useAddDialog";
import useLocales from "src/hooks/useLocales";


const AddDialog = ({ open, onClose, reload }) => {
  const { translate } = useLocales();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { methods, onSubmit } = useAddDialog(reload, onClose);

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={onClose}
      aria-labelledby="add-Category"
    >
      <DialogTitle id="add-Category">{translate("adminCommunication.blog.addCategory")}</DialogTitle>
      <FormProvider methods={methods} onSubmit={onSubmit}>
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
              <RHFTextField name="name" label={translate("adminCommunication.blog.categoryName")} />
              <RHFTextField
                fullwidth
                rows={3}
                multiline
                name="description"
                label={translate("adminCommunication.blog.description")}
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
           {translate("adminCommunication.blog.submit")} 
          </LoadingButton>
          <Button onClick={onClose} autoFocus color="error">
           {translate("adminCommunication.blog.close")} 
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

export default AddDialog;
