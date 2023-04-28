import { Stack, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";
import Map from "src/components/map";
import useLocales from "src/hooks/useLocales";
import { fCurrency } from "src/utils/formatNumber";

const Subscriptions = ({ price = [], onChange, prices }) => {
  const { translate } = useLocales();
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <TextField
        label={translate("userOnlineStore.selectMonth")}
        select
        sx={{ maxWidth: "50%" }}
        fullWidth
        size="small"
        SelectProps={{ native: true }}
        onChange={onChange}
        disabled={!prices.length}
      >
        <Map
          list={prices}
          render={({ id, validity, price }) => (
            <option value={JSON.stringify({ price, id })} key={id}>
              {validity}
            </option>
          )}
        />
      </TextField>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="subtitle1">{fCurrency(price)}</Typography>
      </Stack>
    </Stack>
  );
};

Subscriptions.propTypes = {
  price: PropTypes.array.isRequired,
};

export default Subscriptions;
