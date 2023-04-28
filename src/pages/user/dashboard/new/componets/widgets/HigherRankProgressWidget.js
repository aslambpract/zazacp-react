import { Box, Card, LinearProgress, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useErrors from "src/hooks/useErrors";
import fetchUser from "src/utils/fetchUser";
import useLocales from "src/hooks/useLocales";

const useHigherRank = () => {
  const [higherRank, setHigherRank] = useState([]);
  const handleErrors = useErrors();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await fetchUser("rank-progress");
        if (status === 200) {
          setHigherRank(data.data);
        }
      } catch (err) {
        handleErrors(err);
      }
    };
    fetchData();
  }, []);
  return higherRank;
};

const Progress = ({ label, value }) => {

  return (
    <Box>
      <Typography sx={{ paddingBottom: "0.3rem" }}>{label}</Typography>
      <LinearProgress variant="determinate" value={value} />
    </Box>
  );
};

const HigherRankProgressWidget = () => {
  const { translate } = useLocales();
  const higherRank = useHigherRank();

  return (
    <div>
      <Card sx={{ padding: "2rem" }} variant="outlined">
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
        {translate("userDashboard.higherRankProgress")} 
        </Typography>
        <Stack spacing={2}>
          {higherRank.map(({ rank_name, percentage, id }) => (
            <Progress key={id} label={rank_name} value={percentage} />
          ))}
        </Stack>
      </Card>
    </div>
  );
};

export default HigherRankProgressWidget;
