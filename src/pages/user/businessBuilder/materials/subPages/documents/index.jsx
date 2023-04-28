import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Iconify from "src/components/Iconify";
import Progress from "src/components/Progress";
import useLocales from "src/hooks/useLocales";
import { useMaterialContext } from "../..";

const Documents = () => {
  const { translate } = useLocales();
  const { docs } = useMaterialContext();

  const isLoaded = docs.length;

  return (
    <Card sx={{ padding: "2rem" }}>
      <Stack spacing={3}>
        <Typography variant="h6">
          {translate("userBusinessBuilder.material.documents")}
        </Typography>

        <Stack spacing={2}>
          {isLoaded ? (
            docs.map(({ id, doc_title: name, doc_url: url }) => (
              <Grid item xs={12} md={4} key={id}>
                <Card sx={{ display: "flex", alignItems: "center", p: 3 }}>
                  <IconButton sx={{ backgroundColor: "#ebebeb" }}>
                    <Iconify icon={"et:document"} width={24} height={24} />
                  </IconButton>
                  <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
                    <Typography variant="subtitle2" noWrap>
                      {name}
                    </Typography>
                  </Box>
                  <Button
                    LinkComponent="a"
                    href={url}
                    target="_blank"
                    size="small"
                    startIcon={<Iconify icon={"carbon:view"} />}
                  >
                    {translate("userBusinessBuilder.material.view")}
                  </Button>
                </Card>
              </Grid>
            ))
          ) : (
            <Progress />
          )}
        </Stack>
      </Stack>
    </Card>
  );
};

export default Documents;
