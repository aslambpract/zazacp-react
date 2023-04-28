import {
  Box,
  Checkbox,
  Collapse,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { camelCase, capitalCase } from "change-case";
import { useMemo, useState } from "react";
import useLocales from "src/hooks/useLocales";

const Item = ({ name, subMenu, onChange, active }) => {
  const [isActive, setActive] = useState(false);
  const { translate } = useLocales();
  useMemo(() => {
    setActive(!!active);
  }, [active]);

  const handleChange = (e) => {
    setActive(!isActive);
    onChange(camelCase(name))(e);
  };

  if (name === "subAdmin") return null;

  return (
    <>
      <FormControlLabel
        value={name}
        control={<Radio checked={isActive} onClick={handleChange} />}
        label={capitalCase(translate(name))}
      />

      <Box
        sx={{
          marginLeft: "2rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {subMenu?.map(({ title, id, active }) => {
          return (
            <Collapse in={isActive}>
              <SubMenu
                active={active}
                name={name}
                title={translate(title)}
                key={id}
                onChange={onChange}
              />
            </Collapse>
          );
        })}
      </Box>
    </>
  );
};

const SubMenu = ({ title, active, name, onChange }) => {
  const [isActive, setActive] = useState(false);

  useMemo(() => {
    setActive(!!active);
  }, [active]);

  const handleChange = (e) => {
    setActive(!isActive);
    onChange(camelCase(title))(e);
  };

  return (
    <FormControlLabel
      checked={isActive}
      onChange={handleChange}
      value={`${name}.${title}`}
      control={<Checkbox />}
      label={capitalCase(title)}
    />
  );
};

export default Item;
