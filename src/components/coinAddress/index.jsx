import { Button, Card, Stack, TextField, Typography } from "@mui/material";
import useLocales from "src/hooks/useLocales";
import useCoinAddresses from "./hooks/useCoinAddresses";

const CoinAddress = () => {
  const { translate } = useLocales();
  const { addresses, data, handleChange, onSubmit } = useCoinAddresses();

  return (
    <Card sx={{ p: 3, mt: 1 }}>
      <Typography variant="subtitle2" color="text.primary" mt={2} mb={2}>
        {translate("userProfile.changeCoinAddress")}
      </Typography>
      <Stack spacing={3} alignItems="flex-end">
        {addresses.map((item) => {
          const address = data[item.id];
          return (
            <Stack width={"100%"} direction="row" key={item.id} spacing={4}>
              <TextField
                label={item.name}
                fullWidth
                name={item.id}
                value={address || ""}
                onChange={handleChange}
              />
            </Stack>
          );
        })}
        <Button variant="contained" onClick={onSubmit}>
          {translate("save")}
        </Button>
      </Stack>
    </Card>
  );
};

export default CoinAddress;
