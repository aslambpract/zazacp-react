import { LoadingButton } from "@mui/lab";
import { Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FormProvider, RHFTextField } from "src/components/hook-form";
import useNewCommentForm from "./hooks/useNewCommentForm";
import useLocales from "src/hooks/useLocales";


const RootStyles = styled("div")(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: Number(theme.shape.borderRadius) * 2,
  backgroundColor: theme.palette.background.neutral,
}));

const CommentForm = ({ reload }) => {
  const { translate } = useLocales();
  const { methods, onSubmit } = useNewCommentForm(reload);

  return (
    <RootStyles>
      <Typography variant="subtitle1" sx={{ mb: 3 }}>
        {translate("userBlog.addComment")}
      </Typography>

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack spacing={3} alignItems="flex-end">
          <RHFTextField name="title" label={translate("userBlog.title")} />
          <RHFTextField name="comment" label={translate("userBlog.comment")} multiline rows={3} />

          <LoadingButton
            type="submit"
            variant="contained"
            loading={methods.formState.isSubmitting}
          >
           {translate("userBlog.postComment")} 
          </LoadingButton>
        </Stack>
      </FormProvider>
    </RootStyles>
  );
};

export default CommentForm;
