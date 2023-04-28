import useAddProductCategory from "../hooks/useAddProductCategory";

import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from "src/components/hook-form";
import useEditProductCategories from "../hooks/useEditProductCategories";

const Form = ({ methods, onSubmit, onClose, label }) => {
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <DialogTitle id="category">{label}</DialogTitle>
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
            <RHFTextField
              name="name"
              type="text"
              label="Product Category Name"
            />
            <RHFSelect name="active" label="Status">
              <option value={1}>Enabled</option>
              <option value={0}>Disabled</option>
            </RHFSelect>
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus color="error" variant="outlined">
          Close
        </Button>
        <LoadingButton
          loading={methods.formState.isSubmitting}
          type="submit"
          variant="contained"
        >
          submit
        </LoadingButton>
      </DialogActions>
    </FormProvider>
  );
};

export const AddForm = ({ onClose, refresh }) => {
  const { methods, onSubmit } = useAddProductCategory(() => {
    refresh();
    onClose();
  });
  return (
    <Form
      methods={methods}
      onSubmit={onSubmit}
      onClose={onClose}
      label="Add Category"
    />
  );
};

export const EditForm = ({ id, onClose, refresh }) => {
  const { methods, onSubmit } = useEditProductCategories(id, () => {
    refresh();
    onClose();
  });
  return (
    <Form
      onClose={onClose}
      methods={methods}
      onSubmit={onSubmit}
      label="Edit Category"
    />
  );
};
