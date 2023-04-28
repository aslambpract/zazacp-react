import { Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import BlogPostCard from "./blogPostCard";
import useGetRecentPosts from "./hooks/useRecentPosts";
import useLocales from "src/hooks/useLocales";


const BlogPostRecent = () => {
  const { translate } = useLocales();
  const { posts } = useGetRecentPosts();
  return (
    <>
      <Typography variant="h4" sx={{ mt: 10, mb: 5 }}>
      {translate("userBlog.recentPosts")}  
      </Typography>

      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid key={post.id} item xs={12} sm={6} md={3}>
            <BlogPostCard post={post} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

BlogPostRecent.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default BlogPostRecent;
