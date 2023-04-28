
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import useLocales from "src/hooks/useLocales";
import i18n from "src/locales/i18n"
  

const SearchDataTable = () => {
  const dataList = [
    {
      title: i18n.t("adminStatistics.longTermReports"),
      year: 1994,
    },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: "Pulp Fiction", year: 1994 },
  ];
  
  const { translate } = useLocales();
  return (
    <div>
      <Card sx={{ p: 2 }}>
        <Grid
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

          <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={dataList.map((option) => option.title)}
            renderInput={(params) => <TextField {...params} />}
            fullWidth
            size="small"
          />
          


          <Box>
            <Button variant="contained">{translate("adminStatistics.search")}</Button>
          </Box>
        </Grid>
      </Card>
    </div>
  );
};

export default SearchDataTable;

