import AxisTypeChart from '@src/CanvasChart/AxisTypeChart';
import * as CanvasChartType from '@src/CanvasChart/CanvasChartTypes';
import * as LineChartType from './LineChartTypes';

class LineChart extends AxisTypeChart {
  constructor({
    node,
    series,
    axis,
    width,
    height,
    dataLength,
  }: LineChartType.LineChartParam) {
    const canvasLayer: CanvasChartType.CanvasLayer[] = [
      {
        type: 'animation',
        id: 'guide-line',
        canvasStyle: {},
      },
      {
        type: 'main',
        id: 'data-graph',
        canvasStyle: {},
      },
      {
        type: 'static',
        id: 'line-expression',
        canvasStyle: {},
      },
    ];
    width = width || 1800;
    height = height || 700;
    super({ node, series, axis, width, height, canvasLayer, dataLength });
  }
}

export default LineChart;
