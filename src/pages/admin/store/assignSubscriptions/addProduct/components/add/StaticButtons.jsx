import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import i18n from "src/locales/i18n"
 



const StaticButtons = () => {
  const staticValues = [i18n.t("adminStore.assignSubscriptions.1month") ,i18n.t("adminStore.assignSubscriptions.3month")  , i18n.t("adminStore.assignSubscriptions.6month") , i18n.t("adminStore.assignSubscriptions.12month") ];
  const { watch, setValue } = useFormContext();
  const bufferAmount = watch("buffer_amount");
  const periodMonth = watch("period_month");

  useEffect(() => {
    if (periodMonth) {
      const month = parseInt(periodMonth.split(" ")[0]);
      if (month && bufferAmount) setValue("amount", month * bufferAmount);
    }
  }, [periodMonth, bufferAmount]);
  return staticValues.map((month) => (
    <Button
      variant="outlined"
      disabled={!bufferAmount}
      onClick={() => {
        setValue("period_month", month);
        setValue("custom_days", null);
      }}
    >
      {month}
    </Button>
  ));
};

export default StaticButtons;
