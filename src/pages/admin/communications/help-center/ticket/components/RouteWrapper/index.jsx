import { Grid, Paper } from "@mui/material";
import { useState } from "react";
import AddDialog from "./AddDialog";
import RouteContainer from "./RouteContainer";
import SideBar from "./sideBar";

const RouteWrapper = ({ children }) => {
  const [openTicket, setOpenTicket] = useState(false);

  const handleOpen = () => {
    setOpenTicket(true);
  };

  const handleClose = () => {
    setOpenTicket(false);
  };
  return (
    <>
      <RouteContainer>
        <SideBar handleClickOpenTicket={handleOpen} />
        <Grid item xs={12} sm={9} md={9}>
          <Paper elevation={0}>{children}</Paper>
        </Grid>
      </RouteContainer>

      <AddDialog
        open={openTicket}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      />
    </>
  );
};

export default RouteWrapper;
