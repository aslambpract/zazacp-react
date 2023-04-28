import {
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Paper,
} from "@mui/material";

import Iconify from "src/components/Iconify";
import useLocales from "src/hooks/useLocales";
import useBottomLinks from "./data/bottomLinks";
import useTopLinks from "./data/topLinks";
import MenuLinks from "./MenuLink";

const SideBar = ({ handleClickOpenTicket }) => {
  const topLinks = useTopLinks();
  const bottomLinks = useBottomLinks();
  const { translate } = useLocales();
  return (
    <Grid item xs={12} sm={3} md={3}>
      <Paper elevation={2}>
        <Box
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
        >
          <nav>
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={handleClickOpenTicket}>
                  <ListItemIcon>
                    <Button
                      startIcon={<Iconify icon={"gridicons:create"} />}
                      disableRipple
                    >
                      {translate("adminCommunication.helpCenter.createTicket")}
                    </Button>
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
          <Divider />
          <nav aria-label="main mailbox folders">
            <List>
              <MenuLinks linkList={topLinks} />
              <Divider />
              <MenuLinks linkList={bottomLinks} />
            </List>
          </nav>
        </Box>
      </Paper>
    </Grid>
  );
};

export default SideBar;
