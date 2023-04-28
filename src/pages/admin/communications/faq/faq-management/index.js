import {
  Box,
  Button,
  Card,
  Dialog,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import Iconify from "src/components/Iconify";
import Page from "src/components/Page";
import Scrollbar from "src/components/Scrollbar";
import PaginationButtons from "src/components/pagination";
import TableMenu from "src/components/tableMenu";
import useLocales from "src/hooks/useLocales";
import Actions from "./components/Actions";
import faqManagementRow from "./components/faqManagementRow";
import { AddFaqForm, EditFaqForm } from "./components/form";
import useFetchFaqList from "./hooks/useFetchFaqList";

const FaqManagement = () => {
  const { translate } = useLocales();
  const [faqId, setFaqId] = useState([]);

  const [openMenu, setOpenMenuActions] = useState(null);
  const handleOpenMenu = (id) => (event) => {
    setOpenMenuActions(event.currentTarget);
    setFaqId(id);
  };
  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [openFaq, setOpenFaq] = useState(false);
  const [openViewFaq, setOpenViewFaq] = useState(false);

  const handleClickOpenFaq = () => {
    handleCloseMenu();
    setOpenFaq(true);
  };
  const handleClickOpenViewFaq = () => {
    handleCloseMenu();
    setOpenViewFaq(true);
  };

  const handleCloseFaq = () => {
    setOpenFaq(false);
  };
  const handleCloseViewFaq = () => {
    setOpenViewFaq(false);
  };

  const { faqList, fetchFaqList, rowStart, ...rest } = useFetchFaqList();

  return (
    <Page title={translate("adminCommunication.faqs.faqsTitile")}>
      <Card>
        <Grid container>
          <Grid item sm={12} mr={1} mb={1} mt={1}>
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                size="small"
                startIcon={<Iconify icon={"carbon:add"} />}
                onClick={handleClickOpenFaq}
              >
                FAQ's
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    {translate("adminCommunication.faqs.no")}
                  </TableCell>
                  <TableCell>
                    {translate("adminCommunication.faqs.questions")}
                  </TableCell>
                  <TableCell>
                    {translate("adminCommunication.faqs.answer")}
                  </TableCell>
                  <TableCell>
                    {translate("adminCommunication.faqs.action")}
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {faqList.map(faqManagementRow(handleOpenMenu, rowStart))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TableMenu onClose={handleCloseMenu} open={openMenu}>
          <Actions
            faqId={faqId}
            fetchFaqList={fetchFaqList}
            close={handleCloseMenu}
            openEdit={handleClickOpenViewFaq}
          />
        </TableMenu>

        <Divider />
      </Card>
      <PaginationButtons {...rest} />

      <Dialog
        fullScreen={fullScreen}
        open={openFaq}
        onClose={handleCloseFaq}
        aria-labelledby="add-faqs"
      >
        <AddFaqForm cancel={handleCloseFaq} fetchFaqList={fetchFaqList} />
      </Dialog>

      <Dialog
        fullScreen={fullScreen}
        open={openViewFaq}
        onClose={handleCloseViewFaq}
        aria-labelledby="faqs-category"
      >
        <EditFaqForm
          selectedId={faqId}
          cancel={handleCloseViewFaq}
          fetchFaqList={fetchFaqList}
        />
      </Dialog>
    </Page>
  );
};

export default FaqManagement;
