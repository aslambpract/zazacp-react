import {
  Box,
  Button,
  Card,
  Dialog,
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
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Iconify from "src/components/Iconify";
import Page from "src/components/Page";
import Scrollbar from "src/components/Scrollbar";
import Map from "src/components/map";
import PaginationButtons from "src/components/pagination";
import TableMenu from "src/components/tableMenu";
import useLocales from "src/hooks/useLocales";
import { PATH_DASHBOARD } from "src/routes/paths";
import Actions from "./components/Actions";
import CategoryRow from "./components/Row";
import { AddForm, EditForm } from "./components/form";
import useList from "./hooks/useList";

const Index = () => {
  const { translate } = useLocales();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { questionList, fetchQuestionList, rowStart, ...rest } = useList();
  const [openAddQuestion, setOpenAddQuestion] = useState(false);
  const [questionId, setQuestionId] = useState(null);

  const handleClickOpenAddQuestion = () => {
    setOpenAddQuestion(true);
  };

  const handleCloseAddQuestion = () => {
    setOpenAddQuestion(false);
  };

  const [openMenu, setOpenMenuActions] = useState(null);
  const handleOpenMenu = (id) => (event) => {
    setOpenMenuActions(event.currentTarget);
    setQuestionId(id);
  };
  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => {
    setOpenEdit(true);
    handleCloseMenu();
  };

  const handleCloseEdit = () => setOpenEdit(false);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const buttonProps = {
    size: isSmallScreen ? "small" : "medium",
  };
  return (
    <>
      <Page title={translate("adminStore.products.ProductQuestionsTitile")}>
        <HeaderBreadcrumbs
          heading={translate("adminStore.products.productQuestions")}
          links={[
            { name: translate("dashboard"), href: PATH_DASHBOARD.root },
            {
              name: translate("adminStore.products.products"),
              href: PATH_DASHBOARD.store.products,
            },
            { name: translate("adminStore.products.productQuestions") },
          ]}
          action={
            <Button
              {...buttonProps}
              variant="contained"
              startIcon={
                <Iconify icon={"eva:plus-fill"} width={20} height={20} />
              }
              onClick={handleClickOpenAddQuestion}
            >
              {translate("adminStore.products.addQuestion")}
            </Button>
          }
        />
        <Card sx={{ p: 2 }}>
          <Scrollbar>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{translate("adminStore.products.no")}</TableCell>
                    <TableCell>
                      {translate("adminStore.products.title")}{" "}
                    </TableCell>
                    <TableCell>
                      {translate("adminStore.products.descriptionn")}{" "}
                    </TableCell>
                    <TableCell>
                      {translate("adminStore.products.action")}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <Map
                    list={questionList}
                    render={(question, i) => (
                      <CategoryRow
                        handleOpenMenu={handleOpenMenu}
                        rowNumber={i + rowStart}
                        question={question}
                      />
                    )}
                  />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TableMenu onClose={handleCloseMenu} open={openMenu}>
            <Actions
              openEdit={handleOpenEdit}
              questionId={questionId}
              reload={fetchQuestionList}
              close={handleCloseMenu}
            />
          </TableMenu>

          <PaginationButtons {...rest} />
        </Card>
      </Page>

      <Dialog
        fullScreen={fullScreen}
        fullWidth
        maxWidth="sm"
        open={openAddQuestion}
        onClose={handleCloseAddQuestion}
        aria-labelledby="add-question"
      >
        <AddForm onClose={handleCloseAddQuestion} reload={fetchQuestionList} />
      </Dialog>

      <Dialog
        fullScreen={fullScreen}
        fullWidth
        maxWidth="sm"
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="edit-question"
      >
        <EditForm
          selectedId={questionId}
          onClose={handleCloseEdit}
          reload={fetchQuestionList}
        />
      </Dialog>
    </>
  );
};

export default Index;
