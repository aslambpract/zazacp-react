import {
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Stack,
} from "@mui/material";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import usePaymentTypes from "../../hook/usePaymentTypes";
import LabelStyle from "../LabelStyle";
import useLocales from "src/hooks/useLocales";


const PaymentTypes = () => {
  const { translate } = useLocales();
  const { setValue, getValues, watch } = useFormContext();
  const types = usePaymentTypes();

  const savedTypes = watch("payment_types");
  return (
    <Card sx={{ p: 3 }}>
      <Stack spacing={1}>
        <LabelStyle>{translate("adminStore.products.paymentType")}</LabelStyle>
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormGroup>
            {types.map(({ id, name }) => {
              const isChecked = savedTypes?.includes(id);
              return (
                <FormControlLabel
                  key={id}
                  control={
                    <Checkbox
                      checked={isChecked}
                      onChange={() => {
                        const current = savedTypes;
                        const index = current.findIndex((item) => item === id);

                        if (index < 0) {
                          setValue("payment_types", [...current, id]);
                        } else {
                          current.splice(index, 1);
                          setValue("payment_types", current);
                        }
                      }}
                    />
                  }
                  label={name}
                />
              );
            })}
          </FormGroup>
        </FormControl>
      </Stack>
    </Card>
  );
};

export default PaymentTypes;
