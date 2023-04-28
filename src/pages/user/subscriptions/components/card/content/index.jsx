import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import PropTypes from "prop-types";
import { useState } from "react";
import Iconify from "src/components/Iconify";
// @mui
import { alpha, styled } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import fetchUser from "src/utils/fetchUser";
import "../style.css";
import ActionButton from "./actionButton";
import Form from "./form";
import MoreButton from "./moreButton";
import useLocales from "src/hooks/useLocales";

// ----------------------------------------------------------------------

const IconWrapperStyle = styled("div")(({ theme }) => ({
  width: 24,
  height: 24,
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  justifyContent: "center",
  marginRight: theme.spacing(1),
  color: theme.palette.success.main,
  backgroundColor: alpha(theme.palette.success.main, 0.16),
}));

// ----------------------------------------------------------------------

const Content = ({
  id,
  name,
  meta_description,
  short_description,
  active,
  created_at,
  product_id,
  effective_until,
  purchase_id,
  fetchData,
}) => {
  const { translate } = useLocales();
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [purchaseId, setPurchaseId] = useState(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [openDisableDialog, setDisableDialog] = useState(false);
  const handleClickOpen = (status) => (productId, purchaseId) => () => {
    if (status) {
      setOpen(productId);
      setPurchaseId(purchaseId);
    } else {
      setDisableDialog(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setDisableDialog(false);
  };

  const status = active ? "Enabled" : "Disabled";

  const cancelSubscription = async () => {
    try {
      const { data, status } = await fetchUser(
        `finpay-cancel-subscription/${id}`
      );
      if (status === 200) {
        enqueueSnackbar(data.message);
        handleClose();
        fetchData();
      }
    } catch (err) {
      handleClose();
      enqueueSnackbar(err.message, { variant: "error" });
    }
  };

  return (
    <>
      <Box
        sx={{
          paddingLeft: "1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography variant="h4" fontWeight="bold">
                {name}
              </Typography>
              <Typography variant="body2" fontWeight="light">
                {short_description}
                <Box>
                  {translate("userMySubscriptions.purchaseDate")}
                  <span>
                    &nbsp;{" "}
                    {new Date(created_at).toLocaleDateString("en-GB") ?? "_"}
                  </span>
                  &nbsp;&nbsp;|&nbsp;&nbsp;{translate("userMySubscriptions.expiryOn")}
                  <span>
                    &nbsp;
                    {new Date(effective_until).toLocaleDateString("en-GB")}
                  </span>
                </Box>
              </Typography>
            </Box>
          </Box>
          <Typography variant="subtitle1" fontWeight="normal">
            {meta_description}
          </Typography>
          <Box
            sx={{
              display: { xs: "block", lg: "none", xl: "block", xl: "none" },
              float: "right",
              marginTop: "10px",
              backgroundColor: "#e4e4e466",
              borderRadius: "50%",
            }}
          >
            <MoreButton />
          </Box>

          <Stack direction="row" alignItems="center" sx={{ marginTop: "1rem" }}>
            <IconWrapperStyle
              sx={{
                color: "info.main",
                bgcolor: (theme) => (theme.palette.info.main, 0.16),
              }}
            >
              <Iconify
                width={16}
                height={16}
                icon={"wpf:recurring-appointment"}
              />
            </IconWrapperStyle>

            <Typography variant="subtitle2" component="span">
             {translate("userMySubscriptions.autoRenewal")}  &nbsp;:&nbsp;
            </Typography>
            <Typography
              variant="body2"
              component="span"
              noWrap
              sx={{ color: "text.secondary", cursor: "pointer" }}
              onClick={handleClickOpen(status === "Disabled")(
                product_id,
                purchase_id
              )}
            >
              &nbsp; {status}
            </Typography>
          </Stack>
        </Box>

        <Box
          sx={{
            alignItem: "center",
            justifyContent: "space-between",
            display: { xs: "none", sm: "block", md: "block" },
            marginTop: "1rem",
          }}
        >
          <ActionButton
            id={id}
            product_id={product_id}
            purchase_id={purchase_id}
          />
        </Box>
      </Box>

      {/* dialog  */}
      <Dialog
        fullScreen={fullScreen}
        open={Boolean(open)}
        onClose={handleClose}
        aria-labelledby="recurring-payment"
      >
        <Form
          closeDialog={handleClose}
          productId={open}
          purchaseId={purchaseId}
          fetchData={fetchData}
        />
      </Dialog>

      <Dialog
        fullScreen={fullScreen}
        open={openDisableDialog}
        onClose={handleClose}
        aria-labelledby="recurring-payment"
      >
        <DialogTitle>{translate("userMySubscriptions.cancelSubscription")}</DialogTitle>
        <DialogContent>
          {translate("userMySubscriptions.areYouSure")}
          <DialogActions>
            <Button
              onClick={cancelSubscription}
              variant="contained"
              color="error"
            >
             {translate("userMySubscriptions.continue")} 
            </Button>
            <Button onClick={handleClose}>{translate("cancel")} </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

Content.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  isActive: PropTypes.string.isRequired,
  body: PropTypes.bool.isRequired,
};

export default Content;
