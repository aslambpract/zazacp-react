import { Card, Stack, Typography } from "@mui/material";
import Image from "src/components/Image";
const ReportWidget = ({ icon, total, title }) => {
  return (
    <div>
      <Card
        variant="outlined"
        sx={{
          width: "100%",
          height: "197.222px",
          padding: "30px 15px",
          marginTop: 2,
        }}
      >
        <Stack
          spacing={1.5}
          justifyContent="space-evenly"
          alignItems="center"
          sx={{
            height: "100%",
          }}
        >
          <Image src={icon} sx={{ width: 40 }} />

          <Stack
            spacing={0.5}
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Typography variant="body2" fontWeight="bold">
              {total}
            </Typography>
            <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
              {title}
            </Typography>
          </Stack>
        </Stack>
      </Card>
    </div>
  );
};

export default ReportWidget;
