import { useEffect, useState } from "react";
import { useParams } from "react-router";
import usePagination from "src/components/pagination/usePagination";
import useErrors from "src/hooks/useErrors";
import axiosInstance from "src/utils/axios";

const useFetchDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const { pid } = useParams();
  const { count, onChange, page, seed } = usePagination();
  const handleErrors = useErrors();
  const fetchData = async (id, page = 1) => {
    try {
      const { data, status } = await axiosInstance(
        `api/admin/product-docs/${id}`,
        {
          params: { page },
        }
      );

      if (status) {
        const { status: hasValue, data: documents } = data;
        const { last_page, from, data: list } = documents;
        if (hasValue) {
          seed(last_page, from);
          setDocuments(list);
        } else {
          setDocuments([]);
        }
      } else {
        setDocuments([]);
      }
    } catch (err) {
      handleErrors(err);
    }
  };

  useEffect(() => {
    fetchData(pid, page);
  }, [pid, page]);

  return { documents, fetchData, count, onChange, page };
};

export default useFetchDocuments;
