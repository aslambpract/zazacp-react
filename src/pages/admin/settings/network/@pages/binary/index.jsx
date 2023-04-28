// @mui
import { LoadingButton } from "@mui/lab";
import {
  Box,
  CircularProgress,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useState } from "react";
import Scrollbar from "src/components/Scrollbar";
import { FormProvider } from "src/components/hook-form";
import useLocales from "src/hooks/useLocales";
import useBinary from "./hooks/useBinary";

const DataTable = () => {
  const { translate } = useLocales();
  const { data, handleUpdate, onSubmit } = useBinary();
  return (
    <div>
      <Scrollbar>
        <FormProvider>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    {translate("adminSettings.network.rank")}
                  </TableCell>
                  <TableCell>
                    {translate("adminSettings.network.BVCapping")}{" "}
                  </TableCell>
                  <TableCell>
                    {translate("adminSettings.network.binaryBonusCapping")}{" "}
                  </TableCell>
                  <TableCell>
                    {translate("adminSettings.network.binaryMatching")}
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item) => {
                  return (
                    <Item
                      key={item.id}
                      onSubmit={onSubmit}
                      handleUpdate={handleUpdate}
                      {...item}
                    />
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </FormProvider>
      </Scrollbar>
      <Box textAlign="right">
        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton type="submit" variant="contained">
            {translate("adminSettings.network.update")}
          </LoadingButton>
        </Stack>
      </Box>
    </div>
  );
};

const Item = ({
  id,
  rank_name,
  binary_bonus_capping,
  binary_volume_capping,
  binary_matching,
  onSubmit,
  handleUpdate,
}) => {
  return (
    <>
      <TableRow key={id}>
        <TableCell>
          <TextField type="text" size="small" value={rank_name} disabled />
        </TableCell>
        <TableCell>
          <LoadingTextField
            handleUpdate={handleUpdate(id)}
            onSubmit={onSubmit(id)}
            value={binary_volume_capping}
            name="binary_volume_capping"
          />
        </TableCell>
        <TableCell>
          <LoadingTextField
            handleUpdate={handleUpdate(id)}
            onSubmit={onSubmit(id)}
            value={binary_bonus_capping}
            name="binary_bonus_capping"
          />
        </TableCell>

        <TableCell>
          <LoadingTextField
            handleUpdate={handleUpdate(id)}
            onSubmit={onSubmit(id)}
            value={binary_matching}
            name="binary_matching"
          />
        </TableCell>
      </TableRow>
    </>
  );
};

const LoadingTextField = ({ value, name, handleUpdate, onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const onChange = (e) => {
    setLoading(true);
    handleUpdate(e);
  };
  const handleSubmit = async () => {
    const isSuccess = await onSubmit();
    setLoading(!isSuccess);
  };

  return (
    <TextField
      onBlur={handleSubmit}
      onChange={onChange}
      type="number"
      size="small"
      value={value}
      name={name}
      InputProps={{
        endAdornment: (
          <InputAdornment position="start">
            {loading ? (
              <CircularProgress size={10} />
            ) : (
              <CircularProgress size={10} variant="determinate" value={0} />
            )}
          </InputAdornment>
        ),
      }}
    />
  );
};

export default DataTable;
