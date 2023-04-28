import { useEffect, useState } from "react";
import { useParams } from "react-router";
import usePagination from "src/components/pagination/usePagination";

import axiosInstance from "src/utils/axios";

const useMaterial = () => {
  const { count, onChange, page, rowStart, seed } = usePagination();
  const { id } = useParams();
  const [documents, setDocuments] = useState([]);

  const fetchDocuments = async (page = 1) => {
    try {
      const { data } = await axiosInstance.get(
        `/api/admin/materials/${id}?page=${page}`
      );
      const { status, data: documents } = data;
      if (status) {
        const { data: list, last_page, from } = documents;
        seed(last_page, from);
        setDocuments(list.find(Boolean)?.material_docs);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDocuments(page);
  }, [page]);

  return {
    count,
    onChange,
    page,
    rowStart,
    documents,
    fetchDocuments: () => fetchDocuments(page),
  };
};

export default useMaterial;
