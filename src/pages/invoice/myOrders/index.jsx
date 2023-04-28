import { isBinary } from "src/utils/isBinary";
import InvoiceDetails from "../invoiceDetails";
import InvoiceBody from "./body";
import useFetchInvoiceDetails from "./hooks/useFetchInvoiceDetails";
import InvoiceTitle from "./title";

const headings = [
  "usersMyOrders.product",
  "usersMyOrders.type",
  "usersMyOrders.price",
];

const MyOrders = () => {
  const invoice = useFetchInvoiceDetails();

  return (
    <InvoiceDetails
      invoice={invoice}
      BodyComponent={InvoiceBody}
      TitleComponent={InvoiceTitle}
      headings={isBinary() ? [...headings, "usersMyOrders.BV"] : headings}
    />
  );
};

export default MyOrders;
