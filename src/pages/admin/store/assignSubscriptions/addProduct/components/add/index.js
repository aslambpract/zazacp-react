import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { useEffect } from "react";

import {
  FormProvider,
  RHFCheckbox,
  RHFTextField,
} from "src/components/hook-form";
import useAddBusinessBuilder from "../../hooks/useAddBuisinessBuilder";
import BusinessBuilders from "./BusinessBuilders";
import PeriodButtons from "./PeriodButtons";
import Users from "./users";
import useLocales from "src/hooks/useLocales";

const Add = () => {
  const { translate } = useLocales();
  const { methods, onSubmit } = useAddBusinessBuilder();
  const customDays = methods.watch("custom_days");
  const bufferAmount = methods.getValues("buffer_amount");
  const builderId = methods.getValues("business_builder_id");
  useEffect(() => {
    const parsedDays = parseInt(customDays);
    if (parsedDays) {
      methods.setValue("amount", (bufferAmount / 30) * parsedDays);
    }
  }, [customDays, builderId]);

  return (
    <div>
      <Typography sx={{ p: 1, mb: 1 }} variant="subtitle2">
        {translate("adminStore.assignSubscriptions.addBusinessBuilder")}
      </Typography>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Box
          sx={{
            display: "grid",
            columnGap: 2,
            rowGap: 3,
            gridTemplateColumns: "repeat(3, 1fr)",
          }}
        >
          <Users />
          <BusinessBuilders />
          <RHFTextField
            name="amount"
            label={translate("adminStore.assignSubscriptions.amount")}
            size="small"
            disabled
            readOnly
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>

        <PeriodButtons />
        <Box>
          <FormGroup sx={{ margin: "0px 0px 10px 13px" }}>
            <FormControlLabel
              control={<RHFCheckbox name="is_with_points" />}
              label={translate("adminStore.assignSubscriptions.addBusinessBuilderSubscription")}
            />
          </FormGroup>
        </Box>
        <Button variant="contained" type="submit">
         {translate("adminStore.assignSubscriptions.submit")} 
        </Button>
      </FormProvider>
    </div>
  );
};

export default Add;
