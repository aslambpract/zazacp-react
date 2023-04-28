import { Box, Button,useMediaQuery } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Iconify from "src/components/Iconify";
import Page from "src/components/Page";
import { PATH_DASHBOARD } from "src/routes/paths";
import ReviewList from "./reviewsList";
import useLocales from "src/hooks/useLocales";


const Index = () => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const buttonProps = {
    size: isSmallScreen ? "small" : "medium",
  };
  const { translate } = useLocales();
  return (
    <div>
      <Page title={translate("adminStore.userReviews.userReviewTitile")}>
        <Box sx={{ p: 2 }}>
          <HeaderBreadcrumbs
            heading={translate("adminStore.userReviews.userReview")}
            links={[
              { name: translate("dashboard"), href: PATH_DASHBOARD.root },
              { name:translate("adminStore.userReviews.userReview") },
            ]}
            action={
              <>
                <Button
                {...buttonProps}
                  variant="contained"
                  
                  startIcon={<Iconify icon={"eva:plus-fill"} />}
                  component={RouterLink}
                  to={PATH_DASHBOARD.store.user_reviews_add}
                >
                 {translate("adminStore.userReviews.addReview")} 
                </Button>
              </>
            }
          />
          <ReviewList />
        </Box>
      </Page>
    </div>
  );
};

export default Index;
