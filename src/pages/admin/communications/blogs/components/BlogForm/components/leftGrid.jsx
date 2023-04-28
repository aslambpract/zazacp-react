import { Box, Card, Collapse, Grid, Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";

import {
  RHFEditor,
  RHFRadioGroup,
  RHFTextField,
} from "src/components/hook-form";

import useLocales from "src/hooks/useLocales";
import i18n from "src/locales/i18n";
import LabelStyle from "src/pages/admin/store/product/ProductAddForm/LabelStyle";
import BlogCategory from "./BlogCategory";
import Product from "./product";

const LeftGrid = () => {
  const type = [
    i18n.t("adminCommunication.blog.private"),
    i18n.t("adminCommunication.blog.public"),
  ];
  const { translate } = useLocales();
  const { watch } = useFormContext();

  const isPrivate = watch("type").toLowerCase() === "private";
  return (
    <Grid item xs={12} md={7}>
      <Card sx={{ p: 3 }}>
        <Stack spacing={0} mb={2}>
          <LabelStyle>{translate("adminCommunication.blog.type")}</LabelStyle>
          <RHFRadioGroup
            name="type"
            options={type}
            sx={{
              "& .MuiFormControlLabel-root": { mr: 4 },
            }}
          />
        </Stack>
        <Stack spacing={3}>
          <RHFTextField
            name="title"
            label={translate("adminCommunication.blog.title")}
          />
          <BlogCategory />
          <Collapse in={isPrivate}>
            <Product />
          </Collapse>
        </Stack>
        <Stack spacing={3} mt={2}>
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
            <RHFTextField
              name="meta_keywords"
              label={translate("adminCommunication.blog.metaKeywords")}
              multiline
              fullWidth
              rows={3}
            />
            <RHFTextField
              name="meta_description"
              label={translate("adminCommunication.blog.metaDescription")}
              multiline
              fullWidth
              rows={3}
            />
          </Box>
        </Stack>
        <Box mt={2}>
          <LabelStyle>
            {translate("adminCommunication.blog.content")}
          </LabelStyle>
          <RHFEditor simple name="content" />
        </Box>
      </Card>
    </Grid>
  );
};

export default LeftGrid;
