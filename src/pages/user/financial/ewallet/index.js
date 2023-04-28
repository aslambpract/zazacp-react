import { Box, Grid } from "@mui/material";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import useLocales from "src/hooks/useLocales";
import { PATH_USER } from "src/routes/paths";
import useFetchSummary from "../hooks/useFetchSummary";
import useFetchWitPagination from "../hooks/useFetchWithPagination";
import { DataList, FilterCard } from "./components";
import Summary from "./components/summary";

const Index = () => {
  const { translate } = useLocales();
  const { data, fetchData, ...rest } = useFetchWitPagination("ewallet");
  const summary = useFetchSummary("ewallet-data");

  return (
    <div>
      <Page title={translate("userFinancial.eWallet.ewalletTitile")}>
        <Box sx={{ p: 2 }}>
          <HeaderBreadcrumbs
            heading={translate("userFinancial.eWallet.myEwallet")}
            links={[
              { name: translate("dashboard"), href: PATH_USER.root },
              { name: translate("userFinancial.eWallet.myEwallet") },
            ]}
          />

          <Grid container spacing={3}>
            <Summary summary={summary} />
            <Grid item xs={12} md={12}>
              <FilterCard
                fetchData={(filter) => {
                  fetchData(rest.page, filter);
                }}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <DataList data={data} {...rest} />
            </Grid>
          </Grid>
        </Box>
      </Page>
    </div>
  );
};

export default Index;
