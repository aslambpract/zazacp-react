import { Box, Button, Divider, Link, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { OrderCompleteIllustration } from "src/assets";
import { DialogAnimate } from "src/components/animate";
import Iconify from "src/components/Iconify";
import useLocales from "src/hooks/useLocales";
import { PATH_USER } from "src/routes/paths";

const DialogStyle = styled(DialogAnimate)(({ theme }) => ({
  "& .MuiDialog-paper": {
    margin: 0,
    [theme.breakpoints.up("md")]: {
      maxWidth: "calc(100% - 48px)",
      maxHeight: "calc(100% - 48px)",
    },
  },
}));

const OrderComplete = ({ ...other }) => {
  const { translate } = useLocales();
  const navigate = useNavigate();

  const handleResetStep = () => {
    navigate(PATH_USER.onlineStore.productSubscription.root);
  };

  return (
    <DialogStyle fullScreen {...other}>
      <Box sx={{ p: 4, maxWidth: 480, margin: "auto" }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4" paragraph>
            {translate("userOnlineStore.thankPurchase")}
          </Typography>

          <OrderCompleteIllustration sx={{ height: 260, my: 10 }} />

          <Typography align="left" paragraph>
            {translate("userOnlineStore.thanksPlacing")} &nbsp;
            <Link href="#">01dc1370-3df6-11eb-b378-0242ac130002</Link>
          </Typography>

          <Typography align="left" sx={{ color: "text.secondary" }}>
            {translate("userOnlineStore.weWillSend")}
            <br /> <br />
            {translate("userOnlineStore.ifYouHave")}
            {translate("userOnlineStore.inContactUs")} <br /> <br />{" "}
            {translate("userOnlineStore.allTheBest")},
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Stack
          direction={{ xs: "column-reverse", sm: "row" }}
          justifyContent="space-between"
          spacing={2}
        >
          <Button
            color="inherit"
            onClick={handleResetStep}
            startIcon={<Iconify icon={"eva:arrow-ios-back-fill"} />}
          >
            {translate("userOnlineStore.continueShopping")}
          </Button>
          <Button
            variant="contained"
            startIcon={<Iconify icon={"ant-design:file-pdf-filled"} />}
            onClick={handleResetStep}
          >
            {translate("userOnlineStore.downloadAs")}
          </Button>
        </Stack>
      </Box>
    </DialogStyle>
  );
};

export default OrderComplete;
