import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { RHFSelect } from "src/components/hook-form";
import useGetBusinessBuilder from "../../hooks/useGetBusinessBuilder";
import useLocales from "src/hooks/useLocales";

const BusinessBuilders = () => {
  const { translate } = useLocales();
  const businessBuilders = useGetBusinessBuilder();
  const { watch, setValue } = useFormContext();
  const builderId = watch("business_builder_id");

  useEffect(() => {
    const finder = (builder) => builder.id === parseInt(builderId);
    const businessBuilderAmount = parseInt(
      businessBuilders?.find(finder)?.amount
    );
    setValue("buffer_amount", businessBuilderAmount);
  }, [builderId]);

  return (
    <RHFSelect
      name="business_builder_id"
      label={translate("adminStore.assignSubscriptions.businessBuilders")}
      size="small"
    >
      <option value="" />
      {businessBuilders?.map(({ id, name }) => {
        return <option value={id}>{name}</option>;
      })}
    </RHFSelect>
  );
};

export default BusinessBuilders;
