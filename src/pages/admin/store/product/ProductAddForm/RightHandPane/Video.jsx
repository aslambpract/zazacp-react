import { Card, Stack } from "@mui/material";
import { RHFTextField } from "src/components/hook-form";
import useLocales from "src/hooks/useLocales";


const Video = () =>{
  const { translate } = useLocales();
  return(
    <Card sx={{ p: 3 }}>
      <Stack spacing={1}>
        <RHFTextField name="video" label={translate("adminStore.products.addVimeoVideo")} />
      </Stack>
    </Card>
  );
}
export default Video;
