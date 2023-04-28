import { Box } from "@mui/material";
import { RHFTextField } from "src/components/hook-form";
import Category from "./Category";
import MetaInformation from "./MetaInformation";
import useLocales from "src/hooks/useLocales";


const BasicInfo = () =>{
  const { translate } = useLocales();
  return (
    <>
      <Box
        sx={{
          display: "grid",
          columnGap: 2,
          rowGap: 3,
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
          },
        }}
      >
        <RHFTextField name="name" label={translate("adminStore.products.productName")}  />
        <Category />
        <MetaInformation />
      </Box>
    </>
  );
  

}
export default BasicInfo;
