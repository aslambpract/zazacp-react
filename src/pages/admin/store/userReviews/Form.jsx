import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  Button,
  FormHelperText,
  Rating,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { useNavigate } from "react-router";
import { FormProvider, RHFTextField } from "src/components/hook-form";
import useProductList from "src/components/ProductAutoComplete/hooks/useProductList";
import useLocales from "src/hooks/useLocales";

const Form = ({ methods, onSubmit }) => {
  const { translate } = useLocales();
  const { errors, isSubmitting } = methods.formState;
  const { control } = methods;
  const navigate = useNavigate();
  const productList = useProductList();
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const buttonProps = {
    size: isSmallScreen ? "small" : "medium",
  };
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

        <Autocomplete
          options={productList}
          getOptionLabel={(option) => option.name}
          onChange={(_, item) => methods.setValue("product_id", item.id)}
          renderInput={(params) => (
            <TextField
              error={Boolean(errors.product_id)}
              helperText={errors.product_id?.message}
              label={translate("adminStore.userReviews.products")}
              {...params}
            />
          )}
        />

        <RHFTextField
          name="username"
          label={translate("adminStore.userReviews.userName")}
        />
        <RHFTextField
          name="title"
          label={translate("adminStore.userReviews.title")}
        />

        <RHFTextField
          name="comment"
          label={translate("adminStore.userReviews.review")}
          multiline
          rows={3}
        />

        <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
          <Button
            {...buttonProps}
            onClick={() => navigate(-1)}
            color="inherit"
            variant="outlined"
          >
            {translate("adminStore.userReviews.back")}
          </Button>
          <LoadingButton
            {...buttonProps}
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

export default Form;
