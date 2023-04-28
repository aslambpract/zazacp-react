import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";
import { RHFEditor } from "src/components/hook-form";

import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from "src/components/hook-form";
import useCategoryList from "../hooks/useCategoryList";
import useFaqAdd from "../hooks/useFaqAdd";
import useFaqEdit from "../hooks/useFaqEdit";
import useLocales from "src/hooks/useLocales";

const Form = ({ methods, onSubmit, cancel }) => {
  const { translate } = useLocales();
{translate("adminCommunication.faqs.no")}
  const categoryList = useCategoryList();

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <DialogTitle id="add-faqs">{translate("adminCommunication.faqs.addFAQ")}</DialogTitle>
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
            <RHFSelect name="category_id" label={translate("adminCommunication.faqs.faqCategory")}>
              <option value="" />
              {categoryList}
            </RHFSelect>

            <RHFTextField
              multiline
              fullWidth
              rows={3}
              placeholder="Questions"
              name="question"
            />
            <RHFEditor simple placeholder={translate("adminCommunication.faqs.answer")} name="answer" />
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          loading={methods.formState.isSubmitting}
          type="submit"
          variant="contained"
        >
          {translate("adminCommunication.faqs.submit")}
        </LoadingButton>
        <Button onClick={cancel} autoFocus color="error">
         {translate("adminCommunication.faqs.close")} 
        </Button>
      </DialogActions>
    </FormProvider>
  );
};

export const AddFaqForm = ({ cancel, fetchFaqList }) => {
  const add = useFaqAdd(() => {
    fetchFaqList();
    cancel();
  });

  return <Form {...add} cancel={cancel} />;
};

export const EditFaqForm = ({ cancel, fetchFaqList, selectedId }) => {
  const add = useFaqEdit(selectedId, () => {
    fetchFaqList();
    cancel();
  });

  return <Form {...add} cancel={cancel} />;
};

export default Form;
