import { Box, Card, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Iconify from "src/components/Iconify";
import useLocales from "src/hooks/useLocales";


const Footer = () => {
  const { translate } = useLocales();
  const { palette } = useTheme();

  return (
    <Stack sx={{ marginTop: "3rem" }} spacing={3}>
      <Stack sx={{ textAlign: "center" }} spacing={1}>
        <Typography variant="h3">{translate("userHelpCenter.faq.youStill")}</Typography>
        <Typography>
          {translate("userHelpCenter.faq.ifYou")}
        </Typography>
      </Stack>
      <Box
        sx={{
          display: "grid",
          rowGap: 2,
          columnGap: 2,
          gridTemplateColumns: {
            md: "repeat(2,1fr)",
          },
        }}
      >
        <Card sx={{ padding: "2rem" }}>
          <Stack alignItems="center" spacing={1}>
            <Iconify
              icon="bx:phone-call"
              sx={{
                fontSize: "2rem",
                color: palette.primary.main,
              }}
            />
            <Typography variant="h5">+ (91) 1234 5678</Typography>
            <Typography variant="caption">
              {translate("userHelpCenter.faq.weAreAlways")}
            </Typography>
          </Stack>
        </Card>
        <Card sx={{ padding: "2rem" }}>
          <Stack alignItems="center" spacing={1}>
            <Iconify
              icon="ci:mail"
              sx={{
                fontSize: "2rem",
                color: palette.primary.main,
              }}
            />
            <Typography variant="h5">help@mlm.com</Typography>
            <Typography variant="caption">
              {translate("userHelpCenter.faq.bestWay")}
            </Typography>
          </Stack>
        </Card>
      </Box>
    </Stack>
  );
};

export default Footer;
