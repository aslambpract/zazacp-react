import { Box, Card } from "@mui/material";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import { PATH_DASHBOARD } from "src/routes/paths";
import TransferHistory from "./dataTable";
import FormFund from "./formFund";
import useLocales from "src/hooks/useLocales";


const FundCredits = () => {
  const { translate } = useLocales();
  return (
    <>
      <Box sx={{ p: 2 }}>
        <HeaderBreadcrumbs
          heading={translate("adminFinancial.fundCredit.fundCredits")}
          links={[
            { name: translate("dashboard"), href: PATH_DASHBOARD.root },
            { name: translate("adminFinancial.fundCredit.fundCredits") },
          ]}
        />

        <FormFund />
        <Card sx={{ p: 2, mt: 2 }}>
          <TransferHistory />
        </Card>
      </Box>
    </>
  );
};

export default FundCredits;
