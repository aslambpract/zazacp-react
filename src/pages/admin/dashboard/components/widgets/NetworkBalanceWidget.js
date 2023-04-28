import { Box, Card, Chip, Stack, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import merge from "lodash/merge";
import PropTypes from "prop-types";
import Iconify from "src/components/Iconify";
// utils
import { fCurrency } from "src/utils/formatNumber";
// components
import Image from "src/components/Image";

NetworkBalanceWidget.propTypes = {
  percent: PropTypes.number,
  title: PropTypes.string,
  total: PropTypes.number,
  icon: PropTypes.string,
};

export default function NetworkBalanceWidget({ title, total, icon }) {
  return (
    <Card sx={{ display: "flex", alignItems: "center", p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Stack direction="row" alignItems="center">
          <Image
            src={icon}
            alt="dolar"
            sx={{
              width: "32px",
              backgroundColor: "#e4e4e47d",
              borderRadius: "50%",
              padding: "7px",
            }}
          />
        </Stack>
        <Typography variant="h4" gutterBottom>
          {fCurrency(total)}
        </Typography>
        <Typography
          variant="subtitle2"
          paragraph
          sx={{ color: "text.secondary" }}
        >
          {title}
        </Typography>
      </Box>
    </Card>
  );
}
