import PieChart from '.';
import PieChartParam, { defaultChartValue, PieChartData } from './PieChartTypes';

import '../style/UiView.scss';

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
      fontColor: 'red',
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

export function renderPieChart(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  if (canvas) {
    const pieChartParam: PieChartParam = {
      canvas,
      chartType: 'donut',
      data: pieChartMockData,
      totalValue: 6,
      chartSize: 500,
      displayValue: {
        visible: true,
        style: 'normal bold 20px serif',
        color: defaultChartValue.FONT_COLOR,
      },
    };
    const pieChart = new PieChart(pieChartParam);
    pieChart.draw();
    pieChart.hoverEvent(false);
  }

  return canvas;
}

export function renderPieChartCode(): string {
  const code = `
    const canvas = document.createElement('canvas');

    if (canvas) {
      const pieChartParam: PieChartParam = {
        canvas,
        chartType: 'donut',
        data: pieChartMockData,
        totalValue: 6,
        chartSize: 500,
        displayValue: {
          visible: true,
          style: 'normal bold 20px serif',
          color: 'black',
        },
      };
      const pieChart = new PieChart(pieChartParam);
      pieChart.draw();
      pieChart.hoverEvent(false);
    }
  `;

  return code;
}
