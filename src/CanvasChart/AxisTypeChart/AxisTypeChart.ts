import { throttle } from 'lodash';
import { crispPixel } from '@src/untils';

import CanvasChart from '../CanvasChart';
import * as CanvasChartTypes from '../CanvasChartTypes';
import * as AxisChartType from './AxisTypeChartTypes';

class AxisTypeChart extends CanvasChart {
  protected series: AxisChartType.SeriesDataType | null;

  protected axis: AxisChartType.AxisType | null;

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

  protected createdNode: {
    legend: boolean;
    tooltip: boolean;
  };

  constructor({
    node,
    canvasLayer,
    width,
    height,
    font,
    fontHeight,
  }: AxisChartType.AxisTypeChartParam) {
    super({ node, width, height, canvasLayer });

    this.series = null;

    this.axis = null;

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

    this.legend = null;

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

    this.createdNode = {
      legend: false,
      tooltip: false,
    };

    this.tooltipTemplate = null;
  }

  /**
   * axis 최대, 최소값 설정
   */
  protected calcMax() {
    const { axis, series } = this;
    if (axis === null || series === null) return;

    // x축 (axis.bottom)의 max값 설정
    if (axis.bottom.max === 0 && axis.bottom.data.length > 0) {
      axis.bottom.max = axis.bottom.data.length - 1;
    }

    // left y축 max값 설정
    series.left.forEach((datas: AxisChartType.SeriesType) => {
      const { series } = datas;
      axis.left.max = Math.max(axis.left.max as number, ...series);
    });

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
  protected calcRelation() {
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
    if (axis === null) return;
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
      bottom: Math.floor(
        (this.area.end.x - this.area.start.x) / this.range.bottom,
      ),
      left: Math.floor((this.area.start.y - this.area.end.y) / this.range.left),
      right: Math.floor(
        (this.area.start.y - this.area.end.y) / this.range.right,
      ),
    };

    this.middlePosition = Math.floor(
      this.area.start.x + (this.area.end.x - this.area.start.x) / 2,
    );
  }

  /**
   * draw x축, y축
   */
  protected drawAxis() {
    if (this.renderOption.bottomAxis === false) return;
    const {
      canvasLayer,
      width,
      height,
      axis,
      startPoint,
      mainChartIdx,
      renderOption,
      defaultValue,
    } = this;
    const { ctx } = canvasLayer[mainChartIdx];
    if (ctx === null || axis === null) return;
    ctx.save();
    // x축 그리기
    let lineWidth = 1;
    let xPoint = 0;
    let yPoint = 0;
    if (renderOption.bottomAxis) {
      lineWidth = axis.bottom.lineWidth || defaultValue.lineWidth;
      xPoint = startPoint.bottom.x;
      yPoint = crispPixel(startPoint.bottom.y, lineWidth);
      ctx.strokeStyle = axis.bottom.color || defaultValue.color;
      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      ctx.moveTo(xPoint, yPoint);
      ctx.lineTo(xPoint + width, yPoint);
      ctx.stroke();
      ctx.closePath();
    }

    // left y축 그리기
    if (renderOption.leftAxis) {
      lineWidth = axis.left.lineWidth || defaultValue.lineWidth;
      xPoint = crispPixel(startPoint.left.x, lineWidth);
      yPoint = startPoint.left.y;
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = axis.left.color || defaultValue.color;
      ctx.beginPath();
      ctx.moveTo(xPoint, yPoint);
      ctx.lineTo(xPoint, yPoint - height);
      ctx.stroke();
      ctx.closePath();
    }

    // right y축 그리기
    if (renderOption.rightAxis) {
      lineWidth = axis.right.lineWidth || defaultValue.lineWidth;
      xPoint = crispPixel(startPoint.right.x, lineWidth);
      yPoint = startPoint.right.y;
      ctx.strokeStyle = axis.right.color || defaultValue.color;
      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      ctx.moveTo(xPoint, yPoint - height);
      ctx.lineTo(xPoint, yPoint);
      ctx.stroke();
      ctx.closePath();
    }

    ctx.restore();
  }

