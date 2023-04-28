import { Box, Card, Typography } from "@mui/material";
import Iconify from "src/components/Iconify";
import { fShortenNumber } from "src/utils/formatNumber";

const Cards = ({ title, total, color, icon }) => {
  return (
    <div>
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          p: 3,
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle2">{title}</Typography>
          <Typography variant="h3">$ {fShortenNumber(total)}</Typography>
        </Box>

        <Box>
          <Iconify width={60} height={60} icon={icon} color={color} />
        </Box>
      </Card>
    </div>
  );
};

export default Cards;
