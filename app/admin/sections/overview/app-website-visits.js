import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import dynamic from "next/dynamic"; // Import dynamic from next/dynamic

// ----------------------------------------------------------------------

const DynamicChart = dynamic(() => import("../../components/charts/chart"), {
  ssr: false, // Disable server-side rendering
});

const DynamicUseChart = dynamic(() => import("../../components/charts"), {
  ssr: false, // Disable server-side rendering
});

export default function AppWebsiteVisits({
  title,
  subheader,
  chart,
  ...other
}) {
  const [isChartReady, setIsChartReady] = useState(false);
  const [chartOptions, setChartOptions] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // const useChart = ();
      const { labels, colors, series, options } = chart;
      const option = await DynamicUseChart({
        colors,
        plotOptions: {
          bar: {
            columnWidth: "16%",
          },
        },
        fill: {
          type: series.map((i) => i.fill),
        },
        labels,
        xaxis: {
          type: "datetime",
        },
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter: (value) => {
              if (typeof value !== "undefined") {
                return `${value.toFixed(0)} visits`;
              }
              return value;
            },
          },
        },
        ...options,
      });
      setChartOptions(option);
      setIsChartReady(true);
    };

    fetchData();
  }, []);

  if (!isChartReady) return null;

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }}>
        <DynamicChart
          dir="ltr"
          type="line"
          series={chart.series}
          options={chartOptions}
          width="100%"
          height={364}
        />
      </Box>
    </Card>
  );
}

AppWebsiteVisits.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
};
