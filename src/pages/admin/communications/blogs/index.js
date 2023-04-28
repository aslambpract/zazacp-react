import { Box } from "@mui/material";

import { Outlet } from "react-router";
import Page from "src/components/Page";
import HeaderCrumps from "./components/HeaderCrumps";
import useLocales from "src/hooks/useLocales";

const Index = () => {
  const { translate } = useLocales();
  return (
    <>
      <Page title={translate("adminCommunication.blog.blogTitile")}>
        <Box sx={{ p: 2 }}>
          <Outlet />
        </Box>
      </Page>
    </>
  );
};

export default Index;
