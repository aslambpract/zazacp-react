import { Box, Button, Container } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Iconify from "src/components/Iconify";
import Page from "src/components/Page";
import useSettings from "src/hooks/useSettings";
import { PATH_DASHBOARD } from "src/routes/paths";
import useLocales from "src/hooks/useLocales";


const Wrapper = ({ children, handleClickOpenAddCategory }) => {
  const { translate } = useLocales();
  const { themeStretch } = useSettings();

  return (
    <Page title={translate("adminCommunication.blog.blogCategoryTitile")} >
      <Box sx={{ p: 2 }}>
        <HeaderBreadcrumbs
          heading={translate("adminCommunication.blog.blogCategory")} 
          links={[
            { name: translate("dashboard") , href: PATH_DASHBOARD.root },
            { name: translate("adminCommunication.blog.blog"), href: PATH_DASHBOARD.communication.blog },
            { name: translate("adminCommunication.blog.blogCategory")  },
          ]}
          action={
            <>
              <Box
                sx={{
                  display: "grid",
                  columnGap: 1,
                  rowGap: 3,
                  gridTemplateColumns: {
                    xs: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                  },
                }}
              >
                <Button
                  component={RouterLink}
                  to={PATH_DASHBOARD.communication.newBlog}
                  variant="contained"
                  startIcon={<Iconify icon={"eva:plus-fill"} />}
                >
                 {translate("adminCommunication.blog.createPost")}  
                </Button>
                <Button
                  component={RouterLink}
                  to={PATH_DASHBOARD.communication.blogCategories}
                  variant="contained"
                  startIcon={<Iconify icon={"eva:plus-fill"} />}
                  onClick={handleClickOpenAddCategory}
                >
                 {translate("adminCommunication.blog.category")}  
                </Button>
              </Box>
            </>
          }
        />
        {children}
      </Box>
    </Page>
  );
};

export default Wrapper;
