import ReactApexChart from 'react-apexcharts';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
//

// ----------------------------------------------------------------------

const CHART_HEIGHT = 392;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(2),
  '& .apexcharts-canvas svg': {
    height: CHART_HEIGHT
  },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible'
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
  }
}));

// ----------------------------------------------------------------------

const CHART_DATA = [44, 55, 13, 43];
export default function AppCurrentSubject() {
  const theme = useTheme();

  const chartOptions = {
    chart: {
      width: 800,
      type: 'pie'
    },
    labels: ['FollowUp', 'Retained', 'Not_Interested', 'Decision_Pending'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
            height: 500
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ]
  };

  return (
    <Card>
      <CardHeader title="Retained ~ Prospects" />
      <ChartWrapperStyle style={{ height: '420px' }} dir="ltr">
        <ReactApexChart
          options={chartOptions}
          series={CHART_DATA}
          type="pie"
          height={800}
          width={800}
        />
      </ChartWrapperStyle>
    </Card>
  );
}
