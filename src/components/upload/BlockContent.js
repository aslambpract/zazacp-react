// @mui
import { Box, Stack, Typography } from "@mui/material";
// assets
import useLocales from "src/hooks/useLocales";
import { UploadIllustration } from "../../assets";

// ----------------------------------------------------------------------

export default function BlockContent({ maxSize }) {
  const { translate } = useLocales();
  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="center"
      direction={{ xs: "column", md: "row" }}
      sx={{ width: 1, textAlign: { xs: "center", md: "left" } }}
    >
      <UploadIllustration sx={{ width: 220 }} />

      <Box sx={{ p: 3 }}>
        <Typography gutterBottom variant="h5">
          {translate("adminCommunication.blog.dropOrSelectFile")}
        </Typography>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Drop files here or click&nbsp;
          <Typography
            variant="body2"
            component="span"
            sx={{ color: "primary.main", textDecoration: "underline" }}
          >
            {translate("adminCommunication.blog.browse")}
          </Typography>
          &nbsp; {translate("adminCommunication.blog.throughYourMachine")}{" "}
        </Typography>
        <Typography variant="caption">Max size: {maxSize / 1000} KB</Typography>
      </Box>
    </Stack>
  );
}
