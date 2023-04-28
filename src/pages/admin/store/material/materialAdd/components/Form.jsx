import { LoadingButton } from "@mui/lab";
import { Box, Stack, TextField } from "@mui/material";

import { FormProvider } from "react-hook-form";
import { RHFTextField } from "src/components/hook-form";
import LabelStyle from "../../../product/ProductAddForm/LabelStyle";
import useMaterialsAdd from "../hooks/useMaterialsAdd";
import ChooseProducts from "./ChooseProducts";
import MaterialCategories from "./MaterialCategories";
import MaterialDatePicker from "./MaterialDatePicker";
import useLocales from "src/hooks/useLocales";


const Form = () => {
  const { translate } = useLocales();
  const { methods, onSubmit } = useMaterialsAdd();
  const {
    formState: { errors },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <Box
          sx={{
            display: "grid",
            columnGap: 2,
            rowGap: 3,
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm:  "repeat(2, 1fr)",
            },
         
          }}
        >
          <ChooseProducts />
          <MaterialCategories />

          <RHFTextField
            name="description"
            type="text"
            label={translate("adminStore.material.description")}
            multiline
            fullWidth
            rows={2}
          />
        </Box>

        <Box
          sx={{
            marginTop: 4,
            marginBottom: 1,
          }}
        >
          <LabelStyle>{translate("adminStore.material.addVIDEO")} </LabelStyle>
        </Box>

        <Box
          sx={{
            display: "grid",
            columnGap: 2,
            rowGap: 3,
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm:  "repeat(2, 1fr)",
            },
          }}
        >
          <RHFTextField name="video" label={translate("adminStore.material.URL") } />

          <RHFTextField name="video_title" label={translate("adminStore.material.title")}  />
          <MaterialDatePicker name="video_access_time" />
        </Box>

        <Box
          sx={{
            display: "grid",
            columnGap: 2,
            rowGap: 3,
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm:  "repeat(2, 1fr)",
            },
            mt: 3,
          }}
        >
          <TextField
            type="file"
            label={translate("adminStore.material.addDoc") }
            InputLabelProps={{
              shrink: true,
            }}
            {...methods.register("doc", {
              required: "Document is required",
            })}
            error={Boolean(errors.doc)}
            helperText={errors.doc?.message}
          />
          <RHFTextField name="doc_title" label={translate("adminStore.material.title") } />
          <MaterialDatePicker name="doc_access_time" />
        </Box>

        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={methods.formState.isSubmitting}
          >
            {translate("adminStore.material.submit") }
          </LoadingButton>
        </Stack>
      </form>
    </FormProvider>
  );
};

export default Form;
