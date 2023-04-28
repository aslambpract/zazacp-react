import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { fCurrency } from "src/utils/formatNumber";
import { usePurchaseData } from "../store/purchaseStore";
import useLocales from "src/hooks/useLocales";


const Summary = ({ enableDiscount = false }) => {
  const { translate } = useLocales();
  const { total_amount: total } = usePurchaseData() || {};

  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader title= {translate("orderSummary")} />

      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {translate("userOnlineStore.subTotal")}
            </Typography>
            <Typography variant="subtitle2">{fCurrency(total)}</Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
             {translate("userOnlineStore.discount")} 
            </Typography>
            <Typography variant="subtitle2">-</Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {translate("userOnlineStore.shipping")}
            </Typography>
            <Typography variant="subtitle2">{translate("userOnlineStore.free")}</Typography>
          </Stack>

          <Divider />

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle1">{translate("userOnlineStore.total")}</Typography>
            <Box sx={{ textAlign: "right" }}>
              <Typography variant="subtitle1" sx={{ color: "error.main" }}>
                {fCurrency(total)}
              </Typography>
            </Box>
          </Stack>

          {enableDiscount && (
            <TextField
              fullWidth
              placeholder="Discount codes / Gifts"
              value="DISCOUNT5"
              disabled
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button sx={{ mr: -0.5 }} disabled>
                     {translate("userOnlineStore.apply")} 
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

Summary.propTypes = {
  total: PropTypes.number,
  discount: PropTypes.number,
  subtotal: PropTypes.number,
  shipping: PropTypes.number,
  onEdit: PropTypes.func,
  enableEdit: PropTypes.bool,
  enableDiscount: PropTypes.bool,
};

export default Summary;
