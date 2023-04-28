import { useEffect, useState } from "react";
import usePagination from "src/components/pagination/usePagination";
import axiosInstance from "src/utils/axios";

const useBlog = (isDraft) => {
  const [blogList, setBlogList] = useState([]);
  const { count, onChange, page, seed, rowStart } = usePagination();

  const fetchBlogList = async (page = 1, isDraft) => {
    try {
      const { data } = await axiosInstance.get(`/api/admin/blogs`, {
        params: {
          page,
          is_draft: isDraft ? 1 : 0,
        },
      });
      const { status, data: blogs } = data;
      if (status) {
        const { last_page, data: list, from } = blogs;
        seed(last_page, from);
        setBlogList(list);
      } else {
        setBlogList([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBlogList(page, isDraft);
  }, [page, isDraft]);

  return { blogList, fetchBlogList, count, onChange, page, rowStart };
};

export default useBlog;
