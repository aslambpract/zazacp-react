import { LoadingButton } from "@mui/lab";
import { Box, Card, Grid, Stack, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { RHFTextField } from "src/components/hook-form";
import useLocales from "src/hooks/useLocales";
import MultiFileUpload from "src/pages/admin/store/product/ProductAddForm/LeftHandPane/MultiFileUpload";

const RightGrid = ({ onSubmit, isEdit = false }) => {
  const { translate } = useLocales();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Grid item xs={12} md={5}>
      <Stack spacing={3}>
        <Card sx={{ p: 3 }}>
          <RHFTextField
            name="short_description"
            label={translate("adminCommunication.blog.shortDescription")}
            multiline
            fullWidth
            rows={3}
          />
          <Stack spacing={1} mt={2}>
            <TextField
              name="document_url"
              type="file"
              label={translate("adminCommunication.blog.addDoc")}
              InputLabelProps={{ shrink: true }}
              inputProps={{ accept: ".xlsx, .xls, .pdf" }}
              {...register("document_url")}
              error={Boolean(errors.document_url)}
              helperText={errors.document_url?.message}
            />
          </Stack>
          <Stack spacing={1} m={1}>
            <MultiFileUpload />
          </Stack>
        </Card>
        <Box
          sx={
            !isEdit && {
              display: "grid",
              rowGap: 3,
              columnGap: 2,
              marginTop: 3,
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
              },
            }
          }
        >
          {!isEdit && (
            <LoadingButton
              type="submit"
              variant="outlined"
              size="large"
              onClick={handleSubmit(onSubmit(true))}
            >
              {translate("adminCommunication.blog.saveAsDraft")}
            </LoadingButton>
          )}

          <LoadingButton
            fullWidth={isEdit}
            type="submit"
            variant="contained"
            size="large"
            onClick={handleSubmit(onSubmit())}
          >
            {translate("adminCommunication.blog.submit")}
          </LoadingButton>
        </Box>
      </Stack>
    </Grid>
  );
};

export default RightGrid;
