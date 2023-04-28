import { Box, Card as MuiCard } from "@mui/material";
import PaginationButtons from "src/components/pagination";
import Content from "./content";
import useFetchSubscription from "./content/hooks/useFetchSubscription";
import Image from "./image";
import "./style.css";
import useLocales from "src/hooks/useLocales";


const Card = () => {
  const { translate } = useLocales();
  const { data, rowStart, fetchData, ...rest } = useFetchSubscription();
  return (
    <>
      {data.map(
        ({
          id,
          product_id,
          purchase_id,
          recurring,
          active,
          meta_description,
          short_description,
          body,
          subTitle,
          title,
          created_at,
          effective_until,
          purchase_product,
        }) => (
          <MuiCard
            sx={{
              padding: "1rem",
              margin: "2rem 0",
              minHeight: "200px",
            }}
          >
            <Box
              key={id}
              sx={{
                display: "flex",
              }}
            >
              <Box sx={{ display: { xs: "none", sm: "block", md: "block" } }}>
                <div className="products">
                  <ul>
                    <li>
                      <figure className="fig-responsive">
                        <Image
                          src={
                            purchase_product.product_images.find(Boolean)
                              ?.image_url
                          }
                        />
                      </figure>
                      {active ? (
                        <div className="badge-overlay">
                          <span className="top-right badge red">{translate("Active")}</span>
                        </div>
                      ) : null}
                    </li>
                  </ul>
                </div>
              </Box>
              <Content
                fetchData={fetchData}
                id={id}
                product_id={product_id}
                purchase_id={purchase_id}
                body={body}
                active={recurring === "yes"}
                subTitle={subTitle}
                title={title}
                name={purchase_product?.name}
                meta_description={meta_description}
                short_description={short_description}
                created_at={created_at}
                effective_until={effective_until}
              />
            </Box>
          </MuiCard>
        )
      )}
      <PaginationButtons {...rest} />
    </>
  );
};

export default Card;
