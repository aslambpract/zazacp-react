import { Box, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Map from "src/components/map";
import Ternary from "src/components/ternary";
import { trim } from "src/pages/admin/store/productCategories/Components/ProductCategory";
import { fCurrency } from "src/utils/formatNumber";
import { isBinary } from "src/utils/isBinary";

const RowResultStyle = styled(TableRow)(({ theme }) => ({
  "& td": {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

const InvoiceBody = ({ invoice }) => {
  const {
    taxes,
    discount,
    total_amount: totalPrice,
    total_amount: subTotalPrice,
    user_purchase_product: products,
    payment_type,
  } = invoice || {};
  return (
    <TableBody>
      <Map
        list={products}
        render={(row, index) => (
          <TableRow
            key={index}
            sx={{
              borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
            }}
          >
            <TableCell>{index + 1}</TableCell>
            <TableCell align="left">
              <Box sx={{ maxWidth: 560 }}>
                <Typography variant="subtitle2">
                  {trim(row.product?.name)}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary" }}
                  noWrap
                >
                  {row.payment_type?.name}
                </Typography>
              </Box>
            </TableCell>
            <TableCell align="left">{payment_type.name}</TableCell>
            <Ternary
              when={isBinary()}
              then={
                <TableCell align="right">
                  {row.product_price.business_volume}
                </TableCell>
              }
            />

            <TableCell align="right">
              {fCurrency(row.product_price.price)}
            </TableCell>
          </TableRow>
        )}
      />

      <RowResultStyle>
        <TableCell colSpan={3} />
        <TableCell align="right">
          <Box sx={{ mt: 2 }} />
          <Typography>Subtotal</Typography>
        </TableCell>
        <TableCell align="right" width={120}>
          <Box sx={{ mt: 2 }} />
          <Typography>{fCurrency(subTotalPrice)}</Typography>
        </TableCell>
      </RowResultStyle>

      <RowResultStyle>
        <TableCell colSpan={3} />
        <TableCell align="right">
          <Typography>Discount</Typography>
        </TableCell>
        <TableCell align="right" width={120}>
          <Typography sx={{ color: "error.main" }}>
            {discount && fCurrency(-discount)}
          </Typography>
        </TableCell>
      </RowResultStyle>

      <RowResultStyle>
        <TableCell colSpan={3} />
        <TableCell align="right">
          <Typography>Taxes</Typography>
        </TableCell>
        <TableCell align="right" width={120}>
          <Typography>{taxes && fCurrency(taxes)}</Typography>
        </TableCell>
      </RowResultStyle>

      <RowResultStyle>
        <TableCell colSpan={3} />
        <TableCell align="right">
          <Typography variant="h6">Total</Typography>
        </TableCell>
        <TableCell align="right" width={140}>
          <Typography variant="h6">{fCurrency(totalPrice)}</Typography>
        </TableCell>
      </RowResultStyle>
    </TableBody>
  );
};

export default InvoiceBody;
