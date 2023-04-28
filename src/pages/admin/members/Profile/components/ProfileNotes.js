import React from 'react'

import { Card, Typography, Alert } from '@mui/material';
import useLocales from "src/hooks/useLocales";


const ProfileNotes = () => {
  const { translate } = useLocales();
  return (
    <div>
       <Card sx={{ p: 3 }}>
       <Typography variant="subtitle2" color="text.primary" mt={2} mb={2}>
             {translate("profile.yourNotess")} 
        </Typography>
        <Typography variant="subtitle2" style={{color:'#7f8588'}}>
             {translate("profile.notesYouHaveAdded")}
        </Typography>
      </Card>
    </div>
  )
}

export default ProfileNotes