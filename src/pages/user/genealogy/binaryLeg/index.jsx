import {
  Box,
  Button,
  Card,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import { PATH_USER } from "src/routes/paths";
import useFetchBinaryLeg from "./hooks/useFetchBinaryLeg";
import useUpdateBinaryLeg from "./hooks/useUpdateBinaryLeg";
import useLocales from "src/hooks/useLocales";

const BinaryLeg = () => {
  const { translate } = useLocales();
  const theme = useTheme();
  const { data, fetchData } = useFetchBinaryLeg();
  const [value, setState] = useState("");
  const onSubmit = useUpdateBinaryLeg();
  const handleChange = (e) => {
    setState(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(value);
  };

  console.log(data);

  return (
    <Page title={translate("userGenealogy.binaryLegSettings.BinaryTitile")}>
      <Container maxWidth="100%">
        <HeaderBreadcrumbs
          heading={translate(
            "userGenealogy.binaryLegSettings.binaryLegSettings"
          )}
          links={[
            { name: translate("dashboard"), href: PATH_USER.root },
            { name: translate("userGenealogy.binary.binaryLegSettings") },
          ]}
        />

        <Card>
          <Stack sx={{ width: "fit-content", padding: 3 }} spacing={3}>
            <Stack
              sx={{
                width: "fit-content",
              }}
              spacing={2}
            >
              <FormControl>
                <Stack spacing={2}>
                  <FormLabel id="demo-radio-buttons-group-label">
                    <Button
                      disableRipple
                      sx={{
                        color: theme.palette.grey.A700,
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      {translate("userGenealogy.binaryLegSettings.currentLeg")}
                    </Button>
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={data}
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      sx={{ marginBottom: "0.3rem" }}
                      value="points"
                      control={<Radio />}
                      label={translate(
                        "userGenealogy.binaryLegSettings.basedPoints"
                      )}
                      onChange={handleChange}
                    />
                    <FormControlLabel
                      sx={{ marginBottom: "0.3rem" }}
                      value="referrals"
                      control={<Radio />}
                      label={translate(
                        "userGenealogy.binaryLegSettings.basedReferrals"
                      )}
                      onChange={handleChange}
                    />
                    <FormControlLabel
                      sx={{ marginBottom: "0.3rem" }}
                      value="left"
                      control={<Radio />}
                      label={translate(
                        "userGenealogy.binaryLegSettings.leftReferrals"
                      )}
                      onChange={handleChange}
                    />

                    <FormControlLabel
                      sx={{ marginBottom: "0.3rem" }}
                      value="right"
                      control={<Radio />}
                      label={translate(
                        "userGenealogy.binaryLegSettings.rightReferrals"
                      )}
                      onChange={handleChange}
                    />
                  </RadioGroup>
                </Stack>
              </FormControl>
              <Box>
                <Button
                  variant="contained"
                  type="submit"
                  onClick={handleSubmit}
                >
                  {translate("save")}
                </Button>
              </Box>
            </Stack>
          </Stack>
        </Card>
      </Container>
    </Page>
  );
};

export default BinaryLeg;
