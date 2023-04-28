import { Box, Button, Stack, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import useCoinTypes from "src/hooks/useCoinTypes";
import useLocales from "src/hooks/useLocales";

const Coin = () => {
  const { translate } = useLocales();
  const coinTypes = useCoinTypes();
  const { setValue, watch } = useFormContext();
  const coin = watch("coin_id");
  const onChangeCoin = (value) => () => setValue("coin_id", value);

  return (
    <Box>
      <Stack spacing={1}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
        {translate("userBusinessBuilder.subscription.chooseYourCoin")} 
        </Typography>
        <Stack direction="row" spacing={2}>
          {coinTypes.map(({ id, name }) => (
            <Button
              key={id}
              onClick={onChangeCoin(id)}
              variant={coin === id ? "outlined" : "text"}
              size="small"
            >
              {name}
            </Button>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default Coin;
