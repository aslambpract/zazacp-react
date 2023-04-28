import { Box, Card, Typography } from "@mui/material";
import PropTypes from "prop-types";
import Iconify from "src/components/Iconify";
import { fShortenNumber } from "src/utils/formatNumber";

const Cards = ({ title, color, total, icon }) => {
  return (
    <Card sx={{ display: "flex", alignItems: "center", p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">{title}</Typography>

        <Typography variant="h4" style={{ whiteSpace: "pre" }}>
          $ {fShortenNumber(total)}
        </Typography>
      </Box>

      <Box>
        <Iconify color={color} width={60} height={60} icon={icon} />
      </Box>
    </Card>
  );
};

Cards.propTypes = {
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default Cards;
