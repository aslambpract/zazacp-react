
import useLocales from "src/hooks/useLocales";

const { RHFTextField } = require("src/components/hook-form");

const MetaInformation = () =>{
  const { translate } = useLocales();
  return(
    <>
      <RHFTextField
        name="meta_keywords"
        label={translate("adminStore.products.metaKeywords")}
        multiline
        fullWidth
        rows={3}
      />
  
      <RHFTextField
        name="meta_description"
        label={translate("adminStore.products.metaDescription")}
        multiline
        fullWidth
        rows={3}
      />
      <RHFTextField
        name="short_description"
        label={translate("adminStore.products.shortDescription")}
        multiline
        fullWidth
        rows={2}
      />
      <RHFTextField name="title" label={translate("adminStore.products.title")} multiline fullWidth rows={2} />
    </>
  );
} 
export default MetaInformation;
