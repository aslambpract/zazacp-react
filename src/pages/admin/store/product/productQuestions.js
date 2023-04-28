import { Button, Container } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Iconify from "src/components/Iconify";
import Page from "src/components/Page";
import { PATH_DASHBOARD } from "src/routes/paths";
import DeleteQuestionDialog from "./Questions/deleteQuestionDialog";
import EditQuestionDialog from "./Questions/editQuestionDialog";
import MainSection from "./Questions/mainSection";
import NewQuestionDialog from "./Questions/newQuestionDialog";
import useLocales from "src/hooks/useLocales";


const ProductQuestions = () => {
  const { translate } = useLocales();
  const { state } = useLocation();
  const [openNew, setOpenNew] = useState(false);
  const closeNew = () => setOpenNew(false);
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const openEdit = (data) => setEditData(data);
  const openDelete = (id) => setDeleteId(id);

  const fetchData = async () => {
    try {
      await setTimeout(
        () => alert("Need to get fetch api for questions"),
        1000
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Page title={translate("adminStore.products.productQuestionsTitile")}>
        <Container>
          <HeaderBreadcrumbs
            heading={translate("adminStore.products.productQuestions")}
            links={[
              { name: translate("dashboard"), href: PATH_DASHBOARD.root },
              { name: translate("adminStore.products.products"), href: PATH_DASHBOARD.store.products },
              { name: translate("adminStore.products.productQuestions") },
            ]}
            action={
              <Button
                variant="contained"
                startIcon={
                  <Iconify icon={"eva:plus-fill"} width={20} height={20} />
                }
                onClick={() => setOpenNew(true)}
              >
                {translate("adminStore.products.addQuestion")}
              </Button>
            }
          />
          <MainSection
            openDelete={openDelete}
            openEdit={openEdit}
            questions={state.questions}
          />
        </Container>

        <NewQuestionDialog
          fetchData={fetchData}
          open={openNew}
          onClose={closeNew}
        />
        <EditQuestionDialog
          editData={editData}
          fetchData={fetchData}
          onClose={() => setEditData(null)}
        />
        <DeleteQuestionDialog
          fetchData={fetchData}
          onClose={() => setDeleteId(null)}
          deleteId={deleteId}
        />
      </Page>
    </div>
  );
};

export default ProductQuestions;
