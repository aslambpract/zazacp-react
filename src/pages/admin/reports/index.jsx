import { Box, Card } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import { PATH_DASHBOARD } from "src/routes/paths";
import { Filter } from "./components";

const Reports = () => {
  const [data, setData] = useState({ title: "", heading: "" });
  const [filter, setFilter] = useState({
    start_data: "",
    end_date: "",
    user_id: "",
  });
  const { heading, title } = data;

  return (
    <>
      <Page title={title}>
        <Box sx={{ p: 2 }}>
          <HeaderBreadcrumbs
            heading={heading}
            links={[
              { name: "Dashboard", href: PATH_DASHBOARD.root },
              { name: heading },
            ]}
          />
          <Card sx={{ p: 2 }}>
            <Filter setFilter={setFilter} />
            <Outlet context={{ setData, filter }} />
          </Card>
        </Box>
      </Page>
    </>
  );
};

export default Reports;
