import React from "react";
import useGetSubAdminProfile from "./hooks/useGetSubAdminProfile";

const SubAdminProfile = () => {
  const adminProfileData = useGetSubAdminProfile();
  console.log(adminProfileData);
  return <h1>SubAdminProfile</h1>;
};

export default SubAdminProfile;
