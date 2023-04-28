import React from "react";
import { RHFSelect } from "src/components/hook-form";
import useMaterialCategories from "../hooks/useMaterialCategories";
import useLocales from "src/hooks/useLocales";


const MaterialCategories = () => {
  const { translate } = useLocales();
  const materialCategories = useMaterialCategories();

  return (
    <RHFSelect name="category_id" label={translate("adminStore.material.category")}>
      <option value="" />
      {materialCategories}
    </RHFSelect>
  );
};

export default MaterialCategories;
