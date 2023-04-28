import { useState } from "react";

import { Box, Card, Grid } from "@mui/material";

import { PATH_DASHBOARD } from "src/routes/paths";

import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import Map from "src/components/map";
import NoData from "src/components/noData";
import PaginationButtons from "src/components/pagination";
import Ternary from "src/components/ternary";
import useLocales from "src/hooks/useLocales";
import DeleteDialog from "./components/DeleteDialog";
import DocumentCard from "./components/documentCard";
import EditDialog from "./components/editDialog";
import useFetchDocuments from "./hooks/useFetchDocuments";

const DocumentView = () => {
  const { translate } = useLocales();
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const { documents, fetchData, ...rest } = useFetchDocuments();
  const handleOpen = (isEdit) => (id) =>
    isEdit ? setEditId(id) : setDeleteId(id);
  const isEmpty = !documents.length;

  return (
    <div>
      <Page title={translate("adminStore.products.documentTitile")}>
        <Box sx={{ p: 2 }}>
          <HeaderBreadcrumbs
            heading={translate("adminStore.products.document")}
            links={[
              { name: translate("dashboard"), href: PATH_DASHBOARD.root },
              {
                name: translate("adminStore.products.products"),
                href: PATH_DASHBOARD.store.products,
              },
              { name: translate("adminStore.products.document") },
            ]}
          />
          <Card sx={{ p: 3 }}>
            <Ternary
              when={isEmpty}
              then={<NoData />}
              otherwise={
                <Grid container spacing={3}>
                  <Map
                    list={documents}
                    render={(doc) => (
                      <DocumentCard
                        key={doc.id}
                        handleOpen={handleOpen}
                        doc={doc}
                      />
                    )}
                  />
                </Grid>
              }
            />
          </Card>

          <PaginationButtons {...rest} />
        </Box>
        <EditDialog editId={editId} onClose={() => setEditId(null)} />
        <DeleteDialog
          docId={deleteId}
          onClose={() => setDeleteId(null)}
          fetchData={fetchData}
        />
      </Page>
    </div>
  );
};

export default DocumentView;
