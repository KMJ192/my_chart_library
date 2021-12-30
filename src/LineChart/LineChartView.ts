import { UiViewTypes } from '../viewTypes';

import '../style/UiView.scss';
import LineChart from '.';
import { LineChartParam } from './LineChartTypes';

const lineChartMockData = {
  title: 'LineChart',
  tooltip: true,
  data: [
    {
      x: 0,
      y: 0,
    },
    {
      x: 20,
      y: 10,
    },
    {
      x: 40,
      y: 15,
    },
    {
      x: 60,
      y: 40,
    },
    {
      x: 80,
      y: 60,
    },
    {
      x: 100,
      y: 50,
    },
    {
      x: 120,
      y: 85,
    },
    {
      x: 140,
      y: 100,
    },
    {
      x: 170,
      y: 100,
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
      unitsPerTickX: 10,
      unitsPerTickY: 10,
      width: 1000,
      height: 400,
      data: lineChartMockData,
    };
    const lineChart = new LineChart(param);
    lineChart.draw();

    return canvas;
  },
  renderCode: (): string => {
    return '';
  },
};
