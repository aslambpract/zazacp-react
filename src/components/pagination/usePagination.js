import { useEffect, useState } from "react";

const usePagination = () => {
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(() => {
    const page = sessionStorage.getItem("page");
    if (page) return parseInt(page);
    return 1;
  });
  const [rowStart, setRowStart] = useState(1);
  const seed = (totalPages, rowStart = 1) => {
    setCount(totalPages);
    setRowStart(rowStart);
  };
  useEffect(() => {
    return () => {
      sessionStorage.removeItem("page");
    };
  }, []);

  const onChange = (_, page) => {
    setPage(page);
    sessionStorage.setItem("page", page);
  };

  return { count, page, seed, onChange, rowStart };
};

export default usePagination;
