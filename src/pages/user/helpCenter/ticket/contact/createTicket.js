import { Box, Card, Grid, TextField, Typography } from "@mui/material";

import { LoadingButton } from "@mui/lab";
import {
  FormProvider,
  RHFEditor,
  RHFSelect,
  RHFTextField,
} from "src/components/hook-form";
import useCreateTicket from "./hooks/useCreateTicket";
import useFetchTicketsData from "./hooks/useFetchTicketsData";
import useLocales from "src/hooks/useLocales";


const CreateTicket = () => {
  const { translate } = useLocales();
  const departments = useFetchTicketsData("support-tickets-departments");
  const categories = useFetchTicketsData("support-tickets-categories");
  const priorities = useFetchTicketsData("support-tickets-priorities");
  const { methods, onSubmit } = useCreateTicket();

  const {
    register,
    formState: { isSubmitting, errors },
  } = methods;
  return (
    <>
      <Card sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Typography variant="subtitle2">Create Ticket</Typography>
            <FormProvider methods={methods} onSubmit={onSubmit}>
              <Box
                sx={{
                  display: "grid",
                  rowGap: 3,
                  columnGap: 2,
                  marginTop: 2,
                  gridTemplateColumns: {
                    xs: "repeat(1, 1fr)",
                    sm: "repeat(4, 1fr)",
                  },
                }}
              >
                <RHFSelect name="department_id" label={translate("userHelpCenter.ticket.department")}>
                  <option />
                  {departments.map((row) => (
                    <option value={row.id}>{row.name}</option>
                  ))}
                </RHFSelect>

                <RHFSelect name="priority_id" label={translate("userHelpCenter.ticket.priority")}>
                  <option />
                  {priorities.map(({ id, name }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </RHFSelect>
                <RHFSelect name="category_id" label={translate("userHelpCenter.ticket.category")}>
                  <option />
                  {categories.map((row) => (
                    <option value={row.id}>{row.name}</option>
                  ))}
                </RHFSelect>
                <RHFTextField name="subject" label={translate("userHelpCenter.ticket.subject")} />
                <RHFTextField name="content" label={translate("userHelpCenter.ticket.content")} />
                <TextField
                  name="attachments_url"
                  type="file"
                  label={translate("userHelpCenter.ticket.attachedFile")}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ accept: ".jpeg, .png, .jpg" }}
                  {...register("attachments_url")}
                  error={Boolean(errors.attachments_url)}
                  helperText={errors.attachments_url?.message}
                />
              </Box>
              <Box
                sx={{
                  display: "grid",
                  rowGap: 3,
                  columnGap: 2,
                  marginTop: 2,
                  gridTemplateColumns: {
                    xs: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                  },
                }}
              >
                <RHFEditor
                  simple
                  multiline
                  fullWidth
                  rows={8}
                  name="description"
                  label={translate("userHelpCenter.ticket.note")}
                />
              </Box>
              <Box sx={{ display: "flex", mt: 2 }}>
                <LoadingButton
                  loading={isSubmitting}
                  variant="contained"
                  type="submit"
                >
                 {translate("userHelpCenter.ticket.sendRequest")} 
                </LoadingButton>
              </Box>
            </FormProvider>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default CreateTicket;
