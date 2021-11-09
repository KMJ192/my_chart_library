export default interface PieChartParam {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  chartType?: 'primary' | 'donut';
  data: PieChartData[];
  chartFillColor?: string;
  chartSize?: number;
  totalValue?: number;
}

interface DataTitle {
  text: string;
  visible?: boolean;
  color?: string;
  style?: string;
}

interface HoverType {
  chartColor: string;
  fontColor?: string;
  fontStyle?: string;
}

interface PieChartData {
  title?: DataTitle;
  value: number;
  fillColor: string;
  hover?: HoverType;
}

interface PieChartElement extends PieChartData {
  angleValue: number;
}

interface EachDataAreaType {
  title?: DataTitle;
  startEndDegree: number;
  hover?: HoverType;
}

interface PieChartType {
  readonly PRIMARY: string;
  readonly DONUT: string;
}

const pieChartType: PieChartType = {
  PRIMARY: 'primary',
  DONUT: 'donut',
};

interface DefaultChartValue {
  readonly CHART_COLOR: string;
  readonly HOVER_CHART_COLOR: string;
  readonly FONT_STYLE: string;
  readonly FONT_COLOR: string;
}

const defaultChartValue: DefaultChartValue = {
  CHART_COLOR: 'rgb(230, 230, 230)',
  HOVER_CHART_COLOR: '#BAAAD7',
  FONT_STYLE: 'normal bold 15px serif',
  FONT_COLOR: 'black',
};

interface PieChartEvent {
  result1: boolean;
  result2: boolean;
  index: number;
  degree: number;
}

export {
  DataTitle,
  PieChartData,
  PieChartElement,
  EachDataAreaType,
  PieChartType,
  DefaultChartValue,
  PieChartEvent,
  pieChartType,
  defaultChartValue,
};
