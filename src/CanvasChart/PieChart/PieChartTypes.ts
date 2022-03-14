export default interface PieChartParam {
  canvas: HTMLCanvasElement;
  chartType?: 'primary' | 'donut';
  data: PieChartData[];
  chartFillColor?: string;
  chartSize?: number;
  totalValue?: number;
  displayValue?: {
    visible?: boolean;
    color?: string;
    style?: string;
  };
}

export interface TextType {
  text: any | any[];
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
  title?: TextType;
  value: number;
  fillColor: string;
  hover?: HoverType;
}

interface PieChartElement extends PieChartData {
  angleValue: number;
}

interface EachDataAreaType {
  title?: TextType;
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
  readonly CHART_SIZE: number;
}

const defaultChartValue: DefaultChartValue = {
  CHART_COLOR: 'rgb(230, 230, 230)',
  HOVER_CHART_COLOR: '#BAAAD7',
  FONT_STYLE: 'normal bold 15px serif',
  FONT_COLOR: 'black',
  CHART_SIZE: 500,
};

interface PieChartEvent {
  result1: boolean;
  result2: boolean;
  index: number;
  degree: number;
}

export {
  TextType as DataTitle,
  PieChartData,
  PieChartElement,
  EachDataAreaType,
  PieChartType,
  DefaultChartValue,
  PieChartEvent,
  pieChartType,
  defaultChartValue,
};
