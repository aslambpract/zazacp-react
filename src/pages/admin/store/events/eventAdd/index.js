import { Box } from "@mui/material";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import { PATH_DASHBOARD } from "src/routes/paths";
import Form from "../Form";
import useAddEvent from "./hooks/useAddEvent";
import useLocales from "src/hooks/useLocales";


const EventAdd = () => {
  const { translate } = useLocales();
  const { methods, onSubmit } = useAddEvent();

  return (
    <div>
      <Page title={translate("adminStore.events.eventTitile")}>
        <Box sx={{ p: 2 }}>
          <HeaderBreadcrumbs
            heading={translate("adminStore.events.event")}
            links={[
              { name: translate("dashboard"), href: PATH_DASHBOARD.root },
              { name:translate("adminStore.events.events") , href: PATH_DASHBOARD.store.events },
              { name: translate("adminStore.events.add") },
            ]}
          />
          <Form methods={methods} onSubmit={onSubmit} />
        </Box>
      </Page>
    </div>
  );
};

export default EventAdd;
