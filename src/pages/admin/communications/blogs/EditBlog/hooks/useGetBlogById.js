import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useParams } from "react-router";
import axiosInstance from "src/utils/axios";
import useNewBlogForm from "../../NewBlog/hooks/useNewBlogForm";

const useGetBlogById = () => {
  const methods = useNewBlogForm();
  const { bid } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await axiosInstance(`api/admin/blogs/${bid}`);

        if (status === 200) {
          const {
            title,
            category_id,
            meta_description,
            meta_keywords,
            short_description,
            content,
            type,
            image_url,
            product_id,
          } = data.data;
          methods.reset({
            title,
            category_id,
            meta_description,
            meta_keywords,
            short_description,
            content,
            product_id,
            image: [image_url],
            type: type === "1" ? "Private" : "Public",
          });
        }
      } catch (err) {
        Object.values(err).flatMap((item) =>
          enqueueSnackbar(item, { variant: "error" })
        );
      }
    };

    fetchData();
  }, [bid]);

  return methods;
};

export default useGetBlogById;
