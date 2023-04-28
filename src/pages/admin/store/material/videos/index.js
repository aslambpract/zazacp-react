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
} from "@mui/material";
import { FormProvider, RHFTextField } from "src/components/hook-form";
import RHFDatePicker from "src/components/hook-form/RHFDatePicker";
import { Delete, Edit } from "src/components/Icons";
import PaginationButtons from "src/components/pagination";
import Scrollbar from "src/components/Scrollbar";
import { object, string } from "yup";

import useMaterialDelete from "../hooks/useMaterialDelete";
import useMaterialEdit from "../hooks/useMaterialEdit";
import useMaterialVideo from "../hooks/useMaterialVideo";
import useLocales from "src/hooks/useLocales";


const schema = object().shape({
  video_title: string()
    .typeError("Video title is required")
    .required("Video title is required"),

  video_access_time: string()
    .typeError("Access time is required")
    .required("Access time is required"),
  video_url: string()
    .typeError("Video url is required")
    .required("Video url is required"),
});

const defaultValues = {
  active: 1,
  id: "",
  video_title: "",
  video_access_time: "",
  video_url: "",
};

const Index = () => {
  const { translate } = useLocales();
  const { videos, rowStart, fetchVideos, ...rest } = useMaterialVideo();

  const { closeDelete, deleteId, openDelete, onDelete } =
    useMaterialDelete(fetchVideos);
  const { closeEdit, isEditOpen, onSubmit, openEdit, methods } =
    useMaterialEdit({
      reset: fetchVideos,
      path: "api/admin/materials-video-show",
      defaultValues: defaultValues,
      schema: schema,
    });

  const handleSubmit = methods.handleSubmit(
    onSubmit("api/admin/materials-video")
  );
  return (
    <>
      <Card sx={{ p: 3 }}>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{translate("adminStore.material.no")}</TableCell>
                  <TableCell>{translate("adminStore.material.video")} </TableCell>
                  <TableCell>{translate("adminStore.material.title")} </TableCell>
                  <TableCell>{translate("adminStore.material.accessTime")} </TableCell>
                  <TableCell>{translate("adminStore.material.edit")}</TableCell>
                  <TableCell>{translate("adminStore.material.delete")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {videos.map(
                  ({ id, video_url, video_title, video_access_time }, i) => (
                    <TableRow>
                      <TableCell>{i + rowStart}</TableCell>
                      <TableCell component="a" href={video_url}>
                        {video_url}
                      </TableCell>
                      <TableCell>{video_title}</TableCell>
                      <TableCell>{video_access_time}</TableCell>
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
        <DialogTitle>{translate("adminStore.material.deleteDocument")}</DialogTitle>
        <DialogContent>
          {translate("adminStore.material.thisAction")}
        </DialogContent>

        <DialogActions>
          <Button onClick={closeDelete}> {translate("adminStore.material.close")}</Button>
          <Button
            color="error"
            variant="outlined"
            onClick={onDelete("api/admin/materials-video")}
          >
            {translate("adminStore.material.delete")}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isEditOpen} onClose={closeEdit}>
        <DialogTitle>{translate("adminStore.material.editVideo")}</DialogTitle>

        <FormProvider methods={methods} onSubmit={handleSubmit}>
          <DialogContent
            sx={{
              "& *": {
                margin: "0.3rem 0",
              },
            }}
          >
            <RHFTextField name="video_title" label={translate("adminStore.material.videoTitle")} />
            <RHFDatePicker name="video_access_time" label={translate("adminStore.material.videoAccessTime")} />
            <RHFTextField name="video_url" label={translate("adminStore.material.videoTitle")} />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" type="submit">
             {translate("adminStore.material.edit")} 
            </Button>
            <Button onClick={closeEdit} color="error">
             {translate("adminStore.material.close")} 
            </Button>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </>
  );
};

export default Index;
