interface DataType {
  x: number;
  y: number;
}

interface LineChartData {
  title?: string;
  tooltip?: boolean;
  data: DataType[];
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
  data?: LineChartData;
}

export { LineChartParam, LineChartData, DataType };
