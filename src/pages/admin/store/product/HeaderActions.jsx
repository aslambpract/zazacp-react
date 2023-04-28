import { Box, Button, Menu, MenuItem } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Iconify from "src/components/Iconify";
import { PATH_DASHBOARD } from "src/routes/paths";
import useLocales from "src/hooks/useLocales";


const HeaderActions = () => {
  const { translate } = useLocales();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box
        sx={{
          display: "grid",
          columnGap: 1,
          rowGap: 3,
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(1, 1fr)",
          },
        }}
      >
        <Button
          variant="contained"
          
          startIcon={<Iconify icon={"eva:plus-fill"} />}
          aria-haspopup="true"
          onClick={handleClick}
        >
          {translate("adminStore.products.add")}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={handleClose}
            component={RouterLink}
            to={PATH_DASHBOARD.store.product_add}
          >
           {translate("adminStore.products.product")}
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            component={RouterLink}
            to={PATH_DASHBOARD.store.product_combo}
          >
           {translate("adminStore.products.comboProduct")} 
          </MenuItem>
          <MenuItem
            onClick={handleClose}
            component={RouterLink}
            to={PATH_DASHBOARD.store.product_categories}
          >
             {translate("adminStore.products.category")} 
          </MenuItem>
        </Menu>

        {/* <Button
          component={RouterLink}
          to={PATH_DASHBOARD.store.product_add}
          variant="contained"
          startIcon={<Iconify icon={"eva:plus-fill"} />}
        >
          Product
        </Button>

        <Button
          component={RouterLink}
          to={PATH_DASHBOARD.store.product_combo}
          variant="contained"
          startIcon={<Iconify icon={"eva:plus-fill"} />}
        >
          Combo Product
        </Button>
        <Button
          variant="contained"
          startIcon={<Iconify icon={"carbon:add"} />}
          component={RouterLink}
          to={PATH_DASHBOARD.store.product_categories}
        >
          Category
        </Button> */}
      </Box>
    </>
  );
};

export default HeaderActions;
