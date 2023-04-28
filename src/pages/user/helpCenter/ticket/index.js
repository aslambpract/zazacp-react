// @mui
import { Box } from "@mui/material";
// Components
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import { PATH_USER } from "src/routes/paths";
import ContactSupport from "./components/contactSupport";
import MySupportTickets from "./components/mySupportTickets";
import OtherSupport from "./components/others";
import useLocales from "src/hooks/useLocales";


const Index = () => {
  const { translate } = useLocales();
  return (
    <>
      <Page title={translate("userHelpCenter.ticket.titile")}>
        <Box sx={{ p: 2 }}>
          <HeaderBreadcrumbs
            heading={translate("userHelpCenter.ticket.helpCenterTicket")}
            links={[
              { name: translate("dashboard"), href: PATH_USER.root },
              { name:translate("userHelpCenter.ticket.helpCenterTicket") },
            ]}
          />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                md: "repeat(3, 1fr)",
                sm: "repeat(2, 1fr)",
              },
              columnGap: 3,
              rowGap: 3,
            }}
          >
            <ContactSupport />
            <MySupportTickets />
            <OtherSupport />
          </Box>
        </Box>
      </Page>
    </>
  );
};

export default Index;
