import { DialogContent, DialogTitle } from "@mui/material";
import "../style.css";

import AddCard from "./addCard";

const Form = ({ productId, purchaseId, closeDialog, fetchData }) => {
  return (
    <>
      <DialogTitle id="add-article-category" sx={{ mb: 2 }}>
        Enable Recurring Payment
      </DialogTitle>

      <DialogContent>
        <AddCard
          fetchData={fetchData}
          onClose={closeDialog}
          productId={productId}
          purchaseId={purchaseId}
        />
      </DialogContent>
    </>
  );
};

export default Form;
