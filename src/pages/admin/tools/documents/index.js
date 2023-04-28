import { Box } from "@mui/material";

import { PATH_DASHBOARD } from "src/routes/paths";

import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";

import "../style.css";
import MainSection from "./components/MainSection";
import useLocales from "src/hooks/useLocales";

const Documents = () => {
  const { translate } = useLocales();
  return (
    <Page title= {translate("adminTools.documents.documentsTitile")} >
      <Box sx={{ p: 2 }}>
        <HeaderBreadcrumbs
          heading= {translate("adminTools.documents.documents")} 
          links={[
            { name:translate("dashboard") , href: PATH_DASHBOARD.root },
            { name: translate("adminTools.documents.documents") },
          ]}
        />

        <MainSection />
      </Box>
    </Page>
  );
};

export default Documents;
