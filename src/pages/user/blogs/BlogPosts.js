import { Box, Grid, Stack } from "@mui/material";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import PaginationButtons from "src/components/pagination";
import { SkeletonPostItem } from "src/components/skeleton";
import { PATH_USER } from "src/routes/paths";
import { BlogPostCard, BlogPostsSearch, BlogPostsSort } from "./components";
import useFetchBlogs from "./hooks/useFetchBlogs";
import useLocales from "src/hooks/useLocales";
import i18n from "src/locales/i18n"



export default function BlogPosts() {

const SORT_OPTIONS = [
  { value: "latest", label:  i18n.t("userBlog.latest")  },
  { value: "popular", label: i18n.t("userBlog.popular") },
  { value: "oldest", label:  i18n.t("userBlog.oldest")  },
];
  const { translate } = useLocales();
  const { data, fetchData, rowStart, ...rest } = useFetchBlogs();

  return (
    <Page title= {translate("userBlog.blogPosts")}>
      <Box sx={{ p: 2 }}>
        <HeaderBreadcrumbs
          heading= {translate("userBlog.blog")}
          links={[
            { name: translate("dashboard"), href: PATH_USER.user_dashboard },
            { name: translate("userBlog.blogs") },
          ]}
        />

        <Stack
          mb={5}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <BlogPostsSearch />
          <BlogPostsSort options={SORT_OPTIONS} />
        </Stack>

        <Grid container spacing={3}>
          {data.map((post, index) => {
            return post ? (
              <Grid key={post.id} item>
                <BlogPostCard post={post} index={index} />
              </Grid>
            ) : (
              <SkeletonPostItem key={index} />
            );
          })}
        </Grid>
      </Box>
      <PaginationButtons {...rest} />
    </Page>
  );
}
