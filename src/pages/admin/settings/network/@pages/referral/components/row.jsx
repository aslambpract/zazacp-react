import {
  CircularProgress,
  InputAdornment,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import { useState } from "react";

const Row = ({
  id,
  rank_name: rankName,
  referral_bonus: referralBonus,
  onSubmit,
  handleUpdate,
}) => {
  const [loading, setLoading] = useState(false);
  const onChange = (e) => {
    setLoading(true);
    handleUpdate(id, e);
  };
  const handleSubmit = async () => {
    const isSuccess = await onSubmit(id);
    setLoading(!isSuccess);
  };
  return (
    <TableRow key={id}>
      <TableCell>
        <TextField type="text" size="small" value={rankName} disabled />
      </TableCell>
      <TableCell>
        <TextField
          onBlur={handleSubmit}
          onChange={onChange}
          type="number"
          size="small"
          value={referralBonus}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                {loading ? (
                  <CircularProgress size={10} />
                ) : (
                  <CircularProgress size={10} variant="determinate" value={0} />
                )}
              </InputAdornment>
            ),
          }}
        />
      </TableCell>
    </TableRow>
  );
};

export default Row;
