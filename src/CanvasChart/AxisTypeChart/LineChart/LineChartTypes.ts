import { DataParamType, AxisParamType } from '../AxisTypeChartTypes';

interface LineChartParam {
  node: HTMLElement;
  point?: number;
  font?: string;
  fontHeight: number;
  width?: number;
  height?: number;
}

interface InitializeDataParam {
  series: DataParamType;
  axis: AxisParamType;
}

export { LineChartParam, InitializeDataParam };
