import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import useLocales from "src/hooks/useLocales";

import Scrollbar from "src/components/Scrollbar";

const BlogTable = ({ children }) => {
  const { translate } = useLocales();
  return(
    <Scrollbar>
      <TableContainer sx={{ minWidth: 720 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell> {translate("adminCommunication.blog.no")}  </TableCell>
              <TableCell> {translate("adminCommunication.blog.image")}  </TableCell>
              <TableCell> {translate("adminCommunication.blog.blogTitle")}  </TableCell>
              <TableCell> {translate("adminCommunication.blog.blogDescription")}  </TableCell>
              <TableCell> {translate("adminCommunication.blog.scope")}  </TableCell>
              <TableCell> {translate("adminCommunication.blog.blogDate")}  </TableCell>
              <TableCell> {translate("adminCommunication.blog.action")}  </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{children}</TableBody>
        </Table>
      </TableContainer>
    </Scrollbar>
  );
}

export default BlogTable;
