import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { useNavigate } from "react-router";
import PaginationButtons from "src/components/pagination";
import Scrollbar from "src/components/Scrollbar";
import { PATH_DASHBOARD } from "src/routes/paths";
import useReviewList from "./hooks/useReviewList";
import userReviews from "./userReviewRow";
import useLocales from "src/hooks/useLocales";


const ReviewsList = () => {
  const { translate } = useLocales();
  const { reviewList, rowStart, ...rest } = useReviewList();
  const navigate = useNavigate();

  const goToView = (selectedId) => 
    navigate(`${PATH_DASHBOARD.store.user_reviews_edit}/${selectedId}`);

  return (
    <>
      <Card sx={{ p: 3 }}>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{translate("adminStore.userReviews.no")}</TableCell>
                  <TableCell>{translate("adminStore.userReviews.product")} </TableCell>
                  <TableCell>{translate("adminStore.userReviews.totalReview")} </TableCell>
                  <TableCell>{translate("adminStore.userReviews.rating")}</TableCell>
                  <TableCell>{translate("adminStore.userReviews.view")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{reviewList.map(userReviews(goToView))}</TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>
      <PaginationButtons {...rest} />
    </>
  );
};

export default ReviewsList;
