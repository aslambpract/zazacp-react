import EmptyContent from "src/components/EmptyContent";
import useLocales from "src/hooks/useLocales";

const EmptyCart = () => {
  const { translate } = useLocales();
  return (
    <EmptyContent
      title={translate("userOnlineStore.cartIsEmpty")}
      description="Look like you have no items in your shopping cart."
      img="https://minimals.cc/assets/illustrations/illustration_empty_cart.svg"
    />
  );
};
export default EmptyCart;
