import React from "react";
import { RHFEditor } from "src/components/hook-form";
import LabelStyle from "../LabelStyle";
import useLocales from "src/hooks/useLocales";


const Description = () =>{
  const { translate } = useLocales();
  return (
    <div>
      <LabelStyle>{translate("adminStore.products.description")}</LabelStyle>
      <RHFEditor simple name="description" />
    </div>
  );
}

export default Description;
