import { Box, Card, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { PATH_DASHBOARD } from "src/routes/paths";

import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import Form from "./Form";
import useAddReview from "./hooks/useAddReview";
import useLocales from "src/hooks/useLocales";


const RootStyle = styled("div")(({ theme }) => ({
  margin: theme.spacing(3),
  padding: theme.spacing(3),
  borderRadius: Number(theme.shape.borderRadius) * 2,
  backgroundColor: theme.palette.background.neutral,
}));


const ReviewAdd = () => {
  const { translate } = useLocales();
  const addReview = useAddReview();

  return (
    <div>
      <Page title= {translate("adminStore.userReviews.reviewAddTitile")}>
        <Box sx={{ p: 2 }}>
          <HeaderBreadcrumbs
            heading= {translate("adminStore.userReviews.reviewAdd")}
            links={[
              { name: translate("dashboard"), href: PATH_DASHBOARD.root },
              { name: translate("adminStore.userReviews.reviewAdd") },
            ]}
          />
          <Card sx={{ p: 1 }}>
            <RootStyle>
              <Typography variant="subtitle1" gutterBottom>
              {translate("adminStore.userReviews.leaveAComment")} 
              </Typography>
              <Form {...addReview} />
            </RootStyle>
          </Card>
        </Box>
      </Page>
    </div>
  );
};

export default ReviewAdd;
