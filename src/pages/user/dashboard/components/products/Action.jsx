import { Button, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { PATH_USER } from "src/routes/paths";

const Action = () => (
  <Box sx={{ padding: "1rem" }}>
    <Stack direction="row" justifyContent="end" alignItems="center" spacing={2}>
      <Button
        LinkComponent={Link}
        to={PATH_USER.onlineStore.productSubscription.view(
          "foundations-matte-flip-flop"
        )}
      >
        View More
      </Button>
      <Button
        variant="outlined"
        LinkComponent={Link}
        to={PATH_USER.onlineStore.checkout}
      >
        Buy Now
      </Button>
    </Stack>
  </Box>
);

export default Action;
