import React from "react";
import { RHFSelect } from "src/components/hook-form";
import useCategoryOptions from "../hooks/useCategoryOptions";
import useLocales from "src/hooks/useLocales";

const Category = () => {
  const { translate } = useLocales();
  const categories = useCategoryOptions();
  return (
    <RHFSelect name="category_id" label={translate("adminCommunication.helpCenter.category")}>
      <option value="" />
      {categories}
    </RHFSelect>
  );
};

export default Category;
