import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import useAuth from "src/hooks/useAuth";
import { useState } from "react";
// import denizns from "src/images/denizns.png";
// ----------------------------------------------------------------------

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default function Logo({ disabledLink = false, sx }) {
  const { user } = useAuth();
  const isLoggedIn = Boolean(user);
  const [imageLoaded, setImageLoaded] = useState(true);
  const logo = localStorage.getItem(isLoggedIn ? "side_bar_logo" : "logo");

  if (disabledLink) {
    return (
      <img
        width={50}
        height={40}
        // src={denizns}
        onError={() => setImageLoaded(false)}
      />
    );
    // <CloudLogo sx={sx} />;
  }

  return (
    <RouterLink to="/">
      {imageLoaded ? (
        <img
          height={40}
          width={50}
          src={logo}
          onError={() => setImageLoaded(false)}
        />
      ) : (
        // <CloudLogo sx={sx} />
        <img
          width={50}
          height={40}
          // src={denizns}
          onError={() => setImageLoaded(false)}
        />
      )}
    </RouterLink>
  );
}

const CloudLogo = ({ sx }) => {
  const theme = useTheme();
  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;
  const PRIMARY_WARNING = theme.palette.primary.warning;
  const logo = (
    <Box sx={{ width: 40, height: 40, ...sx }}>
      {/* <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 512 512">
        <defs>
          <linearGradient id="BG1" x1="100%" x2="50%" y1="9.946%" y2="50%">
            <stop offset="0%" stopColor={PRIMARY_DARK} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
          <linearGradient id="BG2" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
          <linearGradient id="BG3" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
        </defs>
        <g fill={PRIMARY_MAIN} fillRule="evenodd" stroke="none" strokeWidth="1">
          <path
            fill="url(#BG1)"
            d="M183.168 285.573l-2.918 5.298-2.973 5.363-2.846 5.095-2.274 4.043-2.186 3.857-2.506 4.383-1.6 2.774-2.294 3.939-1.099 1.869-1.416 2.388-1.025 1.713-1.317 2.18-.95 1.558-1.514 2.447-.866 1.38-.833 1.312-.802 1.246-.77 1.18-.739 1.111-.935 1.38-.664.956-.425.6-.41.572-.59.8-.376.497-.537.69-.171.214c-10.76 13.37-22.496 23.493-36.93 29.334-30.346 14.262-68.07 14.929-97.202-2.704l72.347-124.682 2.8-1.72c49.257-29.326 73.08 1.117 94.02 40.927z"
          />
          <path
            fill="url(#BG2)"
            d="M444.31 229.726c-46.27-80.956-94.1-157.228-149.043-45.344-7.516 14.384-12.995 42.337-25.267 42.337v-.142c-12.272 0-17.75-27.953-25.265-42.337C189.79 72.356 141.96 148.628 95.69 229.584c-3.483 6.106-6.828 11.932-9.69 16.996 106.038-67.127 97.11 135.667 184 137.278V384c86.891-1.611 77.962-204.405 184-137.28-2.86-5.062-6.206-10.888-9.69-16.994"
          />
          <path
            fill="url(#BG3)"
            d="M450 384c26.509 0 48-21.491 48-48s-21.491-48-48-48-48 21.491-48 48 21.491 48 48 48"
          />
        </g>
      </svg> */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 1002.06 618.23"
      >
        <defs>
          <linearGradient id="BG1" x1="100%" x2="50%" y1="9.946%" y2="50%">
            <stop offset="0%" stopColor={PRIMARY_DARK} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
          <linearGradient id="BG2" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
          <linearGradient id="BG3" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
        </defs>
        <g
          id="Layer_2"
          data-name="Layer 2"
          fill={PRIMARY_MAIN}
          fillRule="evenodd"
          stroke="none"
          strokeWidth="1"
        >
          <g
            id="Layer_1-2"
            data-name="Layer 1"
            fill={PRIMARY_WARNING}
            fillRule="evenodd"
            stroke="none"
            strokeWidth="1"
          >
            <path
              className="cls-1"
              d="M150,613.42c17.13,1.28,34.42.8,51.72.8h638c15,0,29.21-1,43.75-4.84a162.38,162.38,0,0,0,59.76-29.51c24.54-19.57,41.49-46.69,50.51-76.61a189.6,189.6,0,0,0,7.31-35.51c2-20.34,1.64-38.66-5.45-57.95a212.51,212.51,0,0,0-15.18-32.59c-15.94-27.76-38.66-51.57-67.11-66.59-19.63-10.37-41.32-16.27-63.37-18.35,0,0,67.07-156.1-79.27-258.54,0,0-128-91.46-261,26.83,0,0-50-52.44-129.27-34.15,0,0-86.59,25.61-90.25,114.64,0,0-161,3.66-140.24,147.56,0,0-149.89,20.73-149.89,175.61,0,10,2.4,20.42,4.87,30,5.79,22.48,15.9,44,30.45,62.13,20.3,25.35,48.6,42.52,79.72,51.26A177.26,177.26,0,0,0,150,613.42Z"
            />
            <path
              className="cls-2"
              d="M111.2,606.49s51.53-120.71,174.35-98.82c0,0,4.24-103.77,84-142.59,0,0,110.12-58.59,197.65,31.06,0,0,115.76-117.18,247.06-69.88,0,0,151.06,43.47,178.59,179.71,0,0-23.34,99.51-140.87,108.34s-668.82,0-668.82,0S144.42,616,111.2,606.49Z"
            />
          </g>
        </g>
      </svg>
    </Box>
  );

  // if (disabledLink) {
  //   return <>{logo}</>;
  // }

  return <RouterLink to="/">{logo}</RouterLink>;
};
