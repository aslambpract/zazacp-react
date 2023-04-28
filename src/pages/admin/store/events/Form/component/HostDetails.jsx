import { Card, Stack } from "@mui/material";
import React from "react";
import { RHFTextField } from "src/components/hook-form";
import useLocales from "src/hooks/useLocales";
import LabelStyle from "src/pages/admin/store/product/ProductAddForm/LabelStyle";
import MultiFileUpload from "src/pages/admin/store/product/ProductAddForm/LeftHandPane/MultiFileUpload";

const HostDetails = () => {
  const { translate } = useLocales();
  return (
    <Card sx={{ p: 3 }}>
      <Stack spacing={1}>
        <LabelStyle>{translate("adminStore.events.hostDetails")}</LabelStyle>
        <RHFTextField name="host" label={translate("adminStore.events.host")} />
        <RHFTextField
          name="topic"
          label={translate("adminStore.events.topic")}
        />
        <MultiFileUpload />
      </Stack>
    </Card>
  );
};

export default HostDetails;
