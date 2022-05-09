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
  xAxisTop: AxisInfo;
  xAxisBottom: AxisInfo;
}

interface AxisPosition {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

// series info types
interface Series {
  name: string;
  vertex: DataType;
  color: string;
  lineWidth: number;
}

// data initialize param
interface InitializeParam {
  series: Series[];
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
  Series,
  DataType,
  InitializeParam,
  RenderOption,
  LineChartParam,
};