  /**
   * draw x축 tick, text
   */
  protected drawBottomTickAndText() {
    if (
      this.renderOption.bottomTick === false &&
      this.renderOption.bottomText === false
    )
      return;
    const {
      canvasLayer,
      width,
      axis,
      ticks,
      font,
      startPoint,
      fontHeight,
      mainChartIdx,
      defaultValue,
      renderOption,
    } = this;
    const { ctx } = canvasLayer[mainChartIdx];
    if (ctx === null || axis === null) return;

    ctx.save();

    const tickSize = axis.bottom.tickSize || 0;
    const tick = ticks.bottom || 0;

    ctx.beginPath();
    const lineWidth = axis.bottom.lineWidth || defaultValue.lineWidth;
    if (renderOption.bottomTick) {
      const xPoint = crispPixel(startPoint.bottom.x, lineWidth);
      const yPoint = startPoint.bottom.y;

      ctx.strokeStyle = axis.bottom.color || defaultValue.color;
      ctx.lineWidth = axis.bottom.lineWidth || defaultValue.lineWidth;
      ctx.moveTo(xPoint, yPoint);
      ctx.lineTo(xPoint, yPoint + tickSize);
      ctx.stroke();
    }

    const value =
      axis.bottom.data && axis.bottom.data.length > 0
        ? String(axis.bottom.data[0])
        : '0';

    // x축 data배열이 없다면 채워준다
    if (axis.bottom.data === undefined) {
      axis.bottom.data = [value];
    } else if (axis.bottom.data.length === 0) {
      (axis.bottom.data as string[])[0] = value;
    }

    if (renderOption.bottomText) {
      ctx.font = font;
      ctx.fillStyle = axis.bottom.color || defaultValue.color;
      ctx.fillText(
        value,
        startPoint.bottom.x - ctx.measureText('0').width / 2,
        startPoint.bottom.y + tickSize + fontHeight,
      );
    }
    ctx.closePath();

    for (let i = 0; i < tick; i++) {
      const xPoint = crispPixel(
        ((i + 1) * width) / tick + startPoint.bottom.x,
        lineWidth,
      );
      const yPoint = startPoint.bottom.y;

      ctx.beginPath();

      if (renderOption.bottomTick) {
        ctx.moveTo(xPoint, yPoint);
        ctx.lineTo(xPoint, yPoint + tickSize);
        ctx.stroke();
      }
      const value: string = axis.bottom.data
        ? String(axis.bottom.data[i + 1])
        : String(
            (i + 1) * (axis.bottom.unitsPerTick || defaultValue.unitsPerTick),
          );

      if (axis.bottom.data.length === 0) {
        // x축 data배열이 없다면 채워준다
        (axis.bottom.data as string[])[i] = value;
      }

      if (renderOption.bottomText) {
        const valueLen = ctx.measureText(value).width;
        ctx.fillText(
          value,
          xPoint - valueLen / 2,
          yPoint + tickSize + fontHeight,
        );
      }
      ctx.closePath();
    }

    ctx.restore();
  }

  /**
   * draw left y축 tick, text
   */
  protected drawLeftTickAndText() {
    if (
      this.renderOption.leftTick === false &&
      this.renderOption.leftText === false
    )
      return;
    const {
      canvasLayer,
      mainChartIdx,
      height,
      startPoint,
      font,
      fontHeight,
      axis,
      ticks,
      defaultValue,
      renderOption,
    } = this;
    const { ctx } = canvasLayer[mainChartIdx];
    if (ctx === null || axis === null) return;

    ctx.save();

    ctx.beginPath();

    const lineWidth = axis.left.lineWidth || defaultValue.lineWidth;
    if (renderOption.leftTick) {
      const xPount = startPoint.left.x;
      const yPoint = crispPixel(startPoint.left.y, lineWidth);

      ctx.strokeStyle = axis.left.color || defaultValue.color;
      ctx.lineWidth = lineWidth;

      ctx.moveTo(xPount, yPoint);
      ctx.lineTo(xPount - (axis.left.tickSize || 0), yPoint);
      ctx.stroke();
    }

    if (renderOption.leftText) {
      ctx.font = font;
      ctx.fillStyle = axis.left.color || defaultValue.color;
      ctx.fillText(
        String(axis.left.min),
        startPoint.left.x -
          (axis.left.tickSize || 0) -
          ctx.measureText('0').width -
          7,
        startPoint.left.y + fontHeight / 2,
      );
      ctx.closePath();
    }

    for (let i = 1; i <= ticks.left; i++) {
      const xPoint = startPoint.left.x;
      const yPoint = crispPixel(
        startPoint.left.y - (i * height) / ticks.left,
        lineWidth,
      );
      ctx.beginPath();
      if (renderOption.leftTick) {
        ctx.moveTo(xPoint, yPoint);
        ctx.lineTo(xPoint - (axis.left.tickSize || 0), yPoint);
        ctx.stroke();
      }

      if (renderOption.leftText) {
        const value = String(
          i * (axis.left.unitsPerTick || defaultValue.unitsPerTick) +
            (axis.left.min || 0),
        );
        ctx.fillText(
          value,
          xPoint - (axis.left.tickSize || 0) - ctx.measureText(value).width - 7,
          yPoint + fontHeight / 2,
        );
      }
      ctx.closePath();
    }

    ctx.restore();
  }

