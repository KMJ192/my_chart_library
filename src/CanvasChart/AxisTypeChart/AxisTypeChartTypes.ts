interface Series {
  name: string;
  series: number[];
}

interface SeriesType extends Series {
  color: string;
  lineWidth: number;
}

interface SeriesParamType extends Series {
  color?: string;
  lineWidth?: number;
}

interface Axis {
  left: number;
}

interface AxisType extends Axis {
  bottom: number;
  right: number;
}

interface AxisParamType extends Axis {
  bottom?: number;
  right?: number;
}

interface DataType {
  left: SeriesType[];
  bottom: SeriesType[];
  right: SeriesType[];
}

interface DataParamType {
  left: SeriesParamType[];
  bottom?: SeriesParamType[];
  right?: SeriesParamType[];
}

interface AxisInfo {
  name: string;
  unitsPerTick: number;
  max: number;
  min: number;
  padding: number;
  tickSize: number;
  tickColor: string;
  lineWidth: number;
  value: number[];
  color: string;
}

interface BottomAxisInfo extends AxisInfo {
  data: number[] | string[];
}

interface AxisParamInfo {
  name?: string;
  unitsPerTick?: number;
  max?: number;
  min?: number;
  padding?: number;
  tickSize?: number;
  tickColor?: string;
  lineWidth?: number;
  value?: number[];
  color?: string;
}

interface BottomAxisParamInfo extends AxisParamInfo {
  data?: number[] | string[];
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

export {
  Series,
  SeriesType,
  SeriesParamType,
  Axis,
  AxisType,
  AxisParamType,
  DataType,
  DataParamType,
  AxisInfo,
  AxisParamInfo,
  BottomAxisInfo,
  BottomAxisParamInfo,
  RenderOption,
};
