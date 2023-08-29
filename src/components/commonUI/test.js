import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material";
import axiosInstance from "../../../axiosInstance";
import React, { useEffect, useState } from "react";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const chartColors = [
  "hsl(271, 70%, 50%)",
  "hsl(82, 70%, 50%)",
  "hsl(210, 70%, 50%)",
  "hsl(204, 70%, 50%)",
  "hsl(298, 70%, 50%)",
];

const PieChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    axiosInstance
      .get(`/api/order/status-distribution`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log("Fetched order status distribution:", response.data);
        const chartDataResponse = response.data.map((dataRow) => {
          chartData = {
            id: dataRow.status,
            label: dataRow.status,
            value: dataRow.value,
            color: chartColors[getRandomInt(chartColors.length)],
          };
          return chartData;
        });
        setChartData(chartDataResponse);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching order status distribution: ", error);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ height: 500, width: "100%" }}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ResponsivePie
          data={chartData}
          theme={{
            axis: {
              domain: {
                line: {
                  stroke: colors.grey[100],
                },
              },
              legend: {
                text: {
                  fill: colors.grey[100],
                },
              },
              ticks: {
                line: {
                  stroke: colors.grey[100],
                  strokeWidth: 1,
                },
                text: {
                  fill: colors.grey[100],
                },
              },
            },
            legends: {
              text: {
                fill: colors.grey[100],
              },
            },
          }}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderColor={{
            from: "color",
            modifiers: [["darker", 0.2]],
          }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor={colors.grey[100]}
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          enableArcLabels={false}
          arcLabelsRadiusOffset={0.4}
          arcLabelsSkipAngle={7}
          arcLabelsTextColor={{
            from: "color",
            modifiers: [["darker", 2]],
          }}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateX: 0,
              translateY: 56,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: "#999",
              itemDirection: "left-to-right",
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000",
                  },
                },
              ],
            },
          ]}
        />
      )}
    </div>
  );
};

export default PieChart;
