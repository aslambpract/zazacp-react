import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import { PATH_DASHBOARD } from "src/routes/paths";

import Scrollbar from "src/components/Scrollbar";
import useLocales from "src/hooks/useLocales";


const MaterialTable = ({ materials, rowStart }) => {
  const { translate } = useLocales();
  return (
    <Scrollbar>
      <TableContainer sx={{ minWidth: 720 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell> {translate("adminStore.material.no")}</TableCell>
              <TableCell> {translate("adminStore.material.productName")} </TableCell>
              <TableCell> {translate("adminStore.material.docCount")}</TableCell>
              <TableCell> {translate("adminStore.material.videoCount")}</TableCell>
              {/* <TableCell >Matrial Category</TableCell> */}
              <TableCell> {translate("adminStore.material.view")}</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {materials.map((item, i) => (
              <TableRow>
                <TableCell>{i + rowStart}</TableCell>
                <TableCell>{item?.name} </TableCell>
                <TableCell>{item?.material_docs_count}</TableCell>
                <TableCell>{item?.material_videos_count}</TableCell>
                {/* <TableCell >Category Name null</TableCell> */}
                <TableCell>
                  <Button
                    size="small"
                    component={RouterLink}
                    to={`${PATH_DASHBOARD.store.material_view}/${item.id}`}
                  >
                     {translate("adminStore.material.viewMaterial")}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Scrollbar>
  );
};

export default MaterialTable;
