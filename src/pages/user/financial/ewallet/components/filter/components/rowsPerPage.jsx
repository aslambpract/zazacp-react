import React from "react";
import { RHFSelect } from "src/components/hook-form";
import Map from "src/components/map";
import useLocales from "src/hooks/useLocales";

const values = [10, 25, 50, 100, 200];

const RowsPerPage = () => {
  const { translate } = useLocales();

  return (
    <RHFSelect
      name="rows_page"
      label={translate("userFinancial.eWallet.numberOfRows")}
    >
      <Map list={values} render={(v) => <option value={v}>{v}</option>} />
    </RHFSelect>
  );
};

export default RowsPerPage;
