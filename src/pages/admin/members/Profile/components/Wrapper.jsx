import { Container, Box } from "@mui/material";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import useSettings from "src/hooks/useSettings";
import { PATH_DASHBOARD } from "src/routes/paths";
import useLocales from "src/hooks/useLocales";


const Wrapper = ({ children }) => {
  const { translate } = useLocales();
  const { themeStretch } = useSettings();

  return (
    <Page title={translate("profile.profile")}>
      <Box sx={{ p: 2 }}>
        <HeaderBreadcrumbs
          heading={translate("profile.profile")}
          links={[
            { name:translate("Dashboard") , href: PATH_DASHBOARD.root },
            { name:translate("profile.memberProfile")  },
          ]}
        />
        {children}
      </Box>
    </Page>
  );
};

export default Wrapper;
