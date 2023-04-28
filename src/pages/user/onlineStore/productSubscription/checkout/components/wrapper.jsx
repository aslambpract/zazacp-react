import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import { PATH_USER } from "src/routes/paths";
import useLocales from "src/hooks/useLocales";

const Wrapper = ({ children }) => {
  const { translate } = useLocales();
  return (
    <Page title= {translate("userOnlineStore.CheckoutTitile")}>
      <HeaderBreadcrumbs
        heading= {translate("userOnlineStore.checkout")}
        links={[
          { name:translate("dashboard") , href: PATH_USER.root },
          {
            name:translate("userOnlineStore.productSubscription") ,
            href: PATH_USER.onlineStore.productSubscription.root,
          },
          { name:translate("userOnlineStore.checkout")  },
        ]}
      />
      {children}
    </Page>
  );
};

export default Wrapper;
