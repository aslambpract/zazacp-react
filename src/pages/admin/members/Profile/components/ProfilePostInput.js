import { useRef } from "react";
// @mui
import { Box, Button, Card, IconButton, TextField } from "@mui/material";
// components
import useLocales from "src/hooks/useLocales";
import Iconify from "../../../../../components/Iconify";

// ----------------------------------------------------------------------

export default function ProfilePostInput() {
  const { translate } = useLocales();
  const fileInputRef = useRef(null);

  const handleAttach = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card sx={{ p: 3 }}>
      <TextField
        multiline
        fullWidth
        rows={4}
        placeholder={translate("profile.shareWhat")}
        sx={{
          "& fieldset": {
            borderWidth: `1px !important`,
            borderColor: (theme) => `${theme.palette.grey[500_32]} !important`,
          },
        }}
      />

      <Box
        sx={{
          mt: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <IconButton size="small" onClick={handleAttach} sx={{ mr: 1 }}>
            <Iconify
              icon={"ic:round-add-photo-alternate"}
              width={24}
              height={24}
            />
          </IconButton>
          <IconButton size="small" onClick={handleAttach}>
            <Iconify icon={"eva:attach-2-fill"} width={24} height={24} />
          </IconButton>
        </Box>
        <Button variant="contained"> {translate("profile.post")} </Button>
      </Box>

      <input ref={fileInputRef} type="file" style={{ display: "none" }} />
    </Card>
  );
}
