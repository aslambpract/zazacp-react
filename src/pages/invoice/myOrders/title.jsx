import React from "react";
import { InvoiceTitleBar } from "src/components/invoice";

const InvoiceTitle = ({ invoice }) => {
  const { invoice_id: invoiceNumber, date: createDate } = invoice || {};

  return <InvoiceTitleBar date={createDate} invoiceNumber={invoiceNumber} />;
};

export default InvoiceTitle;
