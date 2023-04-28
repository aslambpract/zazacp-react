import { Card, Grid, Typography } from "@mui/material";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { RHFUploadAvatar } from "src/components/hook-form";
import { fData } from "src/utils/formatNumber";
import useLocales from "src/hooks/useLocales";


const ImageUpload = ({ title, name }) => {
  const { translate } = useLocales();
  const { setValue } = useFormContext();
  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setValue(
          name,
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ py: 5, px: 3, textAlign: "center" }}>
            <Typography m={2}> {title} </Typography>
            <RHFUploadAvatar
              name={name}
              accept="image/*"
              maxSize={1145728}
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
                  {translate("adminSettings.brand.allowed")} *.jpeg, *.jpg, *.png, *.gif
                  <br /> {translate("adminSettings.brand.size")} {fData(1145728)}
                </Typography>
              }
            />
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default ImageUpload;
