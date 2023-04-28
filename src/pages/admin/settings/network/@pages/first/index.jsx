import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import Scrollbar from "src/components/Scrollbar";
import { FormProvider } from "src/components/hook-form";
import Map from "src/components/map";
import useErrors from "src/hooks/useErrors";
import useLocales from "src/hooks/useLocales";
import axiosInstance from "src/utils/axios";
import URI from "src/utils/urlConfig";
import useFirstOrder from "./hooks/useFirstOrder";

const DataTable = () => {
  const { translate } = useLocales();
  const data = useFirstOrder();

  return (
    <div>
      <Scrollbar>
        <FormProvider>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    {translate("adminSettings.network.products")}
                  </TableCell>
                  <TableCell>
                    1 {translate("adminSettings.network.month")}{" "}
                  </TableCell>
                  <TableCell>
                    3 {translate("adminSettings.network.month")}{" "}
                  </TableCell>
                  <TableCell>
                    6 {translate("adminSettings.network.month")}
                  </TableCell>
                  <TableCell>
                    12 {translate("adminSettings.network.month")}
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                <Map
                  list={data}
                  render={(item) => <Item key={item.id} {...item} />}
                />
              </TableBody>
            </Table>
          </TableContainer>
        </FormProvider>
      </Scrollbar>
    </div>
  );
};

const Item = (props) => {
  const [data, setData] = useState(props);
  const handleError = useErrors();
  const { enqueueSnackbar } = useSnackbar();
  const onChange = (editId) => (e) => {
    const selectedIndex = data.product_fob_price?.findIndex(
      ({ id }) => id === editId
    );
    const selectedItem = data.product_fob_price?.find(
      ({ id }) => id === editId
    );
    selectedItem.price = Math.abs(e.target.value);
    const temp = [...data.product_fob_price];
    temp.splice(selectedIndex, 1, selectedItem);
    setData({ ...data, product_fob_price: temp });
  };

  const handleUpdate = (id) => async (e) => {
    const reqData = new FormData();
    const { value } = e.target;
    reqData.append("price", Math.abs(value));
    reqData.append("_method", "PUT");

    try {
      const { status, data } = await axiosInstance.post(
        URI.admin.settings.network.firstOrder.update(id),
        reqData
      );
      if (status === 200) {
        enqueueSnackbar(data.message);
      }
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <TableRow key={data.id}>
      <TableCell>
        <TextField type="text" size="small" value={data.name} disabled />
      </TableCell>
      <Map
        list={data.product_fob_price}
        render={(price) => {
          return (
            <TableCell key={price.id}>
              <TextField
                onBlur={handleUpdate(price.id)}
                type="number"
                onChange={onChange(price.id)}
                size="small"
                value={price.price}
              />
            </TableCell>
          );
        }}
      />
    </TableRow>
  );
};

export default DataTable;
