import { UiViewTypes } from '../viewTypes';

import '../style/UiView.scss';
import LineChart from '.';
import { LineChartParam } from './LineChartTypes';

const lineChartMockData = [];

export const primaryLineChart: UiViewTypes = {
  chartName: 'primaryLineChart',
  viewPreview: 'preview',
  renderChart: (): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');
    const param: LineChartParam = {
      canvas,
      minXAxis: 0,
      minYAxis: 0,
      maxXAxis: 140,
      maxYAxis: 100,
      unitsPerTickX: 10,
      unitsPerTickY: 10,
    };
    const lineChart = new LineChart(param);
    lineChart.draw();

    return canvas;
  },
  renderCode: (): string => {
    return '';
  },
};
