import BlogForm from "../components/BlogForm";
import useAddPost from "./hooks/useAddPost";
import useNewBlogForm from "./hooks/useNewBlogForm";

const AddPost = () => {
  const methods = useNewBlogForm(true);

  const onSubmit = useAddPost(methods.setError);
  return <BlogForm methods={methods} onSubmit={onSubmit} />;
};

export default AddPost;
