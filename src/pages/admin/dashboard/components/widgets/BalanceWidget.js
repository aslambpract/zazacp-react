import {
  Box,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Iconify from "src/components/Iconify";
import axiosInstance from "src/utils/axios";
import { fNumber } from "src/utils/formatNumber";
import useLocales from "src/hooks/useLocales";



const IconWrapperStyle = styled("div")(({ theme }) => ({
  width: 24,
  height: 24,
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  justifyContent: "center",
  marginRight: theme.spacing(1),
  color: theme.palette.success.main,
  backgroundColor: alpha(theme.palette.success.main, 0.16),
}));

BalanceWidget.propTypes = {
  chartColor: PropTypes.string,
  chartData: PropTypes.arrayOf(PropTypes.number),
  percent: PropTypes.number,
  title: PropTypes.string,
  total: PropTypes.number,
};

const useBalanceWidget = () => {
  const [data, setData] = useState({
    total_sales: "",
    total_expense: "",
    total_profit: "",
  });

  const fetchData = async (month = 1) => {
    try {
      const { data, status } = await axiosInstance(
        "/api/admin/dashboard/balance",
        {
          params: {
            month: `${month} month`,
          },
        }
      );

      if (status === 200) {
        setData(data.data);
      }
    } catch (err) {
      console.err(err);
    }
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  return { balance: data, fetchData };
};

export default function BalanceWidget({ title }) {
  const { translate } = useLocales();
  const { balance, fetchData } = useBalanceWidget();
  const [value, setValue] = useState(1);
  const handleChange = (event) => {
    const v = parseInt(event.target.value);
    fetchData(v);
    setValue(v);
  };

  const {
    total_expense: expense,
    total_profit: profit,
    total_sales: sales,
  } = balance;
  return (
    <Card sx={{ display: "flex", alignItems: "center", p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            display: "grid",
            rowGap: 3,
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 2fr)",
              md: "repeat(2, 2fr)",
            },
          }}
        >
          <Box>
            <Typography variant="subtitle2" paragraph>
              {title}
            </Typography>
          </Box>
          <Box>
            <FormControl fullWidth size="small">
              <InputLabel id="expense-label">{translate("adminDashboard.business.selectAnOption")}</InputLabel>
              <Select
                labelId="expense-label"
                value={value}
                label="Select an Option"
                onChange={handleChange}
              >
                <MenuItem value={1}>1 {translate("adminDashboard.business.month")}</MenuItem>
                <MenuItem value={3}>3 {translate("adminDashboard.business.month")}</MenuItem>
                <MenuItem value={6}>6 {translate("adminDashboard.business.month")}</MenuItem>
                <MenuItem value={12}>12 {translate("adminDashboard.business.month")}</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Typography variant="h3" gutterBottom>
          {fNumber(profit)}
        </Typography>

        <Box
          sx={{
            display: "grid",
            rowGap: 3,
            columnGap: 2,
            marginTop: 1,
            marginBottom: 2,
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 2fr)",
              md: "repeat(2, 2fr)",
            },
          }}
        >
          <Stack direction="row" alignItems="center" style={{ flexWrap: "wrap" }}>
            <IconWrapperStyle
              sx={{
                color: "success.main",
                bgcolor: (theme) => alpha(theme.palette.success.main, 0.16),
              }}
            >
              <Iconify width={16} height={16} icon="eva:trending-up-fill" />
            </IconWrapperStyle>

            <Typography variant="subtitle2" component="span">
              + {sales}
            </Typography>
            <Typography
              variant="body2"
              component="span"
              noWrap
              sx={{ color: "text.secondary" }}
            >
              &nbsp;{translate("adminDashboard.business.income")}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            style={{ flexWrap: "wrap" }}
          >
            <IconWrapperStyle
              sx={{
                color: "error.main",
                bgcolor: (theme) => alpha(theme.palette.error.main, 0.16),
              }}
            >
              <Iconify width={16} height={16} icon="eva:trending-down-fill" />
            </IconWrapperStyle>

            <Typography variant="subtitle2" component="span">
              - {expense}
            </Typography>
            <Typography
              variant="body2"
              component="span"
              noWrap
              sx={{ color: "text.secondary" }}
            >
              &nbsp;{translate("adminDashboard.business.expense")}
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Card>
  );
}
