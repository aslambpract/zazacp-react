import { Card, Stack, TextField } from "@mui/material";
import { capitalCase } from "change-case";
import { useFormContext } from "react-hook-form";
import useLocales from "src/hooks/useLocales";

const DocUpload = () => {
  const { translate } = useLocales();
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <Card sx={{ p: 3 }}>
      <Stack spacing={1}>
        <Stack spacing={1} sx={{ mb: 2 }}>
          <TextField
            name="doc"
            type="file"
            label={capitalCase(translate("adminStore.products.addDoc"))}
            InputLabelProps={{ shrink: true }}
            inputProps={{ accept: ".xlsx, .xls, .pdf" }}
            {...register("doc")}
            error={Boolean(errors.doc)}
            helperText={errors.doc?.message}
          />
        </Stack>
        <Stack spacing={1} sx={{ mb: 2 }}>
          <TextField
            name="sample_doc"
            type="file"
            label={translate("adminStore.products.addSampleDoc")}
            InputLabelProps={{ shrink: true }}
            inputProps={{ accept: ".xlsx, .xls, .pdf" }}
            {...register("sample_doc")}
            error={Boolean(errors.sample_doc)}
            helperText={errors.sample_doc?.message}
          />
        </Stack>
      </Stack>
    </Card>
  );
};

export default DocUpload;
