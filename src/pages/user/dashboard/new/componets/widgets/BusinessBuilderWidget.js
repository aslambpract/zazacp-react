import React, { useEffect, useState } from "react";
// @mui
import {
  Box,
  Button,
  Card,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import useErrors from "src/hooks/useErrors";
import fetchUser from "src/utils/fetchUser";
import "./style.css";
import useLocales from "src/hooks/useLocales";
const useBenefits = () => {
  const [ranks, setRanks] = useState({});
  const handleErrors = useErrors();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await fetchUser("rank-benifits");
        if (status === 200) {
          const { data: list } = data;
          const temp = {};
          list.forEach(({ rank_name, message }) => {
            temp[rank_name] = message;
          });

          setRanks(temp);
        }
      } catch (err) {
        handleErrors(err);
      }
    };
    fetchData();
  }, []);

  return ranks;
};

const BusinessBuilderWidget = () => {
  const { translate } = useLocales();
  const [selected, setSelected] = useState("");
  const handleChange = (event) => {
    setSelected(event.target.value);
  };
  const rank = useBenefits();
  useEffect(() => {
    const [first] = Object.keys(rank);
    setSelected(first);
  }, [rank]);

  return (
    <>
      <Card>
        <Box
          sx={{
            display: "grid",
            padding: 2,
            rowGap: 3,
            columnGap: 2,
            marginTop: 1,
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
            },
          }}
        >
          <Box>
            <CardHeader title={translate("userDashboard.businessBuilderBenefits")} />
          </Box>
          <Box>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel size="normal" id="demo-simple-select-label-rank">
               {translate("userDashboard.selectRank")} 
              </InputLabel>
              <Select
                labelId="demo-simple-select-label-rank"
                id="demo-simple-select-label-rank"
                value={selected}
                label="Rank"
                onChange={handleChange}
              >
                {Object.keys(rank).map((k) => (
                  <MenuItem value={k}>{k}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        <ul className="s2">
          {rank[selected]?.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        <Box
          sx={{
            display: "grid",
            padding: 2,
            rowGap: 3,
            columnGap: 2,
            marginTop: 1,
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
            },
          }}
        >
          <Button variant="contained">{translate("userDashboard.revenuePlan")}</Button>
          <Button variant="contained">{translate("userDashboard.becomeABusinessBuilder")}</Button>
        </Box>
      </Card>
    </>
  );
};

export default BusinessBuilderWidget;
