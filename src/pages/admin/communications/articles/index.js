import {
  Box,
  Card,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";

import { PATH_DASHBOARD } from "src/routes/paths";

import { Outlet } from "react-router";
import { NavLink as RouterLink } from "react-router-dom";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Iconify from "src/components/Iconify";
import Page from "src/components/Page";
import useLocales from "src/hooks/useLocales";


const Index = () => {
  const { translate } = useLocales(); 
  return (
    <>
      <Page title={translate("adminCommunication.articile.articleTitile")} >
        <Box sx={{ p: 2 }}>
          <HeaderBreadcrumbs
            heading={translate("adminCommunication.articile.article")} 
            links={[
              { name: translate("dashboard") , href: PATH_DASHBOARD.root },
              { name: translate("adminCommunication.articile.article")  },
            ]}
          />

          <Card sx={{ p: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4} md={4}>
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                >
                  <Paper elevation={3}>
                    <nav aria-label="secondary mailbox folders">
                      <List>
                        <ListItem disablePadding>
                          <ListItemButton>
                            <ListItemIcon>
                              <Iconify icon={"carbon:share-knowledge"} />
                            </ListItemIcon>
                            <ListItemText primary={translate("adminCommunication.articile.knowledgeBase")} />
                          </ListItemButton>
                        </ListItem>
                      </List>
                    </nav>
                    <Divider />
                    <nav aria-label="main mailbox folders">
                      <List>
                        <ListItem disablePadding>
                          <ListItemButton
                            to={PATH_DASHBOARD.communication.com_article}
                            component={RouterLink}
                          >
                            <ListItemIcon>
                              <Iconify
                                icon={"ooui:article-rtl"}
                                style={{ color: "#9575cd" }}
                              />
                            </ListItemIcon>
                            <ListItemText primary={translate("adminCommunication.articile.article")} />
                          </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                          <ListItemButton
                            to={PATH_DASHBOARD.communication.article_categories}
                            component={RouterLink}
                          >
                            <ListItemIcon>
                              <Iconify icon={"ph:article-light"} />
                            </ListItemIcon>
                            <ListItemText primary={translate("adminCommunication.articile.articleCategory")} />
                          </ListItemButton>
                        </ListItem>
                        {/* <ListItem disablePadding>
                          <ListItemButton
                            to={PATH_DASHBOARD.communication.article_categories}
                            component={RouterLink}
                          >
                            <ListItemIcon>
                              <Iconify icon={"gg:edit-black-point"} />
                            </ListItemIcon>
                            <ListItemText primary="Product Test" />
                          </ListItemButton>
                        </ListItem> */}
                      </List>
                    </nav>
                  </Paper>  
                </Box>
              </Grid>
              <Grid item xs={12} sm={8} md={8}>
                <Outlet />
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Page>
    </>
  );
};

export default Index;
