import { CardHeader, FormControlLabel } from "@mui/material";
import Toggle from "./Toggle";

const HeaderSection = ({ imageUrl, onChange, active, name, productUrl }) => (
  <CardHeader
    // avatar={
    //   <Avatar sx={{ bgcolor: grey[100] }} aria-label="recipe">
    //     <CardMedia
    //       component="img"
    //       height="194"
    //       image={imageUrl}
    //       alt="cloudMLM"
    //     />
    //   </Avatar>
    // }
    action={
      <>
        <FormControlLabel
          control={<Toggle onChange={onChange} checked={active} />}
        />
      </>
    }
    title={name}
    subheader={productUrl}
  />
);

export default HeaderSection;
