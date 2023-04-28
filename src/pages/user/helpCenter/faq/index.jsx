import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { paramCase } from "change-case";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ReactQuill from "react-quill";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Iconify from "src/components/Iconify";
import Page from "src/components/Page";
import { PATH_USER } from "src/routes/paths";
import Footer from "./components/footer";
import NavButton from "./components/NavButton";
import useFaq from "./hooks/useFaq";
import Picture from "./picture";
import useLocales from "src/hooks/useLocales";

const Faqs = () => {
  const { translate } = useLocales();
  const { faqs, categories } = useFaq();
  const { label } = useParams();
  const { palette, breakpoints, shape } = useTheme();
  const [expanded, setExpanded] = useState(-1);
  const handleChange = (index) => (e, isExpanded) => {
    setExpanded(isExpanded ? index : false);
  };

  const matches = useMediaQuery(breakpoints.up("sm"));
  const [active, setActive] = useState({ name: "", icon: "" });
  useEffect(() => {
    const item = categories.find(({ slug }) => slug === label);
    if (item) {
      setActive(item);
    }
  }, [label, categories]);

  const faq = faqs.find((item) => paramCase(item.name) === label)?.faq;
  return (
    <Page title={translate("userHelpCenter.faq.faqTitile")}>
      <Box sx={{ p: 2 }}>
        <HeaderBreadcrumbs
          heading={translate("userHelpCenter.faq.fasq")}
          links={[
            { name: translate("dashboard"), href: PATH_USER.root },
            { name: translate("userHelpCenter.faq.Faqs") },
          ]}
        />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              md: "23% 77%",
            },
            rowGap: {
              xs: 5,
            },
            columnGap: 2,
          }}
        >
          <Stack spacing={8}>
            <Card sx={{ p: 2 }}>
              <Stack spacing={1}>
                {categories.map(({ icon, name, slug }) => (
                  <NavButton
                    icon={icon}
                    to={slug}
                    label={name}
                    reset={() => setExpanded(-1)}
                  />
                ))}
              </Stack>
              {matches && (
                <Stack alignItems="center" sx={{ mt: 2, p: 5 }}>
                  <Picture />
                </Stack>
              )}
            </Card>
          </Stack>

          <Box>
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{
                marginBottom: "1rem",
              }}
            >
              <Iconify
                icon={active.icon}
                sx={{
                  fontSize: "1rem",
                  color: palette.primary.main,
                }}
              />
              <Stack>
                <Typography variant="h4">{active.name}</Typography>
                <Typography variant="body2">
                  {translate("userHelpCenter.faq.whichLicense")}
                </Typography>
              </Stack>
            </Stack>
            <Stack spacing={1}>
              <Card>
                {faq?.map(({ id, question, answer }, i) => (
                  <Accordion
                    key={i}
                    onChange={handleChange(i)}
                    expanded={expanded === i}
                    sx={{
                      "&::before": {
                        content: "none",
                      },
                      borderRadius: `${shape.borderRadius}px`,
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<Iconify icon="ic:baseline-expand-more" />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>{question} ?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <ReactQuill
                        value={answer}
                        theme="bubble"
                        modules={{
                          toolbar: null,
                        }}
                        readOnly
                      />
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Card>
            </Stack>
          </Box>
        </Box>

        {/* Footer */}

        <Footer />
      </Box>
    </Page>
  );
};

export default Faqs;
