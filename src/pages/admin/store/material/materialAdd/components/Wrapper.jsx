import { Box, Card, Grid } from "@mui/material";
import Page from "src/components/Page";
import BreadCrumps from "./BreadCrumps";
import useLocales from "src/hooks/useLocales";


const Wrapper = ({ children }) => {
  const { translate } = useLocales();
  return(
    <Page title={translate("adminStore.material.materialStore")}>
      <Box sx={{ p: 2 }}>
        <BreadCrumps />
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>{children}</Card>
        </Grid>
      </Box>
    </Page>
  );
  
}
export default Wrapper;
