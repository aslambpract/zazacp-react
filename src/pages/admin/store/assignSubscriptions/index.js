import { Box, Card, Tab, Tabs } from "@mui/material";
import { capitalCase } from "change-case";
import Iconify from "src/components/Iconify";
import useTabs from "src/hooks/useTabs";
import CategoryTab from "../assignSubscriptionsCat/index";
import Wrapper from "./components/Wrapper";
import ProductHistory from "./productHistory";
import Trashed from "./trashed";
import i18n from "src/locales/i18n"



const Index = () => {
  const SUB_TABS = [
    {
      dataKey: "product_subscription",
      value: i18n.t("adminStore.assignSubscriptions.products")  ,
      icon: (
        <Iconify
          icon={"eos-icons:product-classes-outlined"}
          width={20}
          height={20}
        />
      ),
      component: <ProductHistory />,
    },
    {
      dataKey: "trashed_product_subscription",
      value: i18n.t("adminStore.assignSubscriptions.trashed")  ,
      icon: <Iconify icon={"bytesize:trash"} width={20} height={20} />,
      component: <Trashed />,
    },
    {
      dataKey: "",
      value:  i18n.t("adminStore.assignSubscriptions.category") ,
      icon: <Iconify icon={"bx:category"} width={20} height={20} />,
      component: <CategoryTab />,
    },
  ];
  
  const { currentTab, onChangeTab } = useTabs("products");

  return (
    <Wrapper>
      <Card sx={{ p: 3 }}>
        <Tabs
          allowScrollButtonsMobile
          variant="scrollable"
          scrollButtons="auto"
          value={currentTab}
          onChange={onChangeTab}
        >
          {SUB_TABS.map((tab) => (
            <Tab
              disableRipple
              key={tab.value}
              label={capitalCase(tab.value)}
              icon={tab.icon}
              value={tab.value}
            />
          ))}
        </Tabs>

        <Box sx={{ mb: 5 }} />

        {SUB_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Card>
    </Wrapper>
  );
};

export default Index;