  /**
   * draw right y축 tick, value
   */
  protected drawRightTickAndText() {
    if (
      this.renderOption.rightText === false &&
      this.renderOption.rightTick === false
    )
      return;
    const {
      canvasLayer,
      mainChartIdx,
      height,
      startPoint,
      axis,
      ticks,
      font,
      fontHeight,
      defaultValue,
      renderOption,
    } = this;
    const { ctx } = canvasLayer[mainChartIdx];
    if (ctx === null || axis === null) return;

    ctx.save();
    ctx.beginPath();

    const lineWidth = axis.right?.lineWidth || defaultValue.lineWidth;
    if (renderOption.rightTick) {
      const xPoint = startPoint.right.x;
      const yPoint = crispPixel(startPoint.right.y, lineWidth);

      ctx.strokeStyle = axis.right?.color || defaultValue.color;
      ctx.lineWidth = lineWidth;
      ctx.moveTo(xPoint, yPoint);
      ctx.lineTo(xPoint + (axis.right?.tickSize || 0), yPoint);
    }

    if (renderOption.rightText) {
      ctx.font = font;
      ctx.fillStyle = axis.right?.color || defaultValue.color;
      ctx.stroke();
      ctx.fillText(
        String(axis.right.min),
        startPoint.right.x + (axis.right?.tickSize || 0) + 7,
        startPoint.right.y + fontHeight / 2,
      );
    }
    ctx.closePath();

    for (let i = 1; i <= (ticks.right || 0); i++) {
      const xPoint = startPoint.right.x;
      const yPoint = crispPixel(
        startPoint.right.y - (i * height) / (ticks.right || 0),
        lineWidth,
      );

      ctx.beginPath();

      if (renderOption.rightTick) {
        ctx.moveTo(xPoint, yPoint);
        ctx.lineTo(xPoint + (axis.right?.tickSize || 0), yPoint);
        ctx.stroke();
      }

      if (renderOption.rightText) {
        const value = String(
          i * (axis.right?.unitsPerTick || 1) + (axis.right?.min || 0),
        );
        ctx.fillText(
          value,
          xPoint + (axis.right?.tickSize || 0) + 7,
          yPoint + fontHeight / 2,
        );
      }

      ctx.closePath();
    }

    ctx.restore();
  }

  /**
   * tooltip 생성
   */
  protected tooltipSetting() {
    if (this.renderOption.tooltip && this.createdNode.tooltip === false) {
      this.tooltip = document.createElement('div');
      this.tooltip.id = this.defaultValue.tooltipId;
      this.tooltip.style.position = 'absolute';
      this.tooltip.style.display = 'none';
      this.tooltip.style.width = 'auto';
      this.tooltip.style.height = 'auto';
      this.tooltip.style.zIndex = '10';
      this.canvasContainer?.appendChild(this.tooltip);
      this.createdNode.tooltip = true;
    }
  }

  /**
   * Draw legend
   */
  protected drawLegend() {
    if (this.renderOption.legend === true) {
      if (this.createdNode.legend === false) {
        this.legend = document.createElement('div');
        this.legend.style.position = 'absolute';
        this.legend.style.display = 'flex';
        this.legend.style.left = '50%';
        this.legend.style.marginTop = `${
          this.canvasLayer[this.mainChartIdx].canvas.height - 30
        }px`;
        this.legend.style.transform = 'translate(-50%, 0%)';
        this.canvasContainer?.appendChild(this.legend);
        this.createdNode.legend = true;
      }
    }

    const { legend, series } = this;
    if (legend === null || series === null) return;

    legend.innerHTML = '';

    series.left.forEach((s) => {
      const { color, name } = s;
      const node = document.createElement('div');
      node.style.display = 'flex';
      node.style.justifyContent = 'center';
      node.style.alignItems = 'center';
      const seriesTemplate = `
        <div style='background-color:${color};border-radius:50%;width:5px;height:5px;margin-right:3px;'></div>
        <div style='color:${color};margin-right:5px;font:${this.font}'>${name}</div>
      `;
      node.innerHTML = seriesTemplate;
      legend.appendChild(node);
    });

    series.right.forEach((s) => {
      const { color, name } = s;
      const node = document.createElement('div');
      node.style.display = 'flex';
      node.style.justifyContent = 'center';
      node.style.alignItems = 'center';
      const seriesTemplate = `
        <div style='background-color:${color};border-radius:50%;width:5px;height:5px;margin-right:3px;'></div>
        <div style='color:${color};margin-right:5px;font:${this.font}'>${name}</div>
      `;
      node.innerHTML = seriesTemplate;

      legend.appendChild(node);
    });
  }

