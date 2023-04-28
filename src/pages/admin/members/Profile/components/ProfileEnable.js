import React from 'react'
// @mui
import { Card, Typography, Alert } from '@mui/material';
import useLocales from "src/hooks/useLocales";


const ProfileEnable = () => {
  const { translate } = useLocales();
  return (
    <div>
       <Card sx={{ p: 3, mt: 1 }}>
       <Typography variant="subtitle2" color="text.primary" mt={2} mb={2}>
           {translate("profile.twoStepAuthentication")} 
        </Typography>
        <Alert severity="info" color="info">
           {translate("profile.thisAuthentication")}
        </Alert>
        </Card>
    </div>
  )
}

export default ProfileEnable