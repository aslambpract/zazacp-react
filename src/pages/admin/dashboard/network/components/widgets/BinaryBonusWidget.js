import { Box, Button, Card, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import useErrors from "src/hooks/useErrors";
import BgCover from "src/images/binary-bg.png";
import axiosInstance from "src/utils/axios";
import URI from "src/utils/urlConfig";
import useLocales from "src/hooks/useLocales";



const useBonus = () => {
  const [bonus, setBonus] = useState(0);
  const handleErrors = useErrors();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await axiosInstance(
          URI.admin.network.binaryBonus
        );

        if (status === 200) {
          setBonus(data.data);
        }
      } catch (err) {
        handleErrors(err);
      }
    };

    fetchData();
  }, []);
  return bonus;
};

const BinaryBonusWidget = () => {
  const { translate } = useLocales();
  const { palette } = useTheme();
  const bonus = useBonus();
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        p: 3,
        backgroundColor: palette.primary.main,
        backgroundImage: `url(${BgCover})`,
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Typography
          variant="caption"
          paragraph
          sx={{ color: palette.primary.contrastText }}
        >
          {translate("adminDashboard.network.upcomingWeek")} 
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ color: palette.primary.contrastText }}
        >
         {translate("adminDashboard.network.binaryBonus")}  
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          sx={{ color: palette.primary.contrastText }}
        >
          <Typography variant="h3"> $ {bonus}</Typography>
        </Stack>
      </Box>

      <Box sx={{ marginTop: "auto" }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: palette.primary.lighter,
            color: palette.primary.main,
          }}
        >
          {translate("adminDashboard.network.history")} 
        </Button>
      </Box>
    </Card>
  );
};

export default BinaryBonusWidget;
