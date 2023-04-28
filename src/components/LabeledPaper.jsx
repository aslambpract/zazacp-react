import { Paper, Stack, Typography, Card } from "@mui/material";

const LabeledPaper = ({ label, children }) => (
  <Card variant="outlined" sx={{ padding: "2rem", margin: "0.8rem 0" }}>
    <Stack spacing={3}>
      <Typography variant="h6">{label}</Typography>
      {children}
    </Stack>
  </Card>
);

export default LabeledPaper;
