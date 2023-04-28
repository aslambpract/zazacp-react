import React from 'react'
import useLocales from "src/hooks/useLocales";


const ProfileActivity = () => {
  const { translate } = useLocales();
  return (
    <div>
        <h4>{translate("profile.activity")} </h4>
    </div>
  )
}

export default ProfileActivity;