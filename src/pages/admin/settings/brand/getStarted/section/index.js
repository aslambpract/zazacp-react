import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Iconify from "src/components/Iconify";
import Scrollbar from "src/components/Scrollbar";
import {
  FormProvider,
  RHFEditor,
  RHFTextField,
} from "src/components/hook-form";
import axiosInstance from "src/utils/axios";
import Actions from "../../../../../../components/Actions";
import TableMenu from "../../../../../../components/tableMenu";
import sectionsRow from "./sectionsRow";

import { yupResolver } from "@hookform/resolvers/yup";
import PaginationButtons from "src/components/pagination";
import usePagination from "src/components/pagination/usePagination";
import useLocales from "src/hooks/useLocales";
import { number, object, string } from "yup";

const Validator = object().shape({
  name: string().required("Name is required"),
  description: string().required("Description is required"),
  sort_order: number()
    .min(1)
    .typeError("Should be a number")
    .required("Sort order is required"),
});

const defaultValues = {
  name: "",
  sort_order: "",
  description: "",
};

const Section = () => {
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const [sectionList, setSectionList] = useState([]);

  const [openMenu, setOpenMenuActions] = useState(null);
  const [selectedSection, setSelectedSectionId] = useState(null);

  const handleOpenMenu = (id) => (event) => {
    setOpenMenuActions(event.currentTarget);
    setSelectedSectionId(id);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
    setOpenDelete(false);
    setSelectedSectionId(null);
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [openAddSections, setOpenAddSections] = useState(false);
  const [openEditSections, setOpenEditSections] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);
  const handleClickOpenAddSections = () => {
    setOpenAddSections(true);
  };

  const handleClickOpenEditSections = () => {
    setOpenEditSections(true);
  };

  const handleCloseAddSections = () => {
    setOpenAddSections(false);
  };

  const handleCloseEditSections = () => {
    reset(defaultValues);
    setOpenEditSections(false);
    handleCloseMenu();
  };

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(Validator),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const editSection = async (data) => {
    const reqData = new FormData();
    [...Object.entries(data)].forEach(([key, value]) =>
      reqData.append(key, value)
    );
    reqData.append("_method", "PUT");
    try {
      const { status, data } = await axiosInstance.post(
        `/api/admin/brand-get-started-sections/${selectedSection}`,
        reqData
      );

      if (status === 200) {
        enqueueSnackbar(data.message);
        fetchSectionList();
        handleCloseEditSections();
        reset(defaultValues);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteSection = async () => {
    const formData = new FormData();
    formData.append("_method", "DELETE");
    try {
      const { status, data } = await axiosInstance.post(
        `/api/admin/brand-get-started-sections/${selectedSection}`,
        formData
      );
      if (status === 200) {
        fetchSectionList();
        enqueueSnackbar(data.message);
        closeDelete();
      }
    } catch (err) {
      enqueueSnackbar(err.message, { variant: "error" });
    }
  };

  const onSubmit = async (data) => {
    const reqData = new FormData();
    [...Object.entries(data)].forEach(([key, value]) =>
      reqData.append(key, value)
    );
    try {
      const { status, data } = await axiosInstance.post(
        "/api/admin/brand-get-started-sections",
        reqData
      );
      if (status === 200) {
        enqueueSnackbar(data.message);
        fetchSectionList();
        handleCloseAddSections();
        reset(defaultValues);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const { count, onChange, page, seed, rowStart } = usePagination();

  const fetchSectionList = async (page = 1) => {
    try {
      const { data } = await axiosInstance.get(
        `/api/admin/brand-get-started-sections?page=${page}`
      );

      const { status, data: sections } = data;
      if (status) {
        const { last_page, data: list, from } = sections;
        seed(last_page, from);
        setSectionList(list);
      }
    } catch (err) {
      enqueueSnackbar("Failed to fetch data", { variant: "error" });
    }
  };

  useEffect(() => {
    fetchSectionList(page);
  }, [page]);

  const closeDelete = () => {
    setOpenDelete(false);
    handleCloseMenu();
  };

  useEffect(() => {
    if (openEditSections) {
      const { name, description, sort_order } = sectionList.find(
        ({ id }) => id === selectedSection
      );
      reset({ name, description, sort_order, active: 1 });
    }
  }, [openEditSections]);

  return (
    <div>
      <Grid container>
        <Grid item sm={12} mr={1} mb={2}>
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              startIcon={<Iconify icon={"carbon:add"} />}
              onClick={handleClickOpenAddSections}
            >
              {translate("adminSettings.brand.addSection")}
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{translate("adminSettings.brand.no")}</TableCell>
                <TableCell>
                  {translate("adminSettings.brand.sectionName")}{" "}
                </TableCell>
                <TableCell>
                  {translate("adminSettings.brand.sortOrder")}{" "}
                </TableCell>
                <TableCell>{translate("adminSettings.brand.action")}</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {sectionList.map(sectionsRow(handleOpenMenu, rowStart))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <TableMenu onClose={handleCloseMenu} open={openMenu}>
        <Actions
          openEdit={handleClickOpenEditSections}
          openDelete={() => setOpenDelete(true)}
        />
      </TableMenu>

      <Dialog
        fullScreen={fullScreen}
        fullWidth
        maxWidth="sm"
        open={openAddSections}
        onClose={handleCloseAddSections}
        aria-labelledby="add-sections"
      >
        <DialogTitle id="add-sections">{"Add Section"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Box
                sx={{
                  display: "grid",
                  rowGap: 3,
                  columnGap: 2,
                  marginTop: 3,
                  gridTemplateColumns: {
                    xs: "repeat(1, 1fr)",
                    sm: "repeat(1, 1fr)",
                  },
                }}
              >
                <RHFTextField
                  name="name"
                  type="text"
                  label={translate("adminSettings.brand.sectionName")}
                />
                <RHFTextField
                  name="sort_order"
                  type="number"
                  label={translate("adminSettings.brand.sortOrder")}
                />
                <RHFEditor name="description" />
              </Box>
              <DialogActions>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  {translate("adminSettings.brand.submit")}
                </LoadingButton>

                <Button
                  onClick={handleCloseAddSections}
                  autoFocus
                  color="error"
                >
                  {translate("adminSettings.brand.close")}
                </Button>
              </DialogActions>
            </FormProvider>
          </DialogContentText>
        </DialogContent>
      </Dialog>

      <Dialog
        fullScreen={fullScreen}
        fullWidth
        maxWidth="sm"
        open={openEditSections}
        onClose={handleCloseEditSections}
        aria-labelledby="delete-sections"
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(editSection)}>
          <DialogTitle id="delete-sections">
            {translate("adminSettings.brand.editSection")}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Box
                sx={{
                  display: "grid",
                  rowGap: 3,
                  columnGap: 2,
                  marginTop: 3,
                  gridTemplateColumns: {
                    xs: "repeat(1, 1fr)",
                    sm: "repeat(1, 1fr)",
                  },
                }}
              >
                <RHFTextField
                  name="name"
                  type="text"
                  label={translate("adminSettings.brand.sectionName")}
                />
                <RHFTextField
                  name="sort_order"
                  type="number"
                  label={translate("adminSettings.brand.sortOrder")}
                />
                <RHFEditor name="description" />
              </Box>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              {translate("adminSettings.brand.update")}
            </LoadingButton>

            <Button onClick={handleCloseEditSections} autoFocus color="error">
              {translate("adminSettings.brand.close")}
            </Button>
          </DialogActions>
        </FormProvider>
      </Dialog>

      <Dialog
        fullScreen={fullScreen}
        fullWidth
        maxWidth="sm"
        open={openDelete}
        onClose={closeDelete}
        aria-labelledby="delete-sections"
      >
        <DialogTitle id="delete-sections">
          {translate("adminSettings.brand.deleteSection")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Box
              sx={{
                display: "grid",
                rowGap: 3,
                columnGap: 2,
                marginTop: 3,
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(1, 1fr)",
                },
              }}
            >
              <Typography>
                {translate("adminSettings.brand.areYouSureThat")}
              </Typography>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            onClick={deleteSection}
            type="submit"
            variant="contained"
          >
            {translate("adminSettings.brand.delete")}
          </LoadingButton>

          <Button onClick={closeDelete} autoFocus color="error">
            {translate("adminSettings.brand.cancel")}
          </Button>
        </DialogActions>
      </Dialog>
      <PaginationButtons count={count} onChange={onChange} page={page} />
    </div>
  );
};

export default Section;
