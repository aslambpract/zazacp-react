import { Link as RouterLink } from "react-router-dom";

import { Box, Button } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { PATH_DASHBOARD } from "src/routes/paths";

import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Iconify from "src/components/Iconify";
import useLocales from "src/hooks/useLocales";

const HeaderCrumps = ({ name, isDraft }) => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const buttonProps = {
    size: isSmallScreen ? "small" : "medium",
  };
  const { translate } = useLocales();
  return (
    <HeaderBreadcrumbs
      heading={name}
      links={[{ name: "Dashboard", href: PATH_DASHBOARD.root }, { name: name }]}
      action={
        <>
          <Box
            sx={{
              display: "grid",
              columnGap: 1,
              rowGap: 3,
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(3, 1fr)",
              },
            }}
          >
            {isDraft ? (
              <Button
                {...buttonProps}
                variant="outlined"
                startIcon={<Iconify icon={"ic:outline-drafts"} />}
                component={RouterLink}
                to={PATH_DASHBOARD.communication.blog}
              >
                {translate("adminCommunication.blog.published")}
              </Button>
            ) : (
              <Button
                {...buttonProps}
                variant="outlined"
                startIcon={<Iconify icon={"ic:outline-drafts"} />}
                component={RouterLink}
                to={PATH_DASHBOARD.communication.draft_blog}
              >
                {translate("adminCommunication.blog.draft")}
              </Button>
            )}

            <Button
              {...buttonProps}
              variant="contained"
              startIcon={<Iconify icon={"eva:plus-fill"} />}
              component={RouterLink}
              to={PATH_DASHBOARD.communication.newBlog}
            >
              {translate("adminCommunication.blog.createPost")}
            </Button>
            <Button
              component={RouterLink}
              to={PATH_DASHBOARD.communication.blogCategories}
              variant="contained"
              startIcon={<Iconify icon={"carbon:categories"} />}
            >
              {translate("adminCommunication.blog.category")}
            </Button>
          </Box>
        </>
      }
    />
  );
};

export default HeaderCrumps;
