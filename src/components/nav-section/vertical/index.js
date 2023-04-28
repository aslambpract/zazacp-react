import { Box, List, ListSubheader } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { NavListRoot } from "./NavList";

import { capitalCase } from "change-case";
import useLocales from "src/hooks/useLocales";

export const ListSubheaderStyle = styled((props) => (
  <ListSubheader disableSticky disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.overline,
  paddingTop: theme.spacing(3),
  paddingLeft: theme.spacing(2),
  paddingBottom: theme.spacing(1),
  color: theme.palette.text.primary,
  transition: theme.transitions.create("opacity", {
    duration: theme.transitions.duration.shorter,
  }),
}));

NavSectionVertical.propTypes = {
  isCollapse: PropTypes.bool,
  navConfig: PropTypes.array,
};

export default function NavSectionVertical({
  key,
  navConfig,
  isCollapse = false,
  ...other
}) {
  const { translate } = useLocales();
  return (
    <Box {...other}>
      {navConfig.map((group, i) => {
        return (
          <List key={i} disablePadding sx={{ px: 2 }}>
            <ListSubheaderStyle
              sx={{
                ...(isCollapse && {
                  opacity: 0,
                }),
              }}
            >
              {capitalCase(translate(group.subheader) || "")}
            </ListSubheaderStyle>

            {group.items.map((list) => {
              return (
                <NavListRoot
                  key={list.title}
                  list={list}
                  isCollapse={isCollapse}
                />
              );
            })}
          </List>
        );
      })}
    </Box>
  );
}
