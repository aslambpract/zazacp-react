import { LoadingButton } from "@mui/lab";
import { Box, Stack, useMediaQuery } from "@mui/material";
import { useFormContext } from "react-hook-form";
import useLocales from "src/hooks/useLocales";

const GetReport = ({ size }) => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const buttonProps = {
    size: isSmallScreen ? "small" : "medium",
  };
  const { translate } = useLocales();
  const {
    formState: { isSubmitting },
  } = useFormContext();
  return (
    <Box sx={{ justifyContent: "center" }}>
      <LoadingButton
        {...buttonProps}
        type="submit"
        variant="contained"
        size={size}
        loading={isSubmitting}
      >
        {translate("adminFinancial.Ewallet.getReport")}
      </LoadingButton>
    </Box>
  );
};

export default GetReport;
