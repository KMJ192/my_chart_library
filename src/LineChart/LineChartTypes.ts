interface DataType {
  line_x: number;
  line_y: number;
}

interface LineChartData {
  title?: string;
  tooltip?: boolean;
  xAxisSelector?: string;
  yAxisSelector?: string;
  lineDataSelector?: string;
  barDataSelector?: string;
  data: DataType[] | Array<any>;
}

interface LineChartParam {
  canvas: HTMLCanvasElement;
  width?: number;
  height?: number;
  minXAxis?: number;
  minYAxis?: number;
  maxXAxis?: number;
  maxYAxis?: number;
  unitsPerTickX?: number;
  unitsPerTickY?: number;
  axisColor?: string;
  pointRadius?: number;
  data?: LineChartData;
}

interface DrawParam {
  drawXAxis?: boolean;
  drawXValue?: boolean;
  drawXTick?: boolean;
  drawYAxis?: boolean;
  drawYValue?: boolean;
  drawYTick?: boolean;
}

export { LineChartParam, LineChartData, DataType, DrawParam };
