import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import { FormProvider, RHFTextField } from "src/components/hook-form";
import RHFDatePicker from "src/components/hook-form/RHFDatePicker";
import { Delete, Edit, View } from "src/components/Icons";
import PaginationButtons from "src/components/pagination";
import Scrollbar from "src/components/Scrollbar";
import { mixed, object, string } from "yup";
import useMaterial from "../hooks/useMaterial";
import useMaterialDelete from "../hooks/useMaterialDelete";
import useMaterialEdit from "../hooks/useMaterialEdit";
import useLocales from "src/hooks/useLocales";


const schema = object().shape({
  doc_title: string()
    .typeError("Document title is required")
    .required("Document title is required"),
  doc_access_time: string()
    .typeError("Access time is required")
    .required("Access time is required"),
});

const defaultValues = {
  active: 1,
  id: "",
  doc_title: "",
  doc_access_time: "",
  doc: "",
};
const Index = () => {
  const { translate } = useLocales();
  const { documents, rowStart, fetchDocuments, ...rest } = useMaterial();

  const { closeDelete, deleteId, openDelete, onDelete } =
    useMaterialDelete(fetchDocuments);
  const { closeEdit, isEditOpen, onSubmit, openEdit, methods } =
    useMaterialEdit({
      reset: fetchDocuments,
      path: "api/admin/materials-doc-show",
      defaultValues: defaultValues,
      schema: schema,
    });

  const handleSubmit = methods.handleSubmit(
    onSubmit("api/admin/materials-doc")
  );
  return (
    <>
      <Card sx={{ p: 3 }}>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{translate("adminStore.material.no") }</TableCell>
                  <TableCell>{translate("adminStore.material.docName") }</TableCell>
                  <TableCell>{translate("adminStore.material.accessTime") }</TableCell>
                  <TableCell>{translate("adminStore.material.view") }</TableCell>
                  <TableCell>{translate("adminStore.material.edit") }</TableCell>
                  <TableCell>{translate("adminStore.material.delete") }</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {documents?.map(
                  ({ id, doc_title, updated_at, doc_url: url }, i) => (
                    <TableRow key={id}>
                      <TableCell>{i + rowStart}</TableCell>
                      <TableCell>{doc_title}</TableCell>
                      <TableCell>
                        {new Date(updated_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <View
                          component={Link}
                          to="/pdf"
                          state={{ docURI: url }}
                        />
                      </TableCell>
                      <TableCell>
                        <Edit color="primary" onClick={openEdit(id)} />
                      </TableCell>
                      <TableCell>
                        <Delete onClick={openDelete(id)} color="error" />
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>
      <PaginationButtons {...rest} />

      <Dialog open={Boolean(deleteId)} onClose={closeDelete}>
        <DialogTitle>{translate("adminStore.material.deleteDocument") }</DialogTitle>
        <DialogContent>
          {translate("adminStore.material.thisAction") }
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDelete}> {translate("adminStore.material.close") }</Button>
          <Button
            color="error"
            variant="contained"
            onClick={onDelete("api/admin/materials-doc")}
          >
           {translate("adminStore.material.delete") }
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isEditOpen} onClose={closeEdit}>
        <DialogTitle>{translate("adminStore.material.editDocument") }</DialogTitle>

        <FormProvider methods={methods} onSubmit={handleSubmit}>
          <DialogContent
            sx={{
              "& *": {
                margin: "0.3rem 0",
              },
            }}
          >
            <RHFTextField name="doc_title" label={translate("adminStore.material.documentTitle") } />
            <RHFDatePicker
              name="doc_access_time"
              label={translate("adminStore.material.documentAccessTime") }
            />

            <TextField
              {...methods.register("doc")}
              fullWidth
              label={translate("adminStore.material.document") }
              type="file"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" type="submit">
              {translate("adminStore.material.edit") }
            </Button>
            <Button onClick={closeEdit} color="error">
              {translate("adminStore.material.close") }
            </Button>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  );
};

export default Index;
