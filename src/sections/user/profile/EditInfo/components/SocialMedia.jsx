import {
  FormControl,
  FormGroup,
  FormHelperText,
  FormLabel,
  Typography,
} from "@mui/material";
import { RHFSwitch } from "src/components/hook-form";
import useLocales from "src/hooks/useLocales";


const SocialMedia = () => {
  const { translate } = useLocales();
  return (
    <FormControl component="fieldset" variant="standard">
      <FormLabel component="legend">
        <Typography
          variant="subtitle2"
          sx={{ mb: 0.5 }}
          style={{ color: "#212B36" }}
        >
          {translate("profile.socialMediaScope")}  
        </Typography>
      </FormLabel>
      <FormGroup>
        <RHFSwitch name="social.scope_phone" label="Phone" />
        <RHFSwitch name="social.scope_email" label="Email" />
        <RHFSwitch name="social.scope_facebook" label="Facebook" />
        <RHFSwitch name="social.scope_twitter" label="Twitter" />
        <RHFSwitch name="social.scope_whatsapp" label="WhatsApp" />
        <RHFSwitch name="social.scope_instagram" label="Instagram" />
        <RHFSwitch name="social.scope_telegram" label="Telegram" />
        <RHFSwitch name="social.scope_medium" label="Medium" />
      </FormGroup>
      <FormHelperText>{translate("profile.publicPrivate")}</FormHelperText>
    </FormControl>
  );
};

export default SocialMedia;
