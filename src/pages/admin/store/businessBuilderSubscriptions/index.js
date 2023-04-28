import { Box, Card } from "@mui/material";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import PaginationButtons from "src/components/pagination";
import { PATH_DASHBOARD } from "src/routes/paths";
import useSubscriptionSales from "./hooks/useSubscription";
import ReportCard from "./reportCard";
import SubscriptionSales from "./subscriptionSales";
import useLocales from "src/hooks/useLocales";


const Index = () => {
  const { translate } = useLocales();
  const { topSectionData, tableData, fetchData, rowStart, ...rest } =
    useSubscriptionSales();

  return (
    <div>
      <Page title= {translate("adminStore.businessBuilder.BusinessBuilderTitile")}>
        <Box sx={{ p: 2 }}>
          <HeaderBreadcrumbs
            heading={translate("adminStore.businessBuilder.businessBuilderSubscriptionsSales")}
            links={[
              { name: translate("dashboard"), href: PATH_DASHBOARD.root },
              { name: translate("adminStore.businessBuilder.businessBuilderSubscriptionsSales") },
            ]}
          />
          <ReportCard data={topSectionData} />
          <Card sx={{ p: 3, mt: 3 }}>
            <SubscriptionSales
              tableData={tableData}
              fetchData={fetchData}
              rowStart={rowStart}
            />
          </Card>
          <PaginationButtons {...rest} />
        </Box>
      </Page>
    </div>
  );
};

export default Index;
