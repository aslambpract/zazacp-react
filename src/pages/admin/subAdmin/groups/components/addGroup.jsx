import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Card, Collapse } from "@mui/material";
import { useSnackbar } from "notistack";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { FormProvider, RHFTextField } from "src/components/hook-form";
import useLocales from "src/hooks/useLocales";
import axiosInstance from "src/utils/axios";
import URI from "src/utils/urlConfig";
import { object, string } from "yup";
import useSubMenu from "../hooks/useSubMenu";
import Item from "./item";

const genReqData = ({ data, permissions }, isEdit = false) => {
  const reqData = new FormData();
  Object.entries(data).forEach(([k, v]) => reqData.append(k, v));
  reqData.append("active", 1);
  reqData.append("permission_string", JSON.stringify(permissions));
  if (isEdit) reqData.append("_method", "PUT");

  return reqData;
};

const schema = object().shape({
  name: string().required("Name is required"),
  description: string().required("Description is required"),
});

const AddGroup = ({ open, selected, onSuccess }) => {
  const { translate } = useLocales();

  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const { data: permissions, onChange } = useSubMenu(selected.permissionString);

  const { enqueueSnackbar } = useSnackbar();
  const onSubmit = methods.handleSubmit(async (data) => {
    const reqData = genReqData({ data, permissions }, Boolean(selected.id));

    const url = selected.id
      ? URI.admin.subAdmin.group.update(selected.id)
      : URI.admin.subAdmin.group.create;

    try {
      const { status, data } = await axiosInstance.post(url, reqData);
      if (status === 200) {
        enqueueSnackbar(data.message);
        onSuccess(true);
      }
    } catch (err) {
      console.error(err);
    }
  });

  useMemo(() => {
    if (selected.id) {
      const { name, description } = selected;
      methods.setValue("name", name);
      methods.setValue("description", description);
    }
  }, [selected]);

  return (
    <Collapse in={open}>
      <Card sx={{ p: 3, mb: 2 }}>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
              },
              rowGap: 2,
            }}
          >
            <RHFTextField
              name="name"
              label={translate("adminSubAdmin.subAdmin.group")}
              InputLabelProps={{ shrink: true }}
            />
            <span />
            <RHFTextField
              minRows={8}
              maxRows={5}
              multiline
              name="description"
              label={translate("adminSubAdmin.subAdmin.description")}
              InputLabelProps={{ shrink: true }}
            />
            <span />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "2rem",
            }}
          >
            {permissions.map(({ items }) => {
              return items.map((item) => {
                return (
                  <Item
                    active={item.active}
                    onChange={onChange}
                    name={item.title}
                    key={item.title}
                    subMenu={item.children}
                  />
                );
              });
            })}
          </Box>

          <LoadingButton variant="contained" type="submit">
            {translate("adminSubAdmin.subAdmin.Submit")}
          </LoadingButton>
        </FormProvider>
      </Card>
    </Collapse>
  );
};

export default AddGroup;
