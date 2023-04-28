import { LoadingButton } from "@mui/lab";
import { Card, Grid, Stack } from "@mui/material";

import {
  FormProvider,
  RHFEditor,
  RHFTextField,
} from "src/components/hook-form";

import LabelStyle from "../../product/ProductAddForm/LabelStyle";
import AccessScope from "./component/AccessScope";
import EventType from "./component/EventType";
import HostDetails from "./component/HostDetails";
import ProductId from "./component/ProductId";
import TimeInfo from "./component/TimeInfo";
import useLocales from "src/hooks/useLocales";


const Form = ({ methods, onSubmit }) =>{
  const { translate } = useLocales();
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Card sx={{ p: 3 }}>
            <AccessScope />
            <Stack spacing={3}>
              <ProductId />
              <EventType />
  
              <RHFTextField name="zoom_password" label= {translate("adminStore.events.zoomPassword")} />
              <RHFTextField
                name="location_zoom_url"
                label= {translate("adminStore.events.location_Zoom")} 
              />
              <div>
                <LabelStyle> {translate("adminStore.events.description")} </LabelStyle>
                <RHFEditor simple name="description" />
              </div>
            </Stack>
          </Card>
        </Grid>
  
        <Grid item xs={12} md={5}>
          <Stack spacing={3}>
            <TimeInfo />
            <HostDetails />
            <LoadingButton
              type="submit"
              variant="contained"
              size="large"
              loading={methods.formState.isSubmitting}
            >
              {translate("adminStore.events.addEvent")}  
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
export default Form;
