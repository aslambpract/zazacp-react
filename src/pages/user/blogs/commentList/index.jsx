import { Box, List } from "@mui/material";
import PropTypes from "prop-types";
import Item from "./item";

const CommentList = ({ comments }) => {
  return (
    <List disablePadding>
      {comments?.map((comment) => {
        const { id } = comment;
        return (
          <Box key={id}>
            <Item
              name={comment.title}
              avatarUrl="https://i.pravatar.cc/300"
              postedAt={comment.created_at}
              message={comment.comment}
            />
          </Box>
        );
      })}
    </List>
  );
};

CommentList.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentList;
