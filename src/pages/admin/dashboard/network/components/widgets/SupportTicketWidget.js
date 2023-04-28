import { Box, Card, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import useErrors from "src/hooks/useErrors";
import axiosInstance from "src/utils/axios";
import URI from "src/utils/urlConfig";
import CustomRadialChart from "./customRadialChart";
import useLocales from "src/hooks/useLocales";



const useSupportTickets = () => {
 
  const handleErrors = useErrors();
  const [data, setData] = useState({
    all_tickets: 0,
    open_tickets: 0,
    closed_tickets: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, status } = await axiosInstance(
          URI.admin.network.supportTickets
        );
        if (status === 200) {
          setData(data.data);
        }
      } catch (err) {
        handleErrors(err);
      }
    };

    fetchData();
  }, []);

  return data;
};

const SupportTicketWidget = () => {
  const { translate } = useLocales();
  const { all_tickets, closed_tickets, open_tickets } = useSupportTickets();

  return (
    <Card sx={{ display: "flex", alignItems: "center", p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2" paragraph>
          {translate("adminDashboard.network.supportTickets")}
        </Typography>
        <Typography variant="h4">{all_tickets}</Typography>
        <Typography variant="caption" noWrap sx={{ color: "text.secondary" }}>
         {translate("adminDashboard.network.tickets")} 
        </Typography>
        <Typography variant="h5" sx={{ mt: 5 }}>
          {open_tickets}
        </Typography>
        <Typography variant="caption" noWrap sx={{ color: "text.secondary" }}>
         {translate("adminDashboard.network.openTickets")} 
        </Typography>
        <Typography variant="h5">{closed_tickets}</Typography>
        <Typography variant="caption" noWrap sx={{ color: "text.secondary" }}>
         {translate("adminDashboard.network.closedTickets")} 
        </Typography>
      </Box>
      <CustomRadialChart count={closed_tickets} />
    </Card>
  );
};

SupportTicketWidget.propTypes = {
  chartColor: PropTypes.string,
  chartData: PropTypes.arrayOf(PropTypes.number),
  percent: PropTypes.number,
  title: PropTypes.string,
  total: PropTypes.number,
};

export default SupportTicketWidget;
