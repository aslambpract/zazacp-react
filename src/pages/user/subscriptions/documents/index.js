import { Box, Button, Card, Grid, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Iconify from "src/components/Iconify";
import PaginationButtons from "src/components/pagination";
import useFetch from "./hooks/useFetch";
import useLocales from "src/hooks/useLocales";

const Index = () => {
  const { translate } = useLocales();
  const { data, ...rest } = useFetch("documents");

  return (
    <>
      <div>
        <Grid container spacing={3}>
          {data.map(({ id, doc_name: name, doc_url: url }) => (
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
                  LinkComponent={Link}
                  to="/pdf"
                  state={{
                    docURI:
                      "https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf",
                  }}
                  size="small"
                  startIcon={<Iconify icon={"carbon:view"} />}
                >
                  {translate("userMySubscriptions.view")} 
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>

      <PaginationButtons {...rest} />
    </>
  );
};

export default Index;
