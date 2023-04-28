import PropTypes from "prop-types";
// @mui
import { Card, Stack, Typography, Divider, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
// utils

const Index = ({ data }) => {
  const { palette } = useTheme();
  return (
    <div>
      <Card
        sx={{
          py: 3,
          color: palette.primary.main,
          backgroundColor: "#f1f1f1a8",
        }}
      >
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
        >
          <Stack width={1} textAlign="center">
            <Typography variant="h6">
              {new Date(data.created_at).toLocaleDateString("en-GB")}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Created Date
            </Typography>
          </Stack>

          <Stack width={1} textAlign="center">
            <Typography variant="h6">
              {new Date(data.user?.updated_at).toLocaleDateString("en-GB")}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Last Response
            </Typography>
          </Stack>
        </Stack>
      </Card>
    </div>
  );
};

export default Index;
