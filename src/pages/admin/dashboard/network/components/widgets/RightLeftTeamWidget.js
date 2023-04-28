import { Card } from "@mui/material";
import { useEffect, useState } from "react";
import useErrors from "src/hooks/useErrors";
import useLocales from "src/hooks/useLocales";
import axiosInstance from "src/utils/axios";
import { isNotBinary } from "src/utils/isBinary";
import URI from "src/utils/urlConfig";
import RankItem from "../list/rankItem";

const useRank = () => {
  const handleErrors = useErrors();
  const [data, setData] = useState({
    left_team: [],
    right_team: [],
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await axiosInstance(
          URI.admin.network.rankCount
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

const RightLeftTeamWidget = () => {
  const { translate } = useLocales();
  const data = useRank();
  const { left_team, right_team } = data;

  return (
    <div>
      <Card sx={{ p: 2 }}>
        <RankItem
          members={left_team}
          label={translate("adminDashboard.network.rightTeam")}
        />
        <RankItem
          members={right_team}
          label={translate("adminDashboard.network.leftTeam")}
        />
      </Card>
    </div>
  );
};

export default RightLeftTeamWidget;
