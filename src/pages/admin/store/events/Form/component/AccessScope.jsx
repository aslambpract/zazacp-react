import { Stack } from "@mui/material";
import React from "react";
import { RHFRadioGroup } from "src/components/hook-form";
import useLocales from "src/hooks/useLocales";
import i18n from "src/locales/i18n";
import LabelStyle from "src/pages/admin/store/product/ProductAddForm/LabelStyle";

const AccessScope = () => {
  const SCOPE_OPTIONS = [
    i18n.t("adminStore.events.private"),
    i18n.t("adminStore.events.public"),
  ];
  const { translate } = useLocales();
  return (
    <Stack spacing={0} mb={2}>
      <LabelStyle> {translate("adminStore.events.accessScope")}</LabelStyle>
      <RHFRadioGroup
        name="access_scope"
        options={SCOPE_OPTIONS}
        sx={{
          "& .MuiFormControlLabel-root": { mr: 4 },
        }}
      />
    </Stack>
  );
};
export default AccessScope;
