import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NavLink as RouterLink } from "react-router-dom";

import Iconify from "src/components/Iconify";

const MenuLinks = ({ linkList = [] }) => {
  return linkList.map(({ icon, primary, to }) => (
    <ListItem disablePadding>
      <ListItemButton to={to} component={RouterLink}>
        <ListItemIcon>
          <Iconify icon={icon.icon} style={{ color: icon.color }} />
        </ListItemIcon>
        <ListItemText primary={primary} />
      </ListItemButton>
    </ListItem>
  ));
};

export default MenuLinks;
