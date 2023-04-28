import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import useAddArticleCategory from "../hooks/useAddArticleCategory";

import {
  FormProvider,
  RHFEditor,
  RHFTextField,
} from "src/components/hook-form";
import useEditArticleCategory from "../hooks/useEditArticleCategory";
import useLocales from "src/hooks/useLocales";

const Form = ({ methods, onSubmit, onClose, label }) => {
  const { translate } = useLocales();
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <DialogTitle id="add-article-category">{label}</DialogTitle>
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
            <RHFTextField name="name" label= {translate("adminCommunication.articile.names")} />
            <RHFEditor name="description" label= {translate("adminCommunication.articile.description")} />
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <LoadingButton type="submit" variant="contained">
          {translate("adminCommunication.articile.submit")} 
        </LoadingButton>
        <Button onClick={onClose} autoFocus color="error">
           {translate("adminCommunication.articile.close")}
        </Button>
      </DialogActions>
    </FormProvider>
  );
};

export const AddForm = ({ onClose, fetchData }) => {
  const { translate } = useLocales();
  const { methods, onSubmit } = useAddArticleCategory(() => {
    fetchData();
    onClose();
  });

  return (
    <Form
      label= {translate("adminCommunication.articile.addArticleCategory")}
      methods={methods}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
};

export const EditForm = ({ onClose, fetchData, selectedId }) => {
  const { translate } = useLocales();
  const { methods, onSubmit } = useEditArticleCategory(selectedId, () => {
    fetchData();
    onClose();
  });

  return (
    <Form
      label= {translate("adminCommunication.articile.editArticleCategory")}
      methods={methods}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
};
