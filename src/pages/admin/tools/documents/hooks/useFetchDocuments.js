import { useEffect, useState } from "react";
import usePagination from "src/components/pagination/usePagination";
import axiosInstance from "src/utils/axios";

const useFetchDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const { count, onChange, page, seed, rowStart } = usePagination();

  const fetchDocuments = async (page = 1) => {
    const { data } = await axiosInstance(
      `/api/admin/tool-documents?page=${page}`
    );

    const { status, data: documents } = data;
    if (status) {
      const { last_page, from, data: list } = documents;
      seed(last_page, from);
      setDocuments(list);
    }
  };

  useEffect(() => {
    fetchDocuments(page);
  }, [page]);

  return { documents, fetchDocuments, count, onChange, page, rowStart };
};

export default useFetchDocuments;
