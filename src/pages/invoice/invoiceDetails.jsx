import { Card, Container, Divider } from "@mui/material";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import {
  InvoiceFooter,
  InvoiceTable,
  InvoiceToolbar,
} from "src/components/invoice";
import Page from "src/components/Page";
import useLocales from "src/hooks/useLocales";
import { PATH_USER } from "src/routes/paths";

const InvoiceDetails = ({
  invoice,
  BodyComponent,
  TitleComponent,
  headings,
}) => {
  const { translate } = useLocales();

  return (
    <Page title={translate("usersMyOrders.invoiceTitile")}>
      <Container sx={{ width: "100%" }}>
        <HeaderBreadcrumbs
          heading={translate("usersMyOrders.invoiceDetails")}
          links={[
            { name: translate("dashboard"), href: PATH_USER.root },
            {
              name: translate("usersMyOrders.invoices"),
              href: PATH_USER.my_orders.root,
            },
            { name: invoice?.invoice_id || "" },
          ]}
        />

        <InvoiceToolbar />

        <Card sx={{ pt: 5, px: 5 }}>
          <TitleComponent invoice={invoice} />

          <InvoiceTable
            body={<BodyComponent invoice={invoice} />}
            headings={headings}
          />

          <Divider sx={{ mt: 5 }} />

          <InvoiceFooter />
        </Card>
      </Container>
    </Page>
  );
};

export default InvoiceDetails;
