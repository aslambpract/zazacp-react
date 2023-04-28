import { Card, Typography } from "@mui/material";
import useLocales from "src/hooks/useLocales";


const ProfileNotes = () => {
  const { translate } = useLocales();
  return (
    <div>
      <Card sx={{ p: 3 }}>
        <Typography variant="subtitle2" color="text.primary" mt={2} mb={2}>
        {translate("userProfile.yourNotes")}
        </Typography>
        <Typography variant="subtitle2" style={{ color: "#7f8588" }}>
        {translate("userProfile.notesYouHave")}
        </Typography>
      </Card>
    </div>
  );
};

export default ProfileNotes;
