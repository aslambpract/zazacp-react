import { Grid, Typography } from "@mui/material";
import ImageUpload from "./imageUpload";
import useLocales from "src/hooks/useLocales";


const ChangeLogo = () => {
  const { translate } = useLocales();
  
  return (
    <>
      <Typography variant="subtitle2" color="text.primary" mt={2} mb={2}>
        {translate("adminSettings.brand.changeLogo")}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <ImageUpload title={translate("adminSettings.brand.changeYourLogo")} name="logo" />
        </Grid>
        <Grid item xs={12} md={4}>
          <ImageUpload title={translate("adminSettings.brand.changeYourLogoIcon")} name="favicon" />
        </Grid>
        <Grid item xs={12} md={4}>
          <ImageUpload title={translate("adminSettings.brand.sidebarCornerLogo")} name="side_bar_logo" />
        </Grid>
      </Grid>
    </>
  );
};

export default ChangeLogo;