  /**
   * 현재 mouseover에 대한 x축의 영역에 대한 값 반환
   * @param dataArea {number} x축 영역
   * @returns number - x축 영역별 값
   */
  private innerInfoBottomAxis(dataArea: number) {
    if (this.axis === null) return 0;
    const { axis } = this;
    if (axis.bottom.data) {
      return axis.bottom.data[dataArea];
    }
    return 0;
  }

  /**
   * 현재 mouseover에 대한 x축의 영역에 대한 left축에 종속된 데이터 정보 반환
   * @param dataArea {number} - mouseover x축 영역
   * @returns leftInfo - left축에 대한 데이터의 정보 배열
   */
  private innerInfoLeftData(dataArea: number) {
    const leftInfo: { name: string; color: string; data: number }[] = [];
    const { series, defaultValue } = this;
    if (series === null) return leftInfo;

    series.left.forEach((s: AxisChartType.SeriesType, i: number) => {
      const { name, color, series } = s;
      leftInfo[i] = {
        name,
        color: color || defaultValue.color,
        data: series[dataArea],
      };
    });

    return leftInfo;
  }

  /**
   * 현재 mouseover에 대한 x축의 영역에 대한 right축에 종속된 데이터 정보 반환
   * @param dataArea {number} - mouseover x축 영역
   * @returns rightInfo - right축에 대한 데이터의 정보 배열
   */
  private innerInfoRightData(dataArea: number) {
    const rightInfo: { name: string; color: string; data: number }[] = [];
    const { series, defaultValue } = this;
    if (series === null) return rightInfo;

    series.right.forEach((s: AxisChartType.SeriesType, i: number) => {
      const { name, series, color } = s;
      rightInfo[i] = {
        name,
        color: color || defaultValue.color,
        data: series[dataArea],
      };
    });

    return rightInfo;
  }

  /**
   * draw tooltip
   * @param x {number} mouse x좌표
   * @param y {number} mouse y좌표
   * @param outputPosX {number} tooltip이 표시될 x좌표
   * @param outputPosY {number} tooltip이 표시될 y좌표
   */
  protected tooltipMaker(
    x: number,
    y: number,
    outputPosX: number,
    outputPosY: number,
  ) {
    const { area, tooltip, elementArea, tooltipTemplate, axis, defaultValue } =
      this;
    if (axis === null || tooltip === null || tooltipTemplate === null) return;

    if (
      area.start.x <= x &&
      area.end.x >= x &&
      area.start.y >= y &&
      area.end.y <= y
    ) {
      // x축 정보
      const xAxisArea = Math.floor(
        (x - area.start.x + elementArea.bottom / 2) / elementArea.bottom,
      );
      // left y축 정보
      const leftAxisInfo = Math.floor(
        (area.start.y - y + elementArea.left / 2) / elementArea.left,
      );

      // 현재 마우스 좌표에 대한 x축, series 정보
      const bottomAxisInfo = this.innerInfoBottomAxis(xAxisArea);
      const leftDataInfo = this.innerInfoLeftData(xAxisArea);
      const rightDataInfo = this.innerInfoRightData(xAxisArea);

      let template = `
      <div style='color: ${axis.bottom.color || defaultValue.color};'>${
        axis.bottom.name || 'X axis'
      }: ${bottomAxisInfo || 0}</div>
      <div style='color: ${axis.left.color || defaultValue.color};'>${
        axis.left.name || 'left Y axis'
      }: ${leftAxisInfo}</div>
      `;

      if (axis.right !== undefined) {
        // right y축 정보
        const rightAxisInfo = Math.floor(
          (area.start.y - y + elementArea.right / 2) / elementArea.right,
        );

        template = `
            ${template}
            <div style='color: ${axis.right?.color || defaultValue.color};'>${
          axis.right?.name || 'right Y axis'
        }: ${rightAxisInfo}</div>
          `;
      }
      template = `
          ${template}
          <hr/>
        `;

      if (x >= this.middlePosition) {
        tooltip.style.left = `${outputPosX - tooltip.clientWidth - 25}px`;
      } else {
        tooltip.style.left = `${outputPosX + 25}px`;
      }

      tooltip.style.display = 'block';
      tooltip.style.top = `${outputPosY + 25}px`;
      leftDataInfo.forEach(
        (info: { name: string; color: string; data: number }) => {
          const { name, data, color } = info;
          template = `
              ${template}
              <div style='color: ${color}'}>${name}: ${data || 0}</div>
            `;
        },
      );
      rightDataInfo.forEach(
        (info: { name: string; color: string; data: number }) => {
          const { name, data, color } = info;
          template = `
              ${template}
              <div style='color: ${color}'}>${name}: ${data || 0}</div>
            `;
        },
      );
      template = tooltipTemplate.replace('{__contents__}', template);
      tooltip.style.alignItems = 'left';
      tooltip.innerHTML = template;

      return;
    }
    tooltip.style.display = 'none';
  }

