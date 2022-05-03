import { CanvasParam } from '../types';

interface GraphParam {
  id: string;
  width?: number;
  height?: number;
  font?: string;
  vertexRadius?: number;
}

interface AxisInfo {
  name: string;
  unitsPerTick: number;
  max: number;
  min: number;
  padding: number;
  tickSize: number;
  lineWidth: number;
  color: string;
}

interface AxisType {
  yAxisLeft: AxisInfo;
  yAxisRight: AxisInfo;
  xAxisBottom: AxisInfo;
  xAxisTop: AxisInfo;
}

interface Series {
  name: string;
  vertex: DataType;
  color: string;
  lineWidth: number;
}

type DataType = number[] | string[] | Date[];

interface InitializeParam {
  series: Series;
  axis: AxisType;
}

export { GraphParam, AxisType, Series, DataType };
