import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { camelCase } from "lodash";
import { useState } from "react";
import Iconify from "src/components/Iconify";
import { FormProvider } from "src/components/hook-form";
import useLocales from "src/hooks/useLocales";
import { useOpenDialog } from "../..";
import { TYPES } from "../../utils/purchase";
import PersonalInfo from "./CardDetails";
import CardInfo from "./cardInfo";
import useFinPay from "./hooks/useFinPay";

const FinPay = ({ onClose }) => {
  const { translate } = useLocales();
  const [errorMessage, setErrorMessage] = useState("");
  const { palette } = useTheme();

  const { methods, onSubmit } = useFinPay((msg) => {
    setErrorMessage(msg);
  });
  const { value } = useOpenDialog();
  const isOpen = camelCase(value) === TYPES.finPay;
  const {
    formState: { isSubmitting },
  } = methods;
  return (
    <>
      <Dialog open={isOpen} fullWidth maxWidth="sm" onClose={onClose}>
        <DialogContent>
          <FormProvider methods={methods} onSubmit={onSubmit}>
            <Stack spacing={2}>
              <PersonalInfo />
              <CardInfo />

              <LoadingButton
                loading={isSubmitting}
                variant="contained"
                type="submit"
                fullWidth
              >
                {translate("userOnlineStore.makePaymentUsingFinPay")}
              </LoadingButton>
            </Stack>
          </FormProvider>

          <Dialog open={Boolean(errorMessage)} fullWidth maxWidth="xs">
            <DialogContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Iconify
                  icon="ic:round-error"
                  sx={{
                    fontSize: "8rem",
                    color: palette.error.main,
                  }}
                />

                <Typography color={palette.text.secondary} variant="h6">
                  {errorMessage}
                </Typography>

                <Button
                  onClick={() => setErrorMessage("")}
                  sx={{ marginTop: "1rem" }}
                  variant="contained"
                  color="error"
                >
                  {translate("userOnlineStore.tryAgain")}
                </Button>
              </Box>
            </DialogContent>
          </Dialog>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FinPay;
