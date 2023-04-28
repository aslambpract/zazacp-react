import React from "react";
// @mui
import { Box, Card, Button, TextField, IconButton, Stack } from "@mui/material";
// components
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
  RHFEditor,
} from "src/components/hook-form";
import { useForm } from "react-hook-form";
import Iconify from "src/components/Iconify";

const ReplyForm = () => {
  const methods = useForm();
  const onSubmit = methods.handleSubmit((inputData) => {});
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
              <RHFSelect
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
              </RHFSelect>
              <RHFTextField label="Title" value="your title" />
              <RHFEditor name="description" label="Description" simple />
            </Box>
            <Button
              variant="contained"
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
