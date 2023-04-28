import { Box } from "@mui/material";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import useLocales from "src/hooks/useLocales";

const TreeWrapper = ({ children, title, links }) => {
  const { translate } = useLocales();
  return (
    <Page title={title}>
      <Box sx={{ p: 2 }}>
        <HeaderBreadcrumbs heading={translate("genealogy")} links={links} />
        {children}
      </Box>
    </Page>
  );
};

export default TreeWrapper;
