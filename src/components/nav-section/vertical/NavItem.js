import PropTypes from "prop-types";
import { NavLink as RouterLink } from "react-router-dom";
// @mui
import { Box, Link, ListItemText } from "@mui/material";
//
import { capitalCase } from "change-case";
import { ca } from "date-fns/locale";
import SvgIconStyle from "src/components/SvgIconStyle";
import useAuth from "src/hooks/useAuth";
import useLocales from "src/hooks/useLocales";
import { isExternalLink } from "..";
import Iconify from "../../Iconify";
import { ListItemIconStyle, ListItemStyle, ListItemTextStyle } from "./style";

// ----------------------------------------------------------------------

NavItemRoot.propTypes = {
  active: PropTypes.bool,
  open: PropTypes.bool,
  isCollapse: PropTypes.bool,
  onOpen: PropTypes.func,
  item: PropTypes.shape({
    children: PropTypes.array,
    icon: PropTypes.any,
    info: PropTypes.any,
    path: PropTypes.string,
    title: PropTypes.string,
  }),
};

export function NavItemRoot({
  item,
  isCollapse,
  open = false,
  active,
  onOpen,
}) {
  const { translate } = useLocales();
  const { title, path, icon, info, children, active: isEnabled } = item;
  const isActive = Boolean(isEnabled);
  const { isSubAdmin } = useAuth();

  if (isSubAdmin && !isActive) return null;

  const renderContent = (
    <>
      {icon && (
        <ListItemIconStyle>
          <SvgIconStyle src={icon} sx={{ width: 1, height: 1 }} />
        </ListItemIconStyle>
      )}
      <ListItemTextStyle
        disableTypography
        primary={translate(title)}
        isCollapse={isCollapse}
      />
      {!isCollapse && (
        <>
          {info && info}
          {children && <ArrowIcon open={open} />}
        </>
      )}
    </>
  );

  if (children) {
    return (
      <ListItemStyle onClick={onOpen} activeRoot={active}>
        {renderContent}
      </ListItemStyle>
    );
  }

  return isExternalLink(path) ? (
    <ListItemStyle component={Link} href={path} target="_blank" rel="noopener">
      {renderContent}
    </ListItemStyle>
  ) : (
    <ListItemStyle component={RouterLink} to={path} activeRoot={active}>
      {renderContent}
    </ListItemStyle>
  );
}

// ----------------------------------------------------------------------

NavItemSub.propTypes = {
  active: PropTypes.bool,
  open: PropTypes.bool,
  onOpen: PropTypes.func,
  item: PropTypes.shape({
    children: PropTypes.array,
    info: PropTypes.any,
    path: PropTypes.string,
    title: PropTypes.string,
  }),
};

export function NavItemSub({ item, open = false, active = false, onOpen }) {
  const { translate } = useLocales();

  const { title, path, info, children } = item;
  const renderContent = (
    <>
      <DotIcon active={active} />
      <ListItemText disableTypography primary={translate(title)} />
      {info && info}
      {children && <ArrowIcon open={open} />}
    </>
  );

  if (children) {
    return (
      <ListItemStyle onClick={onOpen} activeSub={active} subItem>
        {renderContent}
      </ListItemStyle>
    );
  }

  return isExternalLink(path) ? (
    <ListItemStyle
      component={Link}
      href={path}
      target="_blank"
      rel="noopener"
      subItem
    >
      {renderContent}
    </ListItemStyle>
  ) : (
    <ListItemStyle component={RouterLink} to={path} activeSub={active} subItem>
      {renderContent}
    </ListItemStyle>
  );
}

// ----------------------------------------------------------------------

DotIcon.propTypes = {
  active: PropTypes.bool,
};

export function DotIcon({ active }) {
  return (
    <ListItemIconStyle>
      <Box
        component="span"
        sx={{
          width: 4,
          height: 4,
          borderRadius: "50%",
          bgcolor: "text.disabled",
          transition: (theme) =>
            theme.transitions.create("transform", {
              duration: theme.transitions.duration.shorter,
            }),
          ...(active && {
            transform: "scale(2)",
            bgcolor: "primary.main",
          }),
        }}
      />
    </ListItemIconStyle>
  );
}

// ----------------------------------------------------------------------

ArrowIcon.propTypes = {
  open: PropTypes.bool,
};

export function ArrowIcon({ open }) {
  return (
    <Iconify
      icon={open ? "eva:arrow-ios-downward-fill" : "eva:arrow-ios-forward-fill"}
      sx={{ width: 16, height: 16, ml: 1 }}
    />
  );
}
