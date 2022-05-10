// axis info types
interface AxisType {
  name: string;
  unitsPerTick: number;
  max?: number;
  min?: number;
  padding?: number;
  tickSize?: number;
  lineWidth?: number;
  color?: string;
}

interface XAxisType extends AxisType {
  labels?: string[];
}

interface AxisInfo {
  leftYAxis: AxisType;
  bottomXAxis: XAxisType;
  rightYAxis?: AxisType;
  topXAxis?: XAxisType;
}

interface AxisPosition {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export { AxisPosition, AxisInfo };
