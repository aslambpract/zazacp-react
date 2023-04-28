import { useSnackbar } from "notistack";
import React from "react";
import useLocales from "src/hooks/useLocales";
import * as Yup from "yup";

// form
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

// @mui
import { LoadingButton } from "@mui/lab";
import { Box, Card, Container, Grid, Stack } from "@mui/material";

// routes
import { PATH_DASHBOARD } from "../../../../routes/paths";

// hooks
import useSettings from "../../../../hooks/useSettings";

// components
import HeaderBreadcrumbs from "../../../../components/HeaderBreadcrumbs";
import Iconify from "../../../../components/Iconify";
import Page from "../../../../components/Page";
import {
  FormProvider,
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
} from "../../../../components/hook-form";

const ProductAccess = () => {
  const { translate } = useLocales();

  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = {
    home: "",
    blog: "",
    events: "",
    documents: "",
    videos: "",
    reviews: "",
    leaveacomment: "",
  };

  const methods = useForm({
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar("Update success!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Page title={translate("adminStore.products.productAccessTitile")}>
        <Container maxWidth={themeStretch ? false : "lg"}>
          <HeaderBreadcrumbs
            heading={translate("adminStore.products.productAccessSettings")}
            links={[
              { name: translate("dashboard"), href: PATH_DASHBOARD.root },
              { name: translate("adminStore.products.productAccess") },
            ]}
          />
          <Card sx={{ p: 3 }}>
            <Grid item xs={12} md={12}>
              <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Box
                  sx={{
                    display: "grid",
                    columnGap: 2,
                    rowGap: 3,
                    gridTemplateColumns: {
                      xs: "repeat(1, 1fr)",
                      sm: "repeat(2, 1fr)",
                    },
                  }}
                >
                  <RHFTextField
                    name="home"
                    type="text"
                    label={translate("adminStore.products.home")}
                  />
                  <RHFTextField
                    name="blog"
                    type="text"
                    label={translate("adminStore.products.blog")}
                  />
                  <RHFTextField
                    name="events"
                    type="text"
                    label={translate("adminStore.products.events")}
                  />
                  <RHFTextField
                    name="documents"
                    type="text"
                    label={translate("adminStore.products.documents")}
                  />
                  <RHFTextField
                    name="videos"
                    type="text"
                    label={translate("adminStore.products.videos")}
                  />
                  <RHFTextField
                    name="reviews"
                    type="text"
                    label={translate("adminStore.products.reviews")}
                  />
                  <RHFTextField
                    name="leaveacomment"
                    type="text"
                    label={translate("adminStore.products.leaveComment")}
                  />
                </Box>
                <Stack spacing={3} alignItems="flex-end" mt={2}>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                  >
                    {translate("adminStore.products.Update")}
                  </LoadingButton>
                </Stack>
              </FormProvider>
            </Grid>
          </Card>
        </Container>
      </Page>
    </div>
  );
};

export default ProductAccess;
