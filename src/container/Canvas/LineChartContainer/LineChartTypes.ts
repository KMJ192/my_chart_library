import { ObjectType } from '@src/types';

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
  canvasStyle?: ObjectType;
  maxDataLength?: number;
  renderOption: RenderOption;
  tooltipId?: string;
  tooltipStyle?: {
    [key: string]: string;
  };
}

export { LineChartParam };
