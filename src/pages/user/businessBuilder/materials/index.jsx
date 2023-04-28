import { Box, Card, Container, Stack } from "@mui/material";
import { createContext, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import { PATH_USER } from "src/routes/paths";
import fetchUser from "src/utils/fetchUser";
import NavButton from "./components/navButton";
import useLocales from "src/hooks/useLocales";
import i18n from "src/locales/i18n"
 

const useMaterials = () => {
  const [materials, setMaterials] = useState({
    docs: [],
    videos: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await (await fetchUser("bb-materials")).data;
        if (status) {
          const {
            business_builder_material_doc: docs,
            business_builder_material_video: videos,
          } = data;

          setMaterials({ docs, videos });
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return materials;
};

const MaterialContext = createContext({
  docs: [],
  videos: [],
});

export const useMaterialContext = () => useContext(MaterialContext);

const Materials = () => {
  const listItems = [
    // {
    //   label: "Blog",
    //   to: "blog",
    //   icon: "carbon:blog",
    // },
    {
      label: i18n.t("userBusinessBuilder.material.documents") ,
      to: "documents",
      icon: "humbleicons:documents",
    },
    // {
    //   label: "Events",
    //   to: "events",
    //   icon: "bi:calendar-event",
    // },
    {
      label: i18n.t("userBusinessBuilder.material.videos") ,
      to: "videos",
      icon: "akar-icons:video",
    },
  ];
  
  const materials = useMaterials();
  // console.log(materials);
  const { translate } = useLocales();
  return (
    <MaterialContext.Provider value={materials}>
      <Page title= {translate("userBusinessBuilder.material.materials")} >
        <Container maxWidth="100%">
          <HeaderBreadcrumbs
            heading= {translate("userBusinessBuilder.material.materials")} 
            links={[
              { name: translate("dashboard"), href: PATH_USER.root },
              { name:translate("userBusinessBuilder.material.materials") },
            ]}
          />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { md: "20% 80%" },
              columnGap: 3,
              rowGap: 3,
            }}
          >
            <Box>
              <Card sx={{ p: 2 }}>
                <Stack spacing={1}>
                  {listItems.map(({ icon, label, to }) => (
                    <NavButton icon={icon} to={to} label={label} />
                  ))}
                </Stack>
              </Card>
            </Box>

            <Outlet />
          </Box>
        </Container>
      </Page>
    </MaterialContext.Provider>
  );
};


export default Materials;
