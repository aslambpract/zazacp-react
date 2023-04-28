import { Box, DialogContent, DialogContentText } from "@mui/material";
import { RHFEditor, RHFSelect, RHFTextField } from "src/components/hook-form";
import useLocales from "src/hooks/useLocales";
import LabelStyle from "src/pages/admin/store/product/ProductAddForm/LabelStyle";
import useGetSectionNames from "./hooks/useGetSectionNames";

const FormFields = ({ isEdit }) => {
  const { translate } = useLocales();
  const sectionNames = useGetSectionNames();
  return (
    <>
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
                sm: "repeat(3, 1fr)",
              },
            }}
          >
            <RHFSelect
              name="section_id"
              label={translate("adminSettings.brand.sectionName")}
              InputLabelProps={{ shrink: isEdit }}
            >
              <option value="" />
              {sectionNames.map(({ id, name }) => (
                <option value={id}>{name}</option>
              ))}
            </RHFSelect>
            <RHFTextField
              InputLabelProps={{ shrink: isEdit }}
              name="menu_name"
              type="text"
              label={translate("adminSettings.brand.menuName")}
            />
            <RHFTextField
              InputLabelProps={{ shrink: isEdit }}
              name="sort_order"
              type="number"
              label={translate("adminSettings.brand.sortOrder")}
            />
          </Box>
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
            <LabelStyle>
              {" "}
              {translate("adminSettings.brand.description")}{" "}
            </LabelStyle>
            <RHFEditor
              simple
              name="content"
              placeholder={translate("adminSettings.brand.descriptions")}
              InputLabelProps={{ shrink: isEdit }}
            />
          </Box>
        </DialogContentText>
      </DialogContent>
    </>
  );
};

export default FormFields;
