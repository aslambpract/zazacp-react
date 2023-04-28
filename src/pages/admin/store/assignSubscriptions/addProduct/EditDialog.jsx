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

import { FormProvider } from "src/components/hook-form";
import RHFDatePicker from "src/components/hook-form/RHFDatePicker";
import useEditHistory from "./hooks/useEditHistory";
import useLocales from "src/hooks/useLocales";

const EditDialog = ({ open, onClose, productId, fetchData }) => {
  const { translate } = useLocales();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { methods, onSubmit } = useEditHistory(productId, () => {
    onClose();
    fetchData();
  });
  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={onClose}
      aria-labelledby="access-time"
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle id="access-time">{translate("adminStore.assignSubscriptions.accessTime")}</DialogTitle>
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
              <RHFDatePicker name="effective_until" label={translate("adminStore.assignSubscriptions.effectiveUntil")} />
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <LoadingButton type="submit" variant="contained">
            {translate("adminStore.assignSubscriptions.updatee")}
          </LoadingButton>
          <Button onClick={onClose} autoFocus color="error">
           {translate("adminStore.assignSubscriptions.close")} 
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

export default EditDialog;
