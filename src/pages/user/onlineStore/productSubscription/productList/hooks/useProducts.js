import { useEffect, useState } from "react";
import useErrors from "src/hooks/useErrors";
import fetchUser from "src/utils/fetchUser";

const useProducts = (activePage) => {
  const [products, setProducts] = useState([]);
  const handleErrors = useErrors();
  const [filterIds, setFilterIds] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isEmpty, setIsEmpty] = useState(false);
  const fetchProducts = async (pageNumber, filter) => {
    try {
      const { status, data } = await fetchUser(`online-store`, {
        params: {
          page: pageNumber,
          ...filter,
        },
      });
      if (status === 200) {
        sessionStorage.setItem("pageNumber", pageNumber);
        setTotalPages(data.data.last_page);
        setProducts(data.data.data);
        setIsEmpty(false);
      } else {
        sessionStorage.setItem("pageNumber", 1);
        setTotalPages(0);
        setIsEmpty(true);
        setProducts([]);
      }
    } catch (err) {
      sessionStorage.setItem("pageNumber", 1);
      setTotalPages(0);
      setProducts([]);
      setIsEmpty(true);
      handleErrors(err);
    }
  };

  useEffect(() => {
    const filter = {};
    filterIds.forEach((id, i) => (filter[`product_category_id[${i}]`] = id));
    fetchProducts(activePage, filter);
  }, [activePage, filterIds]);

  return {
    products,
    fetchProducts,
    totalPages,
    filterIds,
    setFilterIds,
    isEmpty,
  };
};

export default useProducts;
