import { Box, Stack, Typography } from "@mui/material";
import { DOMAIN_NAME } from "src/config";
const Message = () => (
  <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Sign in to {DOMAIN_NAME}
      </Typography>
      {/* <Typography sx={{ color: "text.secondary" }}>
        Lorem Ipsum is simply dummy...
      </Typography> */}
    </Box>
  </Stack>
);

export default Message;
