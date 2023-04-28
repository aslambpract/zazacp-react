import { Box, Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "src/components/Image";
import PaginationButtons from "src/components/pagination";
import cssStyles from "src/utils/cssStyles";
import useFetchEvents from "../hooks/useFetchEvents";

const CaptionStyle = styled(CardContent)(({ theme }) => ({
  ...cssStyles().bgBlur({ blur: 2, color: theme.palette.grey[900] }),
  bottom: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  position: "absolute",
  justifyContent: "space-between",
  color: theme.palette.common.white,
}));

const EventCard = ({ data, ...rest }) => {
  return (
    <>
      <div>
        <Box
          sx={{
            display: "grid",
            gap: 3,
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
          }}
        >
          {data.map(({ id, image, description, topic, created_at }) => {
            return (
              <Card key={id} sx={{ cursor: "pointer", position: "relative" }}>
                <img src={image} />

                <CaptionStyle>
                  <div>
                    <Typography variant="subtitle1">{topic}</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.72 }}>
                      {new Date(created_at).toLocaleDateString("en-GB", {
                        year: "2-digit",
                        month: "long",
                        year: "2-digit",
                      })}
                    </Typography>
                    <Typography variant="caption">{description}</Typography>
                  </div>
                </CaptionStyle>
              </Card>
            );
          })}
        </Box>
      </div>

      <PaginationButtons {...rest} />
    </>
  );
};

export default EventCard;
