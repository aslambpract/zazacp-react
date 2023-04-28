import { Box, Card, Container, Divider, Typography } from "@mui/material";
import ReactQuill from "react-quill";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import { SkeletonPost } from "src/components/skeleton";
import { PATH_USER } from "src/routes/paths";
import { BlogPostHero } from "src/sections/blog";
import CommentForm from "./commentForm";
import CommentList from "./commentList";
import useFetchBlog from "./hooks/useFetchBlog";
import useFetchBlogComments from "./hooks/useFetchBlogComments";
import BlogPostRecent from "./recentPosts";

const BlogPost = () => {
  const post = useFetchBlog();

  const { title, short_description, content } = post;

  const { comments, fetchData } = useFetchBlogComments();

  const modules = {
    toolbar: null,
  };
  return (
    <Page title={post.title}>
      <Container>
        <HeaderBreadcrumbs
          heading={title}
          links={[
            { name: "Dashboard", href: PATH_USER.root },
            { name: "Blogs", href: PATH_USER.blogs.root },
            { name: title },
          ]}
        />
        {post && (
          <Card>
            <BlogPostHero post={post} />

            <Box sx={{ p: { xs: 3, md: 5 } }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {short_description}
              </Typography>
              <ReactQuill
                value={content}
                theme="bubble"
                modules={modules}
                readOnly
              />

              <Divider sx={{ my: 5 }} />
              <Box sx={{ display: "flex", mb: 2 }}>
                <Typography variant="h4">Comments</Typography>
                <Typography variant="subtitle2" sx={{ color: "text.disabled" }}>
                  ({comments?.length})
                </Typography>
              </Box>

              <CommentList comments={comments} />
              <CommentForm reload={fetchData} />
            </Box>
          </Card>
        )}

        {!post && <SkeletonPost />}

        <BlogPostRecent />
      </Container>
    </Page>
  );
};

export default BlogPost;
