import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { fNumber } from "../../utils/format-number";
import { Chart, useChart } from "../../components/charts"; // Update import

// ----------------------------------------------------------------------

export default function AppConversionRates({
  title,
  subheader,
  chart,
  ...other
}) {
  const { colors, series, options } = chart;
  const [dynamicChart, setDynamicChart] = useState(null); // State to hold dynamically imported Chart component

  useEffect(() => {
    // Dynamically import Chart component
    import("../../components/charts").then((mod) => {
      setDynamicChart(mod.Chart);
    });
  }, []);

  const chartSeries = series.map((i) => i.value);

  const chartOptions = useChart({
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
  });

  if (!dynamicChart) return null; // Render null if Chart component is not loaded yet

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ mx: 3 }}>
        <dynamicChart
          dir="ltr"
          type="bar"
          series={[{ data: chartSeries }]}
          options={chartOptions}
          width="100%"
          height={364}
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
