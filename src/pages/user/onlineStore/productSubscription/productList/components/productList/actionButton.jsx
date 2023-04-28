import { Button, IconButton, Stack, Tooltip } from "@mui/material";

import { paramCase } from "change-case";
import { Link as RouterLink } from "react-router-dom";
import Iconify from "src/components/Iconify";
import useLocales from "src/hooks/useLocales";
import { PATH_USER } from "src/routes/paths";

const ActionButtons = ({ name, id, addToCart, onBuyNow }) => {
  const { translate } = useLocales();
  const linkTo = PATH_USER.onlineStore.productSubscription.view(
    paramCase(name)
  );

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Button
        size="small"
        disableElevation
        variant="contained"
        onClick={onBuyNow}
      >
        {translate("userOnlineStore.buyNow")}
      </Button>
      <Button
        onClick={addToCart}
        variant="outlined"
        size="small"
        startIcon={<Iconify icon={"bx:cart-add"} />}
      >
        {translate("userOnlineStore.addToCart")}
      </Button>
      <Tooltip title="Read more">
        <IconButton
          aria-label="fingerprint"
          color="secondary"
          size="small"
          sx={{ backgroundColor: "#f4f4f4" }}
          LinkComponent={RouterLink}
          to={linkTo}
          state={{ pid: id }}
        >
          <Iconify icon={"akar-icons:chevron-right"} />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

export default ActionButtons;
