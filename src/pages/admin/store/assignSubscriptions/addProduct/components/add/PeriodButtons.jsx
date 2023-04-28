import { Co2Sharp } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { RHFTextField } from "src/components/hook-form";
import StaticButtons from "./StaticButtons";
import useLocales from "src/hooks/useLocales";


const PeriodButtons = () => {
  const { translate } = useLocales();
  const [isCustom, setIsCustom] = useState(false);
  const { getValues, setValue } = useFormContext();
  const bufferAmount = getValues("buffer_amount");
  return (
    <>
      <Box
        sx={{
          display: "grid",
          columnGap: 2,
          rowGap: 3,
          gridTemplateColumns: "repeat(8, 1fr)",
          mt: 3,
          mb: 3,
        }}
      >
        <StaticButtons />
        <Button
          disabled={!bufferAmount}
          variant="outlined"
          color="success"
          onClick={() => {
            setValue("period_month", null);
            setIsCustom(!isCustom);
          }}
        >
          {isCustom ?translate("adminStore.assignSubscriptions.hide")  :translate("adminStore.assignSubscriptions.custom")  }
        </Button>
      </Box>

      <Box
        sx={{
          display: "grid",
          columnGap: 2,
          rowGap: 3,
          gridTemplateColumns: "repeat(2, 1fr)",
        }}
      >
        {isCustom && (
          <RHFTextField
            name="custom_days"
            label="Number of days "
            type="number"
            onChange={(e) => {
              setValue(e.target.name, parseInt(e.target.value));
            }}
          />
        )}
      </Box>
    </>
  );
};

export default PeriodButtons;
