import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { capitalCase } from "change-case";
import React, { useEffect, useState } from "react";
import useAvailableCoins from "../hooks/useAvailableCoins";
import useLocales from "src/hooks/useLocales";

const Available = ({ min, available = "[]", handleChange }) => {
  const { translate } = useLocales();
  const coins = useAvailableCoins();
  const [activeCoins, setActiveCoins] = useState([]);
  useEffect(() => {
    if (available) {
      setActiveCoins(available);
    }
  }, [available]);

  return (
    <Box>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        {translate("adminSettings.network.minAmount")}
      </Typography>
      <TextField
        fullWidth
        value={min}
        name="min_amount"
        onChange={handleChange()}
      />

      <Typography variant="subtitle2" sx={{ mt: 1, mb: 1 }}>
        {translate("adminSettings.network.availableCoins")}
      </Typography>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
        >
          {coins.map(({ id, name }) => {
            const isActive = activeCoins.includes(id);
            return (
              <FormControlLabel
                value={id}
                control={
                  <Radio checked={isActive} onClick={handleChange("coin")} />
                }
                label={capitalCase(name)}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default Available;
