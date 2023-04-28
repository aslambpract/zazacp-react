import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from "src/components/hook-form";
import { USER_ROUTES } from "src/routes/paths";
import useAddGuidance from "./hooks/useAddGuidance";

import useLocales from "src/hooks/useLocales";

const AddGuidance = ({ fetchData }) => {
  const { translate } = useLocales();
  const { methods, onSubmit } = useAddGuidance(fetchData);

  return (
    <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <Box
        sx={{
          display: "grid",
          rowGap: 3,
          columnGap: 2,
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(3, 1fr)",
            lg: "repeat(2, 1fr)",
          },
        }}
      >
        <RHFSelect name="url" label="URL">
          <option value="" />
          {USER_ROUTES.map((url) => (
            <option value={url}>{`/user${url}`}</option>
          ))}
        </RHFSelect>
        <RHFTextField name="title" type="text" label= {translate("adminSettings.brand.blogTitle")} />
        <RHFTextField
          type="text"
          label= {translate("adminSettings.brand.description")}
          multiline
          fullWidth
          rows={4}
          name="description"
        />
      </Box>
      <Stack alignItems="flex-start" sx={{ mt: 3, mb: 3 }}>
        <LoadingButton
          type="submit"
          variant="contained"
          loading={methods.formState.isSubmitting}
        >
          {translate("adminSettings.brand.submit")} 
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
};

export default AddGuidance;
