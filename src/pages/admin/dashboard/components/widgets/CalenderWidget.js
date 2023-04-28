import { Box, Card, IconButton, Tooltip, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { useEffect, useState } from "react";
import Iconify from "src/components/Iconify";
import Image from "src/components/Image";
import Scrollbar from "src/components/Scrollbar";
import Nodata from "src/images/no-data.svg";
import axiosInstance from "src/utils/axios";
import EventsList from "../lists/EventsList";
import useLocales from "src/hooks/useLocales";




const useEvents = () => {
  const [data, setData] = useState([]);

  const fetchData = async (date) => {
    try {
      const { status, data } = await axiosInstance(
        "api/admin/dashboard/events",
        {
          params: {
            date: date,
          },
        }
      );

      if (status === 200) {
        setData(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { events: data, fetchData };
};

const CalenderIcon = () => {
  return (
    <Tooltip title="Pick Date">
      <IconButton sx={{ backgroundColor: "#2384ff" }}>
        <Iconify
          icon="healthicons:i-schedule-school-date-time-outline"
          sx={{ color: "#fff" }}
        />
      </IconButton>
    </Tooltip>
  );
};

const CalenderWidget = () => {
  const { translate } = useLocales();
  const [value, setValue] = useState(new Date());
  const { events, fetchData } = useEvents();

  useEffect(() => {
    fetchData(value.getTime());
  }, [value]);

  const month = value.toLocaleDateString("en-GB", { month: "short" });
  const day = value.toLocaleDateString("en-GB", { day: "2-digit" });
  const isLoaded = Boolean(events.length);

  return (
    <Card>
      <Box sx={{ backgroundColor: "#348efe", p: 2 }}>
        <Box>
          <Box
            sx={{
              display: "grid",
              rowGap: 3,
              columnGap: 2,
              marginTop: 1,
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
              },
            }}
          >
            <Box
              sx={{
                width: "50%",
                padding: "7px",
                borderRadius: "5px",
                textAlign: "center",
                border: "2px solid #ffffff66",
                color: "#fff",
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                {month}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {day}
              </Typography>
            </Box>
            <Box
              sx={{ textAlign: "end", marginTop: "1rem", marginLeft: "50%" }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Custom input"
                  components={{
                    OpenPickerIcon: CalenderIcon,
                  }}
                  value={value}
                  onChange={(newValue) => setValue(new Date(newValue))}
                  renderInput={({ inputRef, inputProps, InputProps }) => (
                    <Box sx={{ display: "flex", alignItems: "end" }}>
                      <p ref={inputRef} {...inputProps}>
                        {InputProps?.endAdornment}
                      </p>
                    </Box>
                  )}
                  sx={{ color: "#fff" }}
                />
              </LocalizationProvider>
            </Box>
          </Box>

          <Typography variant="h5" sx={{ mt: 1, color: "#fff" }}>
           {translate("adminDashboard.business.bitcoinConference")} 
          </Typography>
          <Typography variant="subtitle2" sx={{ color: "#fff9" }}>
           {translate("adminDashboard.business.onBitcointradingandForecast")} 
          </Typography>
        </Box>
      </Box>
      <Box sx={{ backgroundColor: "background.paper", height: 170 }}>
        {isLoaded ? (
          <Scrollbar>
            <EventsList events={events} />
          </Scrollbar>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Tooltip title="No Data">
              <Typography>
                <Image src={Nodata} sx={{ width: "10vh" }} />
              </Typography>
            </Tooltip>
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default CalenderWidget;
