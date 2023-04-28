import { useState } from "react";

import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import Scrollbar from "src/components/Scrollbar";
import categoryRow from "./components/categoryRow";

import PaginationButtons from "src/components/pagination";
import AddDialog from "./components/addDialog";
import DeleteDialog from "./components/DeleteDialog";
import Wrapper from "./components/Wrapper";
import useBlogCategoryList from "./hooks/useBlogCategoryList";
import useLocales from "src/hooks/useLocales";


const Index = () => {
  const { translate } = useLocales();
  const { categoryList, fetchCategoryList, rowStart, ...rest } =
    useBlogCategoryList();

  const [selectedId, setSelectedId] = useState(null);

  const openMenu = (id) => (e) => setSelectedId(id);

  const [openAddCategory, setOpenAddCategory] = useState(false);
  const handleClickOpenAddCategory = () => {
    setOpenAddCategory(true);
  };
  const handleCloseAddCategory = () => {
    setOpenAddCategory(false);
  };

  return (
    <>
      <Wrapper handleClickOpenAddCategory={handleClickOpenAddCategory}>
        <Card sx={{ p: 3, mt: 3 }}>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 720 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{translate("adminCommunication.blog.no")}</TableCell>
                    <TableCell>{translate("adminCommunication.blog.categoryName")}</TableCell>
                    <TableCell>{translate("adminCommunication.blog.description")}</TableCell>
                    <TableCell>{translate("adminCommunication.blog.action")}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categoryList.map(categoryRow(openMenu, rowStart))}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Wrapper>

      <DeleteDialog
        selectedId={selectedId}
        onClose={() => setSelectedId(null)}
        fetchData={fetchCategoryList}
      />

      <AddDialog
        reload={fetchCategoryList}
        onClose={handleCloseAddCategory}
        open={openAddCategory}
      />

      <PaginationButtons {...rest} />
    </>
  );
};

export default Index;
