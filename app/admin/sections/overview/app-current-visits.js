import PropTypes from "prop-types";
import { styled, useTheme } from "@mui/material/styles";
import { Card } from "@mui/material";
import { CardHeader } from "@mui/material";
import dynamic from "next/dynamic"; // Import dynamic from next/dynamic

const CHART_HEIGHT = 400;
const LEGEND_HEIGHT = 72;

// Dynamically import Chart and useChart from the components directory
const DynamicChart = dynamic(() => import("../../components/charts/chart"), {
  ssr: false, // Disable server-side rendering
});

const DynamicUseChart = dynamic(
  () => import("../../components/charts/use-chart"),
  {
    ssr: false, // Disable server-side rendering
  }
);

const StyledChart = styled(DynamicChart)(({ theme }) => ({
  height: CHART_HEIGHT,
  "& .apexcharts-canvas, .apexcharts-inner, svg, foreignObject": {
    height: `100% !important`,
  },
  "& .apexcharts-legend": {
    height: LEGEND_HEIGHT,
    borderTop: `dashed 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

function AppCurrentVisits({ title, subheader, chart, ...other }) {
  const theme = useTheme();
  const { colors, series, options } = chart;
  const chartSeries = series.map((i) => i.value);

  const useChart = DynamicUseChart; // Extract default export from dynamic import

  const chartOptions = useChart({
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    colors,
    labels: series.map((i) => i.label),
    stroke: {
      colors: [theme.palette.background.paper],
    },
    legend: {
      floating: true,
      position: "bottom",
      horizontalAlign: "center",
    },
    dataLabels: {
      enabled: true,
      dropShadow: {
        enabled: false,
      },
    },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (value) => fNumber(value),
        title: {
          formatter: (seriesName) => `${seriesName}`,
        },
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: false,
          },
        },
      },
    },
    ...options,
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 5 }} />
      <StyledChart
        dir="ltr"
        type="pie"
        series={chartSeries}
        options={chartOptions}
        width="100%"
        height={280}
      />
    </Card>
  );
}

AppCurrentVisits.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
};

export { AppCurrentVisits };
