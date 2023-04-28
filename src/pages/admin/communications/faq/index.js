import { Box, Tab, Tabs } from "@mui/material";
import { capitalCase } from "change-case";
import { Outlet, useNavigate } from "react-router";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Iconify from "src/components/Iconify";
import Page from "src/components/Page";
import useCustomTabs from "src/hooks/useCustomTabs";
import { PATH_DASHBOARD } from "src/routes/paths";
import useLocales from "src/hooks/useLocales";
import i18n from "src/locales/i18n"





const Faqs = () => {
  const FAQS_TABS = [
    {
      value: i18n.t("adminCommunication.faqs.faqq")  ,
      icon: <Iconify icon={"carbon:archive"} width={20} height={20} />,
      href: PATH_DASHBOARD.communication.com_faqs,
    },
    {
      value: i18n.t("adminCommunication.faqs.category")  ,
      icon: (
        <Iconify
          icon={"icon-park-outline:category-management"}
          width={20}
          height={20}
        />
      ),
      href: "category",
    },
  ];
  const { translate } = useLocales();
  const { currentTab, onChangeTab } = useCustomTabs("faq_section", "faq");

  const navigate = useNavigate();
  return (
    <Page title={translate("adminCommunication.faqs.faqTitile")}>
      <Box sx={{ p: 2 }}>
        <HeaderBreadcrumbs
          heading={translate("adminCommunication.faqs.faq")}
          links={[
            { name: translate("dashboard"), href: PATH_DASHBOARD.root },
            { name:translate("adminCommunication.faqs.faqs") },
          ]}
        />

        <Tabs
          allowScrollButtonsMobile
          variant="scrollable"
          scrollButtons="auto"
          value={currentTab}
          onChange={onChangeTab}
        >
          {FAQS_TABS.map((tab) => (
            <Tab
              disableRipple
              key={tab.value}
              label={capitalCase(tab.value)}
              icon={tab.icon}
              value={tab.value}
              onClick={() => navigate(tab.href)}
            />
          ))}
        </Tabs>

        <Box sx={{ mb: 5 }} />
        <Outlet />
      </Box>
    </Page>
  );
};

export default Faqs;
