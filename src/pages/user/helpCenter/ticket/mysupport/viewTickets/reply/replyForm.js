// @mui
import { async } from "@firebase/util";
import { Box, Button, Card, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
// components
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import {
  FormProvider,
  RHFEditor,
  RHFSelect,
  RHFTextField,
} from "src/components/hook-form";
import Iconify from "src/components/Iconify";
import fetchUser from "src/utils/fetchUser";

const ReplyForm = ({ reload }) => {
  const methods = useForm();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = methods.handleSubmit(async (inputData) => {
    const reqData = new FormData();
    Object.entries(inputData).forEach(([k, v]) => reqData.set(k, v));

    reqData.append("support_ticket_id", id);

    try {
      const { status, data } = await fetchUser.post(
        "support-ticket-replies",
        reqData
      );
      if (status === 200) {
        reload(id);
        enqueueSnackbar(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  });
  return (
    <div>
      <Card>
        <Stack spacing={2} sx={{ p: 3 }}>
          Reply Form
          <FormProvider methods={methods} onSubmit={onSubmit}>
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
              {/* <RHFSelect
                name="caned_response"
                label="Canned Reponses "
                helperText="Variables You Can Use : {name} | {username} | {email} | {ticket_id}"
              >
                <option value="" />
                <option value="1">Canned Response</option>
              </RHFSelect>
              <RHFSelect name="caned_response" label="Faq Questions">
                <option value="" />
                <option value="1">Faq Questions </option>
              </RHFSelect> */}
              <RHFTextField name="title" label="Title" />
              <RHFEditor name="body" label="Description" simple />
            </Box>
            <Button
              variant="contained"
              type="submit"
              endIcon={
                <Iconify icon={"ic:round-send"} width={24} height={24} />
              }
            >
              Post Reply
            </Button>
          </FormProvider>
        </Stack>
      </Card>
    </div>
  );
};

export default ReplyForm;
