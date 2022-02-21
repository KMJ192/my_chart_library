import { DataParamType, AxisParamType } from '../AxisTypeChartTypes';

interface LineChartParam {
  node: HTMLElement;
  series: DataParamType;
  axis: AxisParamType;
  dataLength: number;
  width?: number;
  height?: number;
}

export { LineChartParam };
