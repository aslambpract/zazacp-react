import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
} from "@mui/material";

import { FormControl } from "@mui/material";

import { FormProvider, RHFTextField } from "src/components/hook-form";
import useLocales from "src/hooks/useLocales";

const Form = ({ methods, onSubmit, onClose }) => {
  const { translate } = useLocales();
  const {
    formState: { errors },
  } = methods;
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <DialogContent>
        <DialogContentText>
          <Box mt={3}>
            <FormControl fullWidth>
              <RHFTextField
                name="title"
                id="doc-title"
                label={translate("adminTools.documents.docTitle")} 
                variant="outlined"
                inputProps={{ maxLength: 50 }}
              />
            </FormControl>
          </Box>

          <Box mt={3}>
            <FormControl fullWidth>
              <RHFTextField
                name="sort_order"
                id="sort-order"
                label={translate("adminTools.documents.sortOrders")}  
                variant="outlined"
                type="number"
              />
            </FormControl>
          </Box>
          <Box mt={3}>
            <FormControl fullWidth>
              <TextField
                type="file"
                inputProps={{ accept: ".xlsx, .xls, .pdf" }}
                {...methods.register("document_url")}
                label={translate("adminTools.documents.uploadDocument")} 
                InputLabelProps={{
                  shrink: true,
                }}
                error={Boolean(errors.document_url)}
                helperText={errors.document_url?.message}
                name="document_url"
              />
            </FormControl>
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button type="submit" variant="contained" autoFocus>
          {translate("adminTools.documents.submit")} 
        </Button>
        <Button onClick={onClose} autoFocus color="error">
         {translate("adminTools.documents.close")}  
        </Button>
      </DialogActions>
    </FormProvider>
  );
};

export default Form;
