import CanvasChart from '../CanvasChart';
import * as CanvasChartTypes from '../CanvasChartTypes';
import * as AxisChartType from './AxisTypeChartTypes';

class AxisTypeChart extends CanvasChart {
  protected series: AxisChartType.SeriesDataType;

  protected axis: AxisChartType.AxisType;

  protected pointRadius: number;

  protected font: string;

  protected fontHeight: number;

  protected range: AxisChartType.AxisPositionType<number>;

  protected ticks: AxisChartType.AxisPositionType<number>;

  protected scale: number;

  protected startPoint: AxisChartType.AxisPositionType<CanvasChartTypes.Vector>;

  protected area: {
    start: CanvasChartTypes.Vector;
    end: CanvasChartTypes.Vector;
  };

  protected elementArea: AxisChartType.AxisPositionType<number>;

  protected middlePosition: number;

  protected renderOption: AxisChartType.RenderOption;

  protected dataLength: number;

  constructor({
    node,
    canvasLayer,
    width,
    series,
    axis,
    height,
    point,
    font,
    fontHeight,
    dataLength,
  }: AxisChartType.AxisTypeChartParam) {
    super({ node, width, height, canvasLayer });

    this.dataLength = dataLength;

    this.series = {
      left: [],
      bottom: [],
      right: [],
    };

    series.left.forEach(
      (series: AxisChartType.SeriesParamType, idx: number) => {
        this.series.left[idx] = {
          name: series.name,
          series: series.series,
          color: series.color || this.defaultValue.color,
          lineWidth: series.lineWidth || 1,
        };
      },
    );

    series.bottom?.forEach(
      (series: AxisChartType.SeriesParamType, idx: number) => {
        this.series.bottom[idx] = {
          name: series.name,
          series: series.series,
          color: series.color || this.defaultValue.color,
          lineWidth: series.lineWidth || 1,
        };
      },
    );

    series.right?.forEach(
      (series: AxisChartType.SeriesParamType, idx: number) => {
        this.series.right[idx] = {
          name: series.name,
          series: series.series,
          color: series.color || this.defaultValue.color,
          lineWidth: series.lineWidth || 1,
        };
      },
    );

    this.axis = {
      left: {
        name: axis.left.name || '',
        unitsPerTick: axis.left.unitsPerTick || 1,
        max: axis.left.max || 0,
        min: axis.left.min || 0,
        padding: axis.left.padding || this.defaultValue.padding,
        tickSize: axis.left.tickSize || 0,
        tickColor: axis.left.tickColor || this.defaultValue.color,
        lineWidth: axis.left.lineWidth || 1,
        color: axis.left.color || this.defaultValue.color,
      },
      bottom: {
        name: axis.bottom.name || '',
        unitsPerTick: axis.bottom.unitsPerTick || 1,
        max: axis.bottom.max || 0,
        min: axis.bottom.min || 0,
        padding: axis.bottom.padding || this.defaultValue.padding,
        tickSize: axis.bottom.tickSize || 0,
        tickColor: axis.bottom.tickColor || this.defaultValue.color,
        lineWidth: axis.bottom.lineWidth || 1,
        color: axis.bottom.color || this.defaultValue.color,
        data: axis.bottom.data || [],
      },
      right: {
        name: axis.right?.name || '',
        unitsPerTick: axis.right?.unitsPerTick || 1,
        max: axis.right?.max || 0,
        min: axis.right?.min || 0,
        padding: axis.right?.padding || this.defaultValue.padding,
        tickSize: axis.right?.tickSize || 0,
        tickColor: axis.right?.tickColor || this.defaultValue.color,
        lineWidth: axis.right?.lineWidth || 1,
        color: axis.right?.color || this.defaultValue.color,
      },
    };

    this.pointRadius = point || this.defaultValue.pointRadius;

    this.font = font || this.defaultValue.font;

    this.fontHeight = fontHeight || this.defaultValue.fontHeight;

    this.range = {
      bottom: 0,
      left: 0,
      right: 0,
    };

    this.ticks = {
      bottom: 0,
      left: 0,
      right: 0,
    };

    this.scale = 0;

    this.startPoint = {
      bottom: {
        x: 0,
        y: 0,
      },
      left: {
        x: 0,
        y: 0,
      },
      right: {
        x: 0,
        y: 0,
      },
    };

    this.area = {
      start: {
        x: 0,
        y: 0,
      },
      end: {
        x: 0,
        y: 0,
      },
    };

    this.elementArea = {
      bottom: 0,
      left: 0,
      right: 0,
    };

    this.middlePosition = 0;

    this.renderOption = {
      bottomAxis: true,
      bottomTick: true,
      bottomText: true,
      leftAxis: true,
      leftTick: true,
      leftText: true,
      rightAxis: true,
      rightTick: true,
      rightText: true,
      tooltip: true,
      legend: true,
      guideLine: true,
    };
  }

