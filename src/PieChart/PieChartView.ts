import PieChart from '.';
import PieChartParam, { defaultChartValue, PieChartData } from './PieChartTypes';
import { UiViewTypes } from '../viewTypes';

import '../style/UiView.scss';

export const pieChartMockData: PieChartData[] = [
  {
    title: {
      text: 'One',
      visible: true,
    },
    value: 9,
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
    value: 17,
    fillColor: '#557FD4',
    hover: {
      chartColor: '#878952',
      fontColor: 'blue',
      fontStyle: 'normal bold 20px serif',
    },
  },
  {
    title: {
      text: 'Three',
      visible: true,
    },
    value: 10,
    fillColor: '#937923',
    hover: {
      chartColor: '#455632',
      fontColor: 'blue',
      fontStyle: 'normal bold 20px serif',
    },
  },
  {
    title: {
      text: 'Four',
      visible: true,
    },
    value: 14,
    fillColor: '#637923',
    hover: {
      chartColor: '#289632',
      fontColor: 'blue',
      fontStyle: 'normal bold 20px serif',
    },
  },
];

export const primaryPieChart: UiViewTypes = {
  chartName: 'primaryPieChart',
  viewPreview: 'preview',
  renderChart: (): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');
    if (canvas) {
      const pieChartParam: PieChartParam = {
        canvas,
        chartType: 'primary',
        data: pieChartMockData,
        totalValue: 50,
        chartSize: 500,
      };
      const pieChart = new PieChart(pieChartParam);
      pieChart.draw();
      pieChart.hoverEvent(false);
    }

    return canvas;
  },
  renderCode: (): string => {
    const code = `
<pre>
  const canvas = document.createElement('canvas');

  if (canvas) {
    const pieChartParam: PieChartParam = {
      canvas,
      chartType: 'primary',
      data: pieChartMockData,
      totalValue: 5,
      chartSize: 500,
    };
    const pieChart = new PieChart(pieChartParam);
    pieChart.draw();
    pieChart.hoverEvent(false);
  }

  return canvas;
</ pre>
    `;

    code.replaceAll(' ', '').replaceAll('  ', '');

    return code;
  },
};

export const donutChart: UiViewTypes = {
  chartName: 'donutChart',
  viewPreview: 'preview',
  renderChart: (): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');

    if (canvas) {
      const pieChartParam: PieChartParam = {
        canvas,
        chartType: 'donut',
        data: pieChartMockData,
        totalValue: 85,
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
  },
  renderCode: (): string => {
    const code = `
<pre>
  const canvas = document.createElement('canvas');

  if (canvas) {
    const pieChartParam: PieChartParam = {
      canvas,
      chartType: 'donut',
      data: pieChartMockData,
      totalValue: 85,
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
</ pre>
    `;

    code.replaceAll(' ', '').replaceAll('  ', '');

    return code;
  },
};
