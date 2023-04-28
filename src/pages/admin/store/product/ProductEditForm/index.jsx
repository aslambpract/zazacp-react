import { Card, Grid, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect } from "react";

import {
  FormProvider,
  RHFEditor,
  RHFTextField,
} from "src/components/hook-form";
import useErrors from "src/hooks/useErrors";
import axiosInstance from "src/utils/axios";
import useGetProductById from "../hook/useGetProductById";
import LabelStyle from "../ProductAddForm/LabelStyle";
import BasicInfo from "../ProductAddForm/LeftHandPane/BasicInfo";
import LifeTimeAccess from "../ProductAddForm/LeftHandPane/LifeTimeAccess";
import MultiFileUpload from "../ProductAddForm/LeftHandPane/MultiFileUpload";
import PriceAndBvs from "../ProductAddForm/LeftHandPane/PriceAndBvs";
import RightHandPane from "../ProductAddForm/RightHandPane";
import createReqData from "../ProductAddForm/utils/createReqData";
import useLocales from "src/hooks/useLocales";


const ProductEditForm = () => {
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const handleErrors = useErrors();
  const { methods, fetchData } = useGetProductById();

  const { handleSubmit, watch, getValues, setValue } = methods;

  const onSubmit = async (inputData) => {
    delete inputData.product_docs;
    delete inputData.product_sample_docs;
    delete inputData.product_images;
    delete inputData.product_videos;
    delete inputData.product_prices;
    delete inputData.product_price_life_times;
    delete inputData.product_add_ons;
    delete inputData.product_questions;
    delete inputData.crypto_mountains;
    delete inputData.rapid_funnel;

    const reqData = createReqData(inputData);

    reqData.append("_method", "PUT");
    try {
      const { status, data } = await axiosInstance.post(
        `/api/admin/products/${inputData.id}`,
        reqData
      );
      fetchData(inputData.id);
      enqueueSnackbar(data.message);
    } catch (error) {
      handleErrors(error);
    }
  };

  const images = watch("image");

  useEffect(() => {
    const productImages = getValues("productImages");
    const filteredImageIds = productImages
      ?.filter(({ image_url }) => !images.includes(image_url))
      .map(({ id }) => id);
    setValue("filteredImageIds", filteredImageIds);
  }, [images.length]);

  return (
    <div>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <BasicInfo />
                <div>
                  <LabelStyle>{translate("adminStore.products.descriptionn")}</LabelStyle>
                  <RHFEditor simple name="product_description" />
                </div>
                <RHFTextField name="product_url" label= {translate("adminStore.products.productPageURL")} />
                <MultiFileUpload />

                <PriceAndBvs />
                <LifeTimeAccess />
              </Stack>
            </Card>
          </Grid>
          <RightHandPane />
        </Grid>
      </FormProvider>
    </div>
  );
};

export default ProductEditForm;
