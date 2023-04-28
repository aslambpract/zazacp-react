import { LoadingButton } from "@mui/lab";
import {
  Button,
  FormHelperText,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { useNavigate } from "react-router";
import { FormProvider, RHFTextField } from "src/components/hook-form";
import ProductAutoComplete from "src/components/ProductAutoComplete";
import useLocales from "src/hooks/useLocales";


const EditForm = ({ methods, onSubmit, onClose }) => {
  const { translate } = useLocales();
  const { errors, isSubmitting } = methods.formState;
  const { control } = methods;
  const navigate = useNavigate();

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3}>
        <div>
          <Stack
            direction="row"
            flexWrap="wrap"
            alignItems="center"
            spacing={1.5}
          >
            <Typography variant="body2">
              {translate("adminStore.userReviews.yourReviewAbout")} 
            </Typography>

            <Controller
              name="rating"
              control={control}
              render={({ field }) => (
                <Rating {...field} value={Number(field.value)} />
              )}
            />
          </Stack>

          {!!errors.rating && (
            <FormHelperText error>{errors.rating?.message}</FormHelperText>
          )}
        </div>

        <ProductAutoComplete
          onChange={(_, item) => methods.setValue("product_id", item.id)}
        />

        <RHFTextField name="username" label= {translate("adminStore.userReviews.userName")} />
        <RHFTextField name="title" label= {translate("adminStore.userReviews.title")}  />

        <RHFTextField name="comment" label= {translate("adminStore.userReviews.review")} multiline rows={3} />

        <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
          <Button onClick={onClose} color="inherit" variant="outlined">
             {translate("adminStore.userReviews.back")} 
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            {translate("adminStore.userReviews.postReview")}  
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

export default EditForm;
