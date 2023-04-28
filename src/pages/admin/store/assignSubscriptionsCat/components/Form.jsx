import PropTypes from "prop-types";

import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

import {
  FormProvider,
  RHFEditor,
  RHFTextField,
} from "src/components/hook-form";
import useLocales from "src/hooks/useLocales";


const Form = (props) => {
  const { translate } = useLocales();
  const { methods, onClose } = props;
  return (
    <FormProvider {...props}>
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
            <RHFTextField name="name" label={translate("adminStore.assignSubscriptions.categoryName")} />
            <RHFEditor name="description" label={translate("adminStore.assignSubscriptions.categoryDescription")} />
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          type="submit"
          variant="contained"
          loading={methods.formState.isSubmitting}
        >
         {translate("adminStore.assignSubscriptions.submit")} 
        </LoadingButton>

        <Button onClick={onClose} autoFocus color="error">
          {translate("adminStore.assignSubscriptions.close")}
        </Button>
      </DialogActions>
    </FormProvider>
  );
};

Form.propTypes = {
  methods: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
