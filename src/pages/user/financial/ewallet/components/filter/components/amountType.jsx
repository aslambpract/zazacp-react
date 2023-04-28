import { capitalCase } from "change-case";
import React from "react";
import { RHFSelect } from "src/components/hook-form";
import Map from "src/components/map";
import useLocales from "src/hooks/useLocales";
import { isBinary } from "src/utils/isBinary";

const AmountType = () => {
  const { translate } = useLocales();

  return (
    <RHFSelect
      name="amount_type"
      label={translate("userFinancial.eWallet.amountType")}
    >
      <Map
        list={isBinary() ? [...options, ...binary] : options}
        render={({ value, label }) => <Option value={value} label={label} />}
      />
    </RHFSelect>
  );
};

const Option = ({ value, label }) => {
  const { translate } = useLocales();

  return <option value={value}>{capitalCase(translate(label))}</option>;
};

const options = [
  { value: "all", label: "userFinancial.eWallet.all" },
  { value: "released", label: "userFinancial.eWallet.released" },
  { value: "pending", label: "userFinancial.eWallet.pending" },
  { value: "failed", label: "userFinancial.eWallet.failed" },
  { value: "rejected", label: "userFinancial.eWallet.rejected" },
  { value: "finished", label: "userFinancial.eWallet.finished" },
  { value: "approved", label: "userFinancial.eWallet.approved" },
  { value: "fund_transfer", label: "userFinancial.eWallet.fund_transfer" },
  { value: "plan_purchase", label: "userFinancial.eWallet.plan_purchase" },
  { value: "fund_transfer", label: "userFinancial.eWallet.fund_transfer" },
  { value: "self_transfer", label: "userFinancial.eWallet.self_transfer" },
  { value: "referral_bonus", label: "userFinancial.eWallet.referral_bonus" },
  {
    value: "achievement_bonus",
    label: "userFinancial.eWallet.achievement_bonus",
  },
  {
    value: "first_order_bonus",
    label: "userFinancial.eWallet.first_order_bonus",
  },
  {
    value: "credited_by_admin",
    label: "userFinancial.eWallet.credited_by_admin",
  },
  {
    value: "deducted_by_admin",
    label: "userFinancial.eWallet.deducted_by_admin",
  },
  {
    value: "level_commission",
    label: "Level Commission",
  },
];

const binary = [
  { value: "binary_bonus", label: "userFinancial.eWallet.binary_bonus" },
];

export default AmountType;
