import {
  Avatar,
  Box,
  Button,
  List as MuiList,
  ListItem as MuiListItem,
  Pagination,
  Rating,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import Iconify from "src/components/Iconify";
import { fShortenNumber } from "src/utils/formatNumber";
import { fDate } from "src/utils/formatTime";

const List = ({ product }) => {
  const reviews = [];
  return (
    <Box sx={{ pt: 3, px: 2, pb: 5 }}>
      <MuiList disablePadding>
        {reviews?.map((review) => (
          <ListItem key={review.id} review={review} />
        ))}
      </MuiList>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Pagination count={10} color="primary" />
      </Box>
    </Box>
  );
};

List.propTypes = {
  product: PropTypes.object,
};

const ListItem = ({ review }) => {
  const [isHelpful, setHelpfuls] = useState(false);

  const { name, rating, comment, helpful, postedAt, avatarUrl, isPurchased } =
    review;

  const handleClickHelpful = () => {
    setHelpfuls((prev) => !prev);
  };

  return (
    <>
      <MuiListItem
        disableGutters
        sx={{
          mb: 5,
          alignItems: "flex-start",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Box
          sx={{
            mr: 2,
            display: "flex",
            alignItems: "center",
            mb: { xs: 2, sm: 0 },
            minWidth: { xs: 160, md: 240 },
            textAlign: { sm: "center" },
            flexDirection: { sm: "column" },
          }}
        >
          <Avatar
            src={avatarUrl}
            sx={{
              mr: { xs: 2, sm: 0 },
              mb: { sm: 2 },
              width: { md: 64 },
              height: { md: 64 },
            }}
          />
          <div>
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary" }}
              noWrap
            >
              {fDate(postedAt)}
            </Typography>
          </div>
        </Box>

        <div>
          <Rating size="small" value={rating} precision={0.1} readOnly />

          {isPurchased && (
            <Typography
              variant="caption"
              sx={{
                my: 1,
                display: "flex",
                alignItems: "center",
                color: "primary.main",
              }}
            >
              <Iconify icon={"ic:round-verified"} width={16} height={16} />
              &nbsp;Verified purchase
            </Typography>
          )}

          <Typography variant="body2">{comment}</Typography>

          <Box
            sx={{
              mt: 1,
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {!isHelpful && (
              <Typography variant="body2" sx={{ mr: 1 }}>
                Was this review helpful to you?
              </Typography>
            )}

            <Button
              size="small"
              color="inherit"
              startIcon={
                <Iconify
                  icon={!isHelpful ? "ic:round-thumb-up" : "eva:checkmark-fill"}
                />
              }
              onClick={handleClickHelpful}
            >
              {isHelpful ? "Helpful" : "Thank"}(
              {fShortenNumber(!isHelpful ? helpful : helpful + 1)})
            </Button>
          </Box>
        </div>
      </MuiListItem>
    </>
  );
};

ListItem.propTypes = {
  review: PropTypes.object,
};

export default List;
