import { useMemo, useState } from "react";
import useMenu from "src/hooks/useMenu";

const useSubMenu = (selected) => {
  const [data, setData] = useState([]);
  const navConfig = useMenu();
  useMemo(() => {
    if (selected) {
      setData(selected);
    } else {
      setData(navConfig);
    }
  }, [selected]);

  const inner = (items, k) =>
    items.map((item) => {
      if (item.title === k) {
        return { ...item, active: !item.active };
      }
      if (item.children?.length > 0) {
        const res = inner(item.children, k);
        return { ...item, children: res };
      }

      return { ...item, active: item.active };
    });

  const onChange = (k) => () => {
    const temp = [...data];
    const newState = temp.map(({ items, subheader }) => {
      const returnObject = { items: inner(items, k) };
      if (subheader) {
        returnObject.subheader = subheader;
      }
      return returnObject;
    });

    setData(newState);
  };
  return { data, onChange };
};

export default useSubMenu;
