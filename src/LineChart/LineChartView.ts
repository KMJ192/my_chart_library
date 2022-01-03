import { UiViewTypes } from '../viewTypes';

import LineChart from './LineChart';
import { LineChartParam, DrawParam } from './LineChartTypes';

import '../style/UiView.scss';

const lineChartMockData = {
  title: 'LineChart',
  tooltip: true,
  data: [
    {
      lineX: 0,
      lineY: 0,
      bar_value: 10,
    },
    {
      lineX: 1,
      lineY: 1,
      bar_value: 50,
    },
    {
      lineX: 2,
      lineY: 2,
      bar_value: 30,
    },
    {
      lineX: 3,
      lineY: 4,
      bar_value: 20,
    },
    {
      lineX: 4,
      lineY: 6,
      bar_value: 40,
    },
    {
      lineX: 5,
      lineY: 5,
      bar_value: 90,
    },
    {
      lineX: 6,
      lineY: 8,
      bar_value: 110,
    },
    {
      lineX: 7,
      lineY: 1,
      bar_value: 85,
    },
    {
      lineX: 8,
      lineY: 10,
      bar_value: 100,
    },
    {
      lineX: 9,
      lineY: 13,
      bar_value: 100,
    },
    {
      lineX: 10,
      lineY: 16,
      bar_value: 100,
    },
    {
      lineX: 11,
      lineY: 17,
      bar_value: 100,
    },
    {
      lineX: 12,
      lineY: 21,
      bar_value: 100,
    },
    {
      lineX: 13,
      lineY: 23,
      bar_value: 100,
    },
    {
      lineX: 14,
      lineY: 20,
      bar_value: 100,
    },
    {
      lineX: 15,
      lineY: 13,
      bar_value: 100,
    },
    {
      lineX: 16,
      lineY: 15,
      bar_value: 100,
    },
    {
      lineX: 17,
      lineY: 17,
      bar_value: 100,
    },
    {
      lineX: 18,
      lineY: 14,
      bar_value: 100,
    },
    {
      lineX: 19,
      lineY: 13,
      bar_value: 100,
    },
    {
      lineX: 20,
      lineY: 16,
      bar_value: 100,
    },
    {
      lineX: 21,
      lineY: 21,
      bar_value: 100,
    },
    {
      lineX: 22,
      lineY: 22,
      bar_value: 100,
    },
    {
      lineX: 23,
      lineY: 23,
      bar_value: 100,
    },
  ],
};

export const primaryLineChart: UiViewTypes = {
  chartName: 'primaryLineChart',
  viewPreview: 'preview',
  renderChart: (): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');
    const param: LineChartParam = {
      canvas,
      unitsPerTickX: 1,
      unitsPerTickY: 1,
      width: 1000,
      height: 470,
      axisColor: '#555',
      data: lineChartMockData,
    };
    const lineChart = new LineChart(param);

    const draw: DrawParam = {
      drawXAxis: true,
      drawXValue: true,
      drawXTick: true,
      drawYAxis: true,
      drawYValue: true,
      drawYTick: true,
    };
    lineChart.draw(draw);

    return canvas;
  },
  renderCode: (): string => {
    return '';
  },
};
