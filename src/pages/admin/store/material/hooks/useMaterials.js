import { useEffect, useState } from "react";
import usePagination from "src/components/pagination/usePagination";
import axiosInstance from "src/utils/axios";

const useMaterials = () => {
  const [materials, setMaterials] = useState([]);

  const { count, onChange, page, rowStart, seed } = usePagination();
  const fetchData = async (pageNumber = 1) => {
    const { data } = await axiosInstance(
      `/api/admin/materials?page=${pageNumber}`
    );
    const { status, data: materials } = data;
    if (status) {
      const { last_page, data: list, from } = materials;
      seed(last_page, from);
      setMaterials(list);
    }
  };
  useEffect(() => {
    fetchData(page);
  }, [page]);

  return { materials, count, onChange, page, rowStart };
};

export default useMaterials;
