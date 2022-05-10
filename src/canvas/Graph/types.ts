import { Properties as CSSProperties } from 'csstype';
import { CanvasParam } from '@src/canvas/types';
import { AxisInfo } from '@src/canvas/Graph/Unit/Axis/types';

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
  axis: AxisInfo[];
}

// Graph render options
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
  GraphParam,
  SeriesType,
  DataType,
  InitializeParam,
  RenderOption,
  LineChartParam,
  SeriesInfo,
};
