import AxisTypeChart from '@src/CanvasChart/AxisTypeChart';

class LineChart extends AxisTypeChart {
  protected tooltip: HTMLElement | null;

  protected tooltipTemplate: string;

  protected legend: HTMLElement | null;

  constructor() {}
}

export default LineChart;
