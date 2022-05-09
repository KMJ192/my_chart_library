import { Properties as CSSProperties } from 'csstype';
import { CanvasParam } from '../types';

// data param
type DataType = number[] | string[] | Date[];

// create param type
interface GraphParam {
  id: string;
  width?: number;
  height?: number;
  font?: string;
  vertexRadius?: number;
}

// axis info types
interface AxisInfo {
  name: string;
  unitsPerTick: number;
  max?: number;
  min?: number;
  padding?: number;
  tickSize?: number;
  lineWidth?: number;
  color?: string;
}

interface XAxisInfo extends AxisInfo {
  data?: string[];
}

interface AxisType {
  leftYAxis: AxisInfo;
  bottomXAxis: XAxisInfo;
  rightYAxis?: AxisInfo;
  topXAxis?: XAxisInfo;
}

interface AxisPosition {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

// series info types
interface SeriesType {
  name: string;
  vertex: DataType;
  color: string;
  lineWidth: number;
}

interface SeriesInfo {
  leftAxisInfo: SeriesType[];
  rightAxisInfo?: SeriesType[];
}

// Graph Object param
interface InitializeParam {
  series: SeriesType[];
  axis: AxisType[];
}

interface RenderOption {
  bottomAxis?: boolean;
  bottomTick?: boolean;
  bottomText?: boolean;
  leftAxis?: boolean;
  leftTick?: boolean;
  leftText?: boolean;
  rightAxis?: boolean;
  rightTick?: boolean;
  rightText?: boolean;
  tooltip?: boolean;
  legend?: boolean;
  guideLine?: boolean;
}

interface LineChartParam {
  width?: number;
  height?: number;
  point?: number;
  font?: string;
  fontHeight?: number;
  canvasStyle?: CSSProperties;
  maxDataLength?: number;
  renderOption: RenderOption;
  tooltipId?: string;
  tooltipStyle?: CSSProperties;
}

export {
  AxisPosition,
  GraphParam,
  AxisType,
  SeriesType,
  DataType,
  InitializeParam,
  RenderOption,
  LineChartParam,
  SeriesInfo,
};
