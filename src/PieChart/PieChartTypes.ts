export default interface PieChartParam {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  chartType?: 'primary' | 'donut';
  data: PieChartData[];
  chartFillColor?: string;
  pieChartBorder: string;
  centerText: {
    visible: boolean;
    text?: string;
    style?: string;
    colot?: string;
  };
  totalValue?: number;
}

interface DataTitle {
  text: string;
  visible?: boolean;
  color?: string;
  style?: string;
}

interface PieChartData {
  title?: DataTitle;
  value: number;
  fillColor: string;
}

interface PieChartElement extends PieChartData {
  angleValue: number;
}

interface EachDataAreaType {
  title?: DataTitle;
  startEndDegree: number;
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
  readonly FONT_STYLE: string;
  readonly TEXT_COLOR: string;
}

const defaultChartValue: DefaultChartValue = {
  CHART_COLOR: 'rgb(230, 230, 230)',
  FONT_STYLE: 'normal bold 15px serif',
  TEXT_COLOR: 'black',
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
