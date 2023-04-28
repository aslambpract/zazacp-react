import { Box, Card } from "@mui/material";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import { PATH_DASHBOARD } from "src/routes/paths";
import useLocales from "src/hooks/useLocales";

const Wrapper = ({ children, isEdit }) => {
  const { translate } = useLocales();
  return (
    <Page title={translate("adminCommunication.blog.addBlogTitile")}>
      <Box sx={{ p: 2 }}>
        <HeaderBreadcrumbs
          heading={isEdit ? translate("adminCommunication.blog.editBlog")  : translate("adminCommunication.blog.addBlog")}
          links={[
            { name: translate("dashboard"), href: PATH_DASHBOARD.root },
            { name:translate("adminCommunication.blog.blog") , href: PATH_DASHBOARD.communication.blog },
            { name: translate("adminCommunication.blog.addBlog") },
          ]}
        />
        <Card sx={{ p: 3, mt: 3 }}>{children}</Card>
      </Box>
    </Page>
  );
};

export default Wrapper;
