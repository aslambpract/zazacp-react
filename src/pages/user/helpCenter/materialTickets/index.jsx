import { Box, Card, Container, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import PaginationButtons from "src/components/pagination";
import Scrollbar from "src/components/Scrollbar";
import useSettings from "src/hooks/useSettings";
import { PATH_DASHBOARD } from "src/routes/paths";
import ListItem from "./components/listItem";
import Sidebar from "./components/sidebar";
import Toolbar from "./components/toolbar";
import useFetchTickets from "./hooks/useFetchTickets";
import useToggle from "./hooks/useToggle";

const RootStyle = styled("div")({
  flexGrow: 1,
  display: "flex",
  overflow: "hidden",
  flexDirection: "column",
});

const MaterialTickets = () => {
  const handleToggleDense = useToggle();
  const { themeStretch } = useSettings();
  const [openSidebar, setOpenSidebar] = useState(false);
  const { data, rowStart, ...rest } = useFetchTickets();
  return (
    <Page title="Create Ticket">
      <Container maxWidth={themeStretch ? false : "xl"}>
        <HeaderBreadcrumbs
          heading="Create Ticket"
          links={[
            {
              name: "Dashboard",
              href: PATH_DASHBOARD.root,
            },
            { name: "Create Ticket" },
          ]}
        />
        <Card sx={{ height: { md: "72vh" }, display: { md: "flex" } }}>
          <Sidebar
            isOpenSidebar={openSidebar}
            onCloseSidebar={() => setOpenSidebar(false)}
          />

          <RootStyle>
            <Toolbar
              onOpenSidebar={() => setOpenSidebar(true)}
              onToggleDense={handleToggleDense}
            />
            <Divider />

            <Scrollbar>
              <Box sx={{ minWidth: { md: 800 } }}>
                <ListItem isDense data={data} />
              </Box>
            </Scrollbar>
          </RootStyle>
        </Card>
        <PaginationButtons {...rest} />
      </Container>
    </Page>
  );
};

export default MaterialTickets;
