export default interface PieChartParam {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  data: PieChartData[];
  chartFillColor?: string;
  pieChartBorder: string;
  centerText: {
    visible: boolean;
    text?: string;
  };
  totalValue?: number;
}

export interface PieChartData {
  title?: string;
  value: number;
  color: string;
}

export interface PieChartElement extends PieChartData {
  angleValue: number;
}

export interface EachDataAreaType {
  title?: string;
  startEndDegree: number;
}
