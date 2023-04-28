import { Box, Typography } from "@mui/material";
import React from "react";
import { RHFUploadAvatar } from "src/components/hook-form";
import useAuth from "src/hooks/useAuth";
import { fData } from "src/utils/formatNumber";
import useUploadImage from "../hooks/useUploadImage";
import useLocales from "src/hooks/useLocales";


const ProfilePicture = () => {
  const { translate } = useLocales();
  const { user } = useAuth();

  const handleDrop = useUploadImage();

  return (
    <Box sx={{ mb: 5 }}>
      <RHFUploadAvatar
        name="avatarUrl"
        fileUrl={user.user_profile?.profile_image}
        accept="image/png, image/jpg, image/jpeg, image/gif"
        maxSize={114578}
        onDrop={handleDrop}
        helperText={
          <Typography
            variant="caption"
            sx={{
              mt: 2,
              mx: "auto",
              display: "block",
              textAlign: "center",
              color: "text.secondary",
            }}
          >
            {translate("userProfile.allowed")} *.jpeg, *.jpg, *.png, *.gif
            <br /> {translate("userProfile.max")} {fData(200000)}
          </Typography>
        }
      />
    </Box>
  );
};

export default ProfilePicture;
