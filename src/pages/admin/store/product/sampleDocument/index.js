import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box, Button, Card, Grid } from "@mui/material";

import { PATH_DASHBOARD } from "src/routes/paths";

import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Iconify from "src/components/Iconify";
import Page from "src/components/Page";
import Map from "src/components/map";
import useLocales from "src/hooks/useLocales";
import axiosInstance from "src/utils/axios";
import DeleteDialog from "../document/components/DeleteDialog";
import AddDialog from "../document/components/addDialog";
import DocumentCard from "../document/components/documentCard";
import EditDialog from "./components/edit";

const SampleDocument = () => {
  const { translate } = useLocales();
  const { pid } = useParams();
  const [documentList, setDocumentList] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);

  const handleOpen = (isEdit) => (id) =>
    isEdit ? setEditId(id) : setDeleteId(id);

  const fetchDocs = async () => {
    const { data } = await axiosInstance.get(
      `/api/admin/product-sample-docs/${pid}`
    );
    const { status, data: sampleDocs } = data;
    if (status) {
      setDocumentList(sampleDocs);
    }
  };
  useEffect(() => {
    fetchDocs();
  }, [pid]);

  return (
    <div>
      <Page title={translate("adminStore.products.allDocumentTitile")}>
        <Box sx={{ p: 2 }}>
          <HeaderBreadcrumbs
            heading={translate("adminStore.products.allDocument")}
            links={[
              { name: translate("dashboard"), href: PATH_DASHBOARD.root },
              {
                name: translate("adminStore.products.products"),
                href: PATH_DASHBOARD.store.products,
              },
              { name: translate("adminStore.products.allDocument") },
            ]}
            action={
              <Button
                onClick={() => setOpenAdd(true)}
                variant="contained"
                startIcon={
                  <Iconify icon={"eva:plus-fill"} width={20} height={20} />
                }
              >
                {translate("adminStore.products.add")}
              </Button>
            }
          />
          <Card sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Map
                list={documentList}
                render={(doc) => (
                  <DocumentCard
                    handleOpen={handleOpen}
                    doc={doc}
                    key={doc.id}
                  />
                )}
              />
            </Grid>
          </Card>
        </Box>

        <EditDialog editId={editId} onClose={() => setEditId(null)} />
        <DeleteDialog
          isSampleDocs
          fetchData={fetchDocs}
          docId={deleteId}
          onClose={() => setDeleteId(null)}
        />
        <AddDialog
          fetchDocs={fetchDocs}
          open={openAdd}
          onClose={() => setOpenAdd(false)}
        />
      </Page>
    </div>
  );
};

export default SampleDocument;
