import { Box, Button, IconButton } from "@mui/material";
import { useState } from "react";

import {
  Card,
  Divider,
  Grid,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Iconify from "src/components/Iconify";
import Scrollbar from "src/components/Scrollbar";
import PaginationButtons from "src/components/pagination";
import TableMenu from "src/components/tableMenu";
import useLocales from "src/hooks/useLocales";
import useFetchDocuments from "../hooks/useFetchDocuments";
import DeleteDialog from "./deleteDialog";
import { AddDialog, EditDialog } from "./updateEditDialog";

const MainSection = () => {
  const { translate } = useLocales();
  const { documents, fetchDocuments, rowStart, ...rest } = useFetchDocuments();
  const [selectedId, setSelectedId] = useState(null);

  const [openMenu, setOpenMenuActions] = useState(false);
  const handleOpenMenu = (id) => (event) => {
    setSelectedId(id);
    setOpenMenuActions(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setOpenMenuActions(false);
  };

  const [openUpload, setOpenUpload] = useState(false);
  const handleOpenUpload = () => {
    setOpenUpload(true);
  };
  const handleCloseUpload = () => {
    setOpenUpload(false);
  };

  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => {
    setOpenDelete(true);
    handleCloseMenu();
  };

  const handleCloseDelete = () => setOpenDelete(false);

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => {
    handleCloseMenu();
    setOpenEdit(true);
  };

  const handleCloseEdit = () => setOpenEdit(false);

  return (
    <>
      <Card>
        <Grid container>
          <Grid item sm={12} mr={1} mb={1} mt={1}>
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                size="small"
                startIcon={<Iconify icon={"carbon:add"} />}
                onClick={handleOpenUpload}
              >
                {translate("adminTools.documents.fileUpload")}
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell> {translate("adminTools.documents.no")}</TableCell>
                  <TableCell>
                    {" "}
                    {translate("adminTools.documents.fileTitle")}{" "}
                  </TableCell>
                  <TableCell>
                    {" "}
                    {translate("adminTools.documents.sortOrder")}
                  </TableCell>
                  <TableCell>
                    {" "}
                    {translate("adminTools.documents.download")}{" "}
                  </TableCell>
                  <TableCell>
                    {" "}
                    {translate("adminTools.documents.created")}{" "}
                  </TableCell>
                  <TableCell>
                    {" "}
                    {translate("adminTools.documents.action")}
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {documents.map((row, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell>{i + rowStart}</TableCell>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.sort_order}</TableCell>
                      <TableCell
                        component="a"
                        href={row.doc_url}
                        target="_blank"
                        sx={{
                          textDecoration: "none",
                        }}
                      >
                        PDF <Iconify icon={"carbon:download"} />
                      </TableCell>
                      <TableCell>
                        {new Date(row.created_at).toLocaleDateString("en-GB")} -
                        {new Date(row.created_at).toLocaleTimeString()}
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={handleOpenMenu(row.id)}>
                          <Iconify
                            icon={"eva:more-vertical-fill"}
                            width={20}
                            height={20}
                          />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <Divider />
      </Card>

      <TableMenu open={openMenu} onClose={handleCloseMenu}>
        <MenuItem sx={{ color: "default.main" }} onClick={handleOpenEdit}>
          <Iconify icon={"akar-icons:edit"} />
          {translate("adminTools.documents.edit")}
        </MenuItem>
        <Divider />
        <MenuItem sx={{ color: "error.main" }} onClick={handleOpenDelete}>
          <Iconify icon={"eva:trash-2-outline"} />
          {translate("adminTools.documents.delete")}
        </MenuItem>
      </TableMenu>

      <AddDialog
        open={openUpload}
        onClose={handleCloseUpload}
        reload={fetchDocuments}
      />

      <EditDialog
        open={openEdit}
        onClose={handleCloseEdit}
        reload={fetchDocuments}
        selectedId={selectedId}
      />

      <DeleteDialog
        open={openDelete}
        deleteId={selectedId}
        onClose={handleCloseDelete}
        reload={fetchDocuments}
      />

      <PaginationButtons {...rest} />
    </>
  );
};

export default MainSection;
