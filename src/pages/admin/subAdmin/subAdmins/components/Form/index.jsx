import { LoadingButton } from "@mui/lab";
import { Box, Stack } from "@mui/material";
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from "src/components/hook-form";
import Password from "src/components/Password";
import useLocales from "src/hooks/useLocales";
import { isValidString } from "src/utils/validators";
import useAddSubAdmin from "../../hooks/useAddSubAdmin";
import AdminGroups from "./AdminGroups";
import Departments from "./Departments";
import Products from "./Products";

const InputWrapper = ({ children }) => (
  <Box
    sx={{
      display: "grid",
      columnGap: 2,
      rowGap: 3,
      gridTemplateColumns: "repeat(2, 1fr)",
    }}
  >
    {children}
  </Box>
);

const Form = () => {
  const { translate } = useLocales();
  const { methods, onSubmit } = useAddSubAdmin();
  const { isSubmitting } = methods.formState;

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <InputWrapper>
        <RHFTextField
          name="name"
          type="text"
          label={translate("adminSubAdmin.subAdmin.names")}
          onChange={({ target: { value } }) =>
            isValidString(value) && methods.setValue("name", value)
          }
          onBlur={(e) => methods.setValue("name", e.target.value.trim())}
        />
        <RHFTextField
          name="mobile"
          type="number"
          label={translate("adminSubAdmin.subAdmin.mobile")}
        />
        <Products />
        <Departments />
        <AdminGroups />

        <RHFTextField
          name="email"
          type="email"
          label={translate("adminSubAdmin.subAdmin.email")}
        />
        <RHFSelect
          name="is_impersonation"
          label={translate("adminSubAdmin.subAdmin.enableImpersonation")}
        >
          <option value={1}>
            {translate("adminSubAdmin.subAdmin.enable")}
          </option>
          <option value={0}>
            {translate("adminSubAdmin.subAdmin.disable")}
          </option>
        </RHFSelect>
        <RHFTextField
          name="username"
          type="text"
          label={translate("adminSubAdmin.subAdmin.userNames")}
        />
        <Password name="password" label="Password" />
        <Password
          name="confirmPassword"
          label={translate("adminSubAdmin.subAdmin.reEnterPassword")}
        />
      </InputWrapper>
      <Stack alignItems="flex-end" sx={{ mt: 3 }}>
        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          {translate("adminSubAdmin.subAdmin.submit")}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
};

export default Form;
