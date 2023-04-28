import { Card } from "@mui/material";
import { Outlet } from "react-router-dom";
import { PermanentSidebar } from "../components/MailSideBar/permanentSidebar";
import useAdminLabels from "./hooks/useAdminLabels";

const Mail = () => {
  const labels = useAdminLabels();
  return (
    <Card sx={{ height: { md: "72vh" }, display: { md: "flex" } }}>
      <PermanentSidebar labels={labels} />
      <Outlet context={{ labels: labels }} />
    </Card>
  );
};

export default Mail;
