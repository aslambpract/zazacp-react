import { Button } from "@mui/material";
import Iconify from "src/components/Iconify";
import useLocales from "src/hooks/useLocales";


const ComboButton = ({ onClick }) =>{
  const { translate } = useLocales();
  return(
    <Button
      variant="text"
      startIcon={<Iconify icon={"eva:plus-fill"} />}
      type="button"
      value="Add Product"
      onClick={onClick}
   
      style={{ marginTop: 10 }}
    >
     {translate("adminStore.products.addProduct")}
    </Button>
  )
} ;

export default ComboButton;
