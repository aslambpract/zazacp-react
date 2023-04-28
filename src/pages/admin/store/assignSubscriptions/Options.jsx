import { Box, Button, useMediaQuery } from "@mui/material";
import React from "react";
import Iconify from "src/components/Iconify";
import useLocales from "src/hooks/useLocales";

const Options = ({ openCombo, openProduct }) => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const buttonProps = {
    size: isSmallScreen ? "small" : "medium",
  };
  const { translate } = useLocales();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row-reverse",
        p: 1,
        m: 1,
        bgcolor: "background.paper",
        borderRadius: 1,
        gap: 1,
      }}
    >
      <Button
        {...buttonProps}
        variant="outlined"
        startIcon={<Iconify icon={"carbon:add"} />}
        onClick={openCombo}
      >
        {translate("adminStore.assignSubscriptions.comboProduct")}
      </Button>
      <Button
        {...buttonProps}
        variant="outlined"
        startIcon={<Iconify icon={"carbon:add"} />}
        onClick={openProduct}
      >
        {translate("adminStore.assignSubscriptions.productss")}
      </Button>
    </Box>
  );
};
export default Options;
