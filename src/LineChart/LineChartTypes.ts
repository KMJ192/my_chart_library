interface LineChartParam {
  canvas: HTMLCanvasElement;
  minXAxis: number;
  minYAxis: number;
  maxXAxis: number;
  maxYAxis: number;
  unitsPerTickX: number;
  unitsPerTickY: number;
}

interface LineChartData {
  title?: string;
}

export { LineChartParam };
