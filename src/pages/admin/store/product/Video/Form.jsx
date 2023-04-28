import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { FormProvider, RHFTextField } from "src/components/hook-form";
import RHFLoadingButton from "src/components/hook-form/RHFLoadingButton";
import useVideoForm from "./hooks/useVideoForm";
import useLocales from "src/hooks/useLocales";

const Form = ({ onClose, onSubmit, data, buttonLabel }) => {
  const methods = useVideoForm(data);
  const { translate } = useLocales();
  return (
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
            <RHFTextField name="video_url" type="text" label={translate("adminStore.products.videoURL")} />
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <RHFLoadingButton>{buttonLabel}</RHFLoadingButton>
        <Button onClick={onClose} autoFocus color="error">
         {translate("adminStore.products.close")} 
        </Button>
      </DialogActions>
    </FormProvider>
  );
};

export default Form;
