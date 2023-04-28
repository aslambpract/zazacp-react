import { LoadingButton } from "@mui/lab";
import {
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import Iconify from "src/components/Iconify";
import Scrollbar from "src/components/Scrollbar";
import Map from "src/components/map";
import useErrors from "src/hooks/useErrors";
import axiosInstance from "src/utils/axios";
import useGetData from "./hooks/useGetData";

const Level = () => {
  const { data } = useGetData();
  const handleErrors = useErrors();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (id, percentage) => {
    const reqData = new FormData();
    reqData.append("_method", "PUT");
    reqData.append("percentage", percentage);

    try {
      const { data, status } = await axiosInstance.post(
        `api/admin/level-settings/${id}`,
        reqData
      );

      if (status === 200) {
        enqueueSnackbar(data.message);
        return false;
      }
    } catch (err) {
      handleErrors(err);
    }
  };
  return (
    <Scrollbar>
      <TableContainer sx={{ maxWidth: 500 }}>
        <Table>
          <TableBody>
            <Map
              list={data}
              render={(item) => (
                <Row key={item.id} {...item} onSubmit={onSubmit} />
              )}
            />
          </TableBody>
        </Table>
      </TableContainer>
    </Scrollbar>
  );
};

const Row = ({ id, level, percentage, onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(percentage);

  const handleSubmit = async () => {
    setLoading(true);
    const status = await onSubmit(id, data);
    setLoading(status);
  };

  return (
    <TableRow>
      <TableCell>
        <Typography>Level {level}</Typography>
      </TableCell>
      <TableCell>
        <TextField
          onChange={(e) => setData(e.target.value)}
          value={data}
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Iconify icon="uil:percentage" />
              </InputAdornment>
            ),
          }}
        />
      </TableCell>
      <TableCell>
        <LoadingButton
          loading={loading}
          onClick={handleSubmit}
          variant="contained"
          size="small"
        >
          Update
        </LoadingButton>
      </TableCell>
    </TableRow>
  );
};

export default Level;
