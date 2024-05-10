import PropTypes from "prop-types";
import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { fNumber } from "../../utils/format-number";
import dynamic from "next/dynamic";

// ----------------------------------------------------------------------

const DynamicChart = dynamic(() => import("../../components/charts"), {
  loading: () => <div>Loading Chart...</div>, // Placeholder while the Chart is loading
  ssr: false, // Disable server-side rendering
});

export default function AppConversionRates({
  title,
  subheader,
  chart,
  ...other
}) {
  const { colors, series, options } = chart;
  const [isChartReady, setIsChartReady] = useState(false);

  const handleChartLoad = () => {
    setIsChartReady(true);
  };

  const chartSeries = series.map((i) => i.value);

  const chartOptions = {
    colors,
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (value) => fNumber(value),
        title: {
          formatter: () => "",
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "28%",
        borderRadius: 2,
      },
    },
    xaxis: {
      categories: series.map((i) => i.label),
    },
    ...options,
  };

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ mx: 3 }}>
        <DynamicChart
          dir="ltr"
          type="bar"
          series={[{ data: chartSeries }]}
          options={chartOptions}
          width="100%"
          height={364}
          onLoad={handleChartLoad}
          style={{ display: isChartReady ? "block" : "none" }} // Hide the chart until it's loaded
        />
      </Box>
    </Card>
  );
}

AppConversionRates.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
};
