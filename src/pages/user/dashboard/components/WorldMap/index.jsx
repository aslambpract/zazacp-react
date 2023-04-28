import { Box, Card, CardHeader } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { scaleLinear } from "d3-scale";
import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Sphere,
} from "react-simple-maps";
import ReactTooltip from "react-tooltip";
import geoUrl from "./features.json";
import vulnerability from "./vulnerability.json";
import useLocales from "src/hooks/useLocales";



const useColorScale = () => {
  const theme = useTheme();

  return scaleLinear()
    .domain([0.29, 0.68])
    .range([theme.palette.primary.light, theme.palette.primary.dark]);
};

const MapChart = ({ data }) => {
  const { translate } = useLocales();
  const colorScale = useColorScale();
  const { palette } = useTheme();
  const [content, setContent] = useState("");

  return (
    <>
      <Card>
        <CardHeader title={translate("adminDashboard.network.membersMap")} />

        <Box
          sx={{
            width: "80vh",
          }}
        >
          <div data-tip="">
            <ComposableMap>
              <Sphere stroke={palette.background.neutral} strokeWidth={0.5} />
              <Graticule
                stroke={palette.background.neutral}
                strokeWidth={0.5}
              />
              {vulnerability.length > 0 && (
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const c = data.find((s) => s.country === geo.id);
                      return (
                        <Geography
                          onMouseEnter={() => {
                            setContent(
                              `${geo.properties.name} ${c.count * 10}`
                            );
                          }}
                          onMouseLeave={() => {
                            setContent("");
                          }}
                          key={geo.rsmKey}
                          geography={geo}
                          fill={
                            c ? colorScale(c.count) : palette.background.neutral
                          }
                          style={{
                            hover: {
                              fill: palette.primary.lighter,
                              outline: "none",
                            },
                            pressed: {
                              fill: palette.primary.lighter,
                              outline: "none",
                            },
                          }}
                        />
                      );
                    })
                  }
                </Geographies>
              )}
            </ComposableMap>
          </div>
        </Box>
      </Card>

      <ReactTooltip>{content}</ReactTooltip>
    </>
  );
};

export default MapChart;
