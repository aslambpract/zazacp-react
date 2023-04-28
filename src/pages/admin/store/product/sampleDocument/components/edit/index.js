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
import { FormProvider } from "src/components/hook-form";
import useEdit from "./hooks/useEdit";

const EditDialog = ({ editId, onClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { methods, onSubmit } = useEdit(editId, onClose);

  const {
    formState: { isSubmitting, errors },
  } = methods;

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      open={Boolean(editId)}
      onClose={onClose}
      aria-labelledby="edit-document"
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle id="edit-document">Edit Sample Document</DialogTitle>
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
                name="sample_doc"
                type="file"
                label="upload document"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{ accept: ".xlsx, .xls, .pdf" }}
                {...methods.register("sample_doc")}
                error={Boolean(errors.sample_doc)}
                helperText={errors.sample_doc?.message}
              />
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClose} autoFocus color="error">
            Close
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            update
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

export default EditDialog;