  /**
   * 마우스 커서의 가이드라인 출력
   * @param x - 마우스 좌표 x
   * @param y - 마우스 좌표 y
   */
  protected drawGuidelines(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
  ) {
    const { area, defaultValue } = this;
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setLineDash([7]);
    ctx.strokeStyle = defaultValue.color;
    ctx.lineWidth = 1;

    if (
      area.start.x <= x &&
      area.end.x >= x &&
      area.start.y >= y &&
      area.end.y <= y
    ) {
      ctx.beginPath();
      ctx.moveTo(x + 0.5, area.start.y);
      ctx.lineTo(x + 0.5, area.end.y);
      ctx.stroke();
      ctx.moveTo(area.start.x, y + 0.5);
      ctx.lineTo(area.end.x, y + 0.5);
      ctx.stroke();
      ctx.closePath();
    }
    ctx.restore();
  }

  protected mouseout() {
    const { canvasLayer, animationChartIdx, renderOption } = this;
    const { canvas, ctx } = canvasLayer[animationChartIdx];
    const mouseout = () => {
      if (ctx && renderOption.guideLine) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      if (this.tooltip) {
        this.tooltip.style.display = 'none';
      }
    };
    if (canvas) {
      canvas.addEventListener('mouseout', mouseout);
    }
    return () => {
      if (canvas) {
        canvas.removeEventListener('mouseout', mouseout);
      }
    };
  }

  /**
   * canvas 마우스 이벤트 등록
   */
  protected drawMouseOver(): (() => void) | null {
    const { canvasLayer, mainChartIdx, animationChartIdx } = this;
    const mainCanvas = canvasLayer[mainChartIdx].canvas;
    const { canvas: animationCanvas, ctx: animationCtx } =
      canvasLayer[animationChartIdx];

    if (animationCtx === null) return null;

    const mouseEvent = (e: MouseEvent) => {
      const loc = this.mousePosition(mainCanvas, e.clientX, e.clientY);
      if (this.renderOption.guideLine === true) {
        // 가이드라인 렌더
        this.drawGuidelines(
          animationCanvas,
          animationCtx,
          crispPixel(loc.x),
          crispPixel(loc.y),
        );
      }
      if (this.renderOption.tooltip) {
        // tooltip 렌더

        this.tooltipTemplate = `
          <div style='padding: 16px;border: 1px solid rgb(177, 177, 177);background: #FFFFFF;border-radius: 5px;font-size: 14px;'>{__contents__}</div>
        `;
        this.tooltipMaker(loc.x, loc.y, e.pageX, e.pageY);
      }
    };

    if (animationCanvas) {
      animationCanvas.addEventListener('mousemove', mouseEvent);
    }
    return () => {
      animationCanvas?.removeEventListener('mousemove', mouseEvent);
    };
  }

  /**
   * canvas reactive
   */
  protected canvasResize(run?: () => void): () => void {
    const { legend, canvasLayer, mainChartIdx } = this;
    const resizeEvent = throttle(() => {
      this.correctionCanvas();
      if (run) {
        run();
      }
      if (legend) {
        legend.style.marginTop = `${
          canvasLayer[mainChartIdx].canvas.height - 30
        }px`;
      }
    }, 800);

    window.addEventListener('resize', resizeEvent);
    return () => {
      window.removeEventListener('resize', resizeEvent);
    };
  }
}

export default AxisTypeChart;
