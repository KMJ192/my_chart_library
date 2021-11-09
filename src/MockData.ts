import { PieChartData } from './PieChart/PieChartTypes';

export const pieChartMockData: PieChartData[] = [
  {
    title: {
      text: 'One',
      visible: true,
    },
    value: 1,
    fillColor: '#56A8D4',
    hover: {
      chartColor: '#298394',
      fontColor: 'blue',
      fontStyle: 'normal bold 20px serif',
    },
  },
  {
    title: {
      text: 'Two',
      visible: true,
    },
    value: 2,
    fillColor: '#557FD4',
    hover: {
      chartColor: '#878952',
      fontColor: 'blue',
      fontStyle: 'normal bold 20px serif',
    },
  },
];
