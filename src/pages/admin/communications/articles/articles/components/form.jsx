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
  RHFSelect,
  RHFTextField,
} from "src/components/hook-form";
import useArticleAdd from "../hooks/useArticleAdd";
import useCategoryNames from "../hooks/useArticleCategoryNames";
import useEditArticle from "../hooks/useEditArticle";
import useLocales from "src/hooks/useLocales";

const Form = ({ methods, onSubmit, onClose }) => {
  const { translate } = useLocales();
  const categoryNames = useCategoryNames();
  return (
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
                sm: "repeat(2, 1fr)",
              },
            }}
          >
            <RHFTextField
              name="title"
              label={translate("adminCommunication.articile.name")}
            />
            <RHFSelect
              name="category_id"
              label={translate("adminCommunication.articile.category")}
            >
              <option value="" />
              {categoryNames?.map((item) => (
                <option value={item.id}>{item?.name}</option>
              ))}
            </RHFSelect>
          </Box>
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
            <RHFEditor
              simple
              name="description"
              placeholder={translate(
                "adminCommunication.articile.descriptions"
              )}
            />
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

export const AddForm = ({ reload, onClose }) => {
  const add = useArticleAdd(() => {
    reload();
    onClose();
  });
  return <Form {...add} onClose={onClose} />;
};

export const EditForm = ({ reload, onClose, selectedId }) => {
  const edit = useEditArticle(selectedId, () => {
    reload();
    onClose();
  });
  return <Form {...edit} onClose={onClose} />;
};
