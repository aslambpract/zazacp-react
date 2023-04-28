import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// @mui
import {
  Box,
  Card,
  Grid,
  Typography,
  Button,
  Stack,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
// components
import Iconify from "src/components/Iconify";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const Index = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Box
        sx={{
          display: "grid",
          columnGap: 2,
          rowGap: 3,
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(2, 1fr)",
          },
        }}
      >
        <Button variant="outlined">Edit</Button>

        <Button
          id="demo-status-button"
          aria-controls={open ? "demo-status-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          variant="contained"
          disableElevation
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
        >
          Open
        </Button>
        <StyledMenu
          id="demo-status-menu"
          MenuListProps={{
            "aria-labelledby": "demo-status-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose} disableRipple>
            <Iconify icon={"bx:folder-open"} />
            &nbsp; Open
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            <Iconify icon={"el:ok-circle"} />
            &nbsp; Resolved
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            <Iconify icon={"ic:baseline-done-all"} />
            &nbsp; Closed
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            <Iconify icon={"bx:archive"} />
            &nbsp; Archived
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            <Iconify icon={"fluent:delete-12-regular"} />
            &nbsp; Deleted
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            <Iconify icon={"octicon:unverified-24"} />
            &nbsp; Unverified
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            <Iconify icon={"fluent:approvals-app-24-filled"} />
            &nbsp; Request Approval
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            <Iconify icon={"mdi:progress-helper"} />
            &nbsp; In Progress
          </MenuItem>
        </StyledMenu>
      </Box>
    </div>
  );
};

export default Index;
