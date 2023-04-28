import { useState } from "react";

import { Card } from "@mui/material";

import PaginationButtons from "src/components/pagination";
import TableMenu from "src/components/tableMenu";
import useLocales from "src/hooks/useLocales";
import Actions from "./components/Actions";
import BlogTable from "./components/BlogTable";
import HeaderCrumps from "./components/HeaderCrumps";
import blogRow from "./components/blogRow";
import DeleteDialog from "./components/deleteDialog";
import PublishDialog from "./components/publish";
import useBlog from "./hooks/useBlog";
const BlogList = ({ isDraft }) => {
  const { translate } = useLocales();
  const { blogList, fetchBlogList, rowStart, ...rest } = useBlog(isDraft);
  const [selectedId, setSelectedId] = useState(null);
  const [openMenu, setOpenMenuActions] = useState(null);
  const handleOpenMenu = (id) => (event) => {
    setSelectedId(id);
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => setOpenMenuActions(null);

  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => {
    setOpenDelete(true);
    handleCloseMenu();
  };
  const handleCloseDelete = () => setOpenDelete(false);

  const [publishDialog, setOpenPublish] = useState(false);
  const handleOpenPublish = () => {
    setOpenPublish(true);
    handleCloseMenu();
  };
  const handleClosePublish = () => setOpenPublish(false);

  return (
    <>
      <HeaderCrumps
        name={translate("adminCommunication.blog.blog")}
        isDraft={isDraft}
      />

      <Card sx={{ p: 3, mt: 3 }}>
        <BlogTable>{blogList.map(blogRow(handleOpenMenu, rowStart))}</BlogTable>
        <TableMenu onClose={handleCloseMenu} open={openMenu}>
          <Actions
            openDelete={handleOpenDelete}
            selectedId={selectedId}
            openPublish={handleOpenPublish}
            isDraft={isDraft}
          />
        </TableMenu>
      </Card>

      <DeleteDialog
        open={openDelete}
        fetchData={fetchBlogList}
        onClose={handleCloseDelete}
        selectedId={selectedId}
      />

      <PublishDialog
        open={publishDialog}
        fetchData={fetchBlogList}
        onClose={handleClosePublish}
        selectedId={selectedId}
      />
      <PaginationButtons {...rest} />
    </>
  );
};

export default BlogList;
