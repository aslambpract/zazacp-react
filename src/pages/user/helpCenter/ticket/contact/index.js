import { Box } from "@mui/material";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import { PATH_USER } from "src/routes/paths";
import CreateTicket from "./createTicket";
import useLocales from "src/hooks/useLocales";


const Index = () => {
  const { translate } = useLocales();
  return (
    <>
      <Page title={translate("userHelpCenter.ticket.contactSupportTitile")}>
        <Box sx={{ p: 2 }}>
          <HeaderBreadcrumbs
            heading={translate("userHelpCenter.ticket.contactSupport")}
            links={[
              { name: translate("dashboard"), href: PATH_USER.root },
              {
                name: translate("userHelpCenter.ticket.createTicket"),
                href: PATH_USER.helpCenter.createTicket.subCategory(),
              },
              { name: translate("userHelpCenter.ticket.contactSupport")},
            ]}
          />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                md: "repeat(1, 1fr)",
                sm: "repeat(1, 1fr)",
              },
              columnGap: 3,
              rowGap: 3,
            }}
          >
            <CreateTicket />
          </Box>
        </Box>
      </Page>
    </>
  );
};

export default Index;
