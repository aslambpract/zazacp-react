import React from "react";
import { Link } from "react-router-dom";
import { capitalCase } from "change-case";
// @mui
import { Box, Card, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
// Components
import { PATH_USER } from "src/routes/paths";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import MySupport from "./mySupport";

const Index = () => {
  return (
    <>
      <Page title="My Support: Help Center">
        <Box sx={{ p: 2 }}>
          <HeaderBreadcrumbs
            heading="My Support"
            links={[
              { name: "Dashboard", href: PATH_USER.root },
              {
                name: "Create Ticket",
                href: PATH_USER.helpCenter.helpCenterTicket,
              },
              { name: "My Support" },
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
            <MySupport />
          </Box>
        </Box>
      </Page>
    </>
  );
};

export default Index;