  /**
   * axis 최대, 최소값 설정
   */
  protected calcMax() {
    const { axis, series } = this;

    // x축 (axis.bottom)의 max값 설정
    if (axis.bottom.max !== 0 && axis.bottom.data.length > 0) {
      axis.bottom.max = axis.bottom.data.length - 1;
    }

    // left y축 max값 설정
    series.left.forEach((datas: AxisChartType.SeriesType) => {
      const { series } = datas;
      axis.left.max = Math.max(axis.left.max as number, ...series);
    });

    if (axis.right === undefined || series.right === undefined) return;

    // right y축 max값 설정
    series.right.forEach((datas: AxisChartType.SeriesType) => {
      const { series } = datas;
      if (axis.right !== undefined) {
        axis.right.max = Math.max(axis.right.max as number, ...series);
      }
    });
  }

  /**
   * 그래프 비율 계산
   */
  private calcRelation() {
    if (this.axis === undefined) return;
    const {
      canvasLayer,
      mainChartIdx,
      axis,
      range,
      ticks,
      startPoint,
      fontHeight,
      defaultValue,
    } = this;
    const { canvas } = canvasLayer[mainChartIdx];

    // bottom y축 범위 계산
    const bottomMax = axis.bottom.max;
    const bottomMin = axis.bottom.min;
    range.bottom = bottomMax - bottomMin;

    // left y축 범위 계산
    const leftMax = axis.left.max;
    const leftMin = axis.left.min;
    range.left = leftMax - leftMin;

    const leftMode = range.left % axis.left.unitsPerTick;
    if (leftMode !== 0) {
      axis.left.max += axis.left.unitsPerTick - leftMode;
      range.left = axis.left.max - leftMin;
    }

    // right y축 범위 계산
    const rightMax = axis.right.max;
    const rightMin = axis.right.min;
    range.right = rightMax - rightMin;

    const rightMod = range.right % axis.right.unitsPerTick;
    if (rightMod !== 0) {
      axis.right.max += axis.right.unitsPerTick - rightMod;
      range.right = axis.right.max - rightMin;
    }

    // tick 갯수 계산
    ticks.bottom = Math.round(range.bottom / axis.bottom.unitsPerTick);
    ticks.left = Math.round(range.left / axis.left.unitsPerTick);
    ticks.right = Math.round(range.right / axis.right.unitsPerTick);

    // 축 시작점 계산
    startPoint.bottom.x =
      axis.left.padding * 2 + axis.left.tickSize + defaultValue.place;

    // 축 width, height 계산
    this.width =
      canvas.width -
      startPoint.bottom.x -
      axis.left.padding * 2 -
      axis.right.padding * 2 -
      axis.left.tickSize -
      axis.right.tickSize;
    this.height =
      canvas.height -
      startPoint.bottom.x -
      axis.bottom.padding -
      fontHeight -
      axis.bottom.tickSize;

    // 축 시작점 계산
    startPoint.bottom.y = axis.left.padding * 2 + this.height;
    startPoint.left = {
      x: startPoint.bottom.x,
      y: startPoint.bottom.y,
    };

    startPoint.right = {
      x: startPoint.left.x + this.width,
      y: startPoint.left.y,
    };

    this.area = {
      start: {
        x: startPoint.bottom.x,
        y: startPoint.bottom.y,
      },
      end: {
        x: startPoint.bottom.x + this.width,
        y: startPoint.bottom.y - this.height,
      },
    };

    this.scale = this.width / this.range.bottom;

    this.elementArea = {
      bottom: (this.area.end.x - this.area.start.x) / this.range.bottom,
      left: (this.area.start.y - this.area.end.y) / this.range.left,
      right: (this.area.start.y - this.area.end.y) / this.range.right,
    };

    this.middlePosition = Math.floor(
      this.area.start.x + (this.area.end.x - this.area.start.x) / 2,
    );
  }
}

export default AxisTypeChart;
