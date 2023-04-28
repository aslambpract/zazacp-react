import {
  Box,
  Button,
  Card,
  Divider,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Iconify from "src/components/Iconify";
import { PATH_USER } from "src/routes/paths";
import EventList from "./EventList";
import useAllEvents from "./hooks/useAllEvents";
import "./style.css";
import useLocales from "src/hooks/useLocales";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const filter = (data, arg) => {
  const filterData = (arg) =>
    data
      .filter(
        ({ access_scope }) => access_scope.toLowerCase() === arg.toLowerCase()
      )
      .slice(0, 3);
  switch (arg) {
    case 0:
      return data.slice(0, 3);
    case 1:
      return filterData("private");
    case 2:
      return filterData("public");
    default:
      return [];
  }
};

const AllEventsList = () => {
  const { translate } = useLocales();
  const [value, setValue] = useState(0);
  const events = useAllEvents();
  const [show, setShow] = useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    setShow(filter(events, value));
  }, [value, events]);

  return (
    <>
      <Card sx={{ p: 2 }}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label={translate("userDashboard.allEvents")} {...a11yProps(0)} />
              <Tab label={translate("userDashboard.activeSubscriptionEvents")} {...a11yProps(1)} />
              <Tab label={translate("userDashboard.publicEvents")} {...a11yProps(2)} />
            </Tabs>
          </Box>
          <EventList events={show} />

          <TabPanel />
        </Box>
        <Divider />

        <Box sx={{ p: 1, textAlign: "right" }}>
          <Button
            LinkComponent={Link}
            to={PATH_USER.events}
            size="small"
            color="primary"
            endIcon={<Iconify icon={"eva:arrow-ios-forward-fill"} />}
          >
           {translate("viewMore")} 
          </Button>
        </Box>
      </Card>
    </>
  );
};

export default AllEventsList;
