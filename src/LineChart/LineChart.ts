import { LineChartParam, DataType, DrawParam } from './LineChartTypes';

// push test
class LineChart {
  private canvas: HTMLCanvasElement;

  private tooltip?: HTMLElement;

  private ctx: CanvasRenderingContext2D | null;

  private data: DataType[] | any;

  private minXAxis: number;

  private minYAxis: number;

  private maxXAxis: number;

  private maxYAxis: number;

  private unitsPerTickX: number;

  private unitsPerTickY: number;

  private padding: number;

  private tickSize: number;

  private axisColor: string;

  private pointRadius: number;

  private font: string;

  private fontHeight: number;

  private rangeX: number;

  private rangeY: number;

  private numXTicks: number;

  private numYTicks: number;

  private x: number;

  private y: number;

  private width: number;

  private height: number;

  private scaleX: number;

  private scaleY: number;

  private xAxisSelector: string;

  private yAxisSelector: string;

  constructor(param: LineChartParam) {
    const {
      canvas,
      tooltip,
      data,
      width,
      height,
      minXAxis,
      minYAxis,
      maxXAxis,
      maxYAxis,
      unitsPerTickX,
      unitsPerTickY,
      axisColor,
      pointRadius,
    } = param;

    /**
     * canvas element
     */
    this.canvas = canvas;

    /**
     * tootip
     */
    this.tooltip = tooltip;

    /**
     * canvas 2d context
     */
    this.ctx = this.canvas.getContext('2d');

    /**
     * setting canvas width
     */
    this.canvas.width = width || 500;

    /**
     * setting canvas height
     */
    this.canvas.height = height || 300;

    this.data = data?.data || [];

    this.maxXAxis = maxXAxis || 0;

    this.minXAxis = minXAxis || 0;

    this.maxYAxis = maxYAxis || 0;

    this.minYAxis = minYAxis || 0;

    /**
     * x축 tick당 값 설정
     */
    this.unitsPerTickX = unitsPerTickX || 5;

    /**
     * y축 tick당 값 설정
     */
    this.unitsPerTickY = unitsPerTickY || 5;

    /**
     * canvas padding 설정
     */
    this.padding = 10;

    /**
     * tick 표시 선 길이
     */
    this.tickSize = 10;

    /**
     * 축 색상 설정
     */
    this.axisColor = axisColor || '#555';

    /**
     * linechart point 크기
     */
    this.pointRadius = pointRadius || 0;

    /**
     * font 설정
     */
    this.font = 'normal bold 12px serif';

    this.fontHeight = 12;

    // initialize
    this.x = 0;

    this.y = 0;

    this.rangeX = 0;

    this.rangeY = 0;

    this.numXTicks = 0;

    this.numYTicks = 0;

    this.width = 0;

    this.height = 0;

    this.scaleX = 0;

    this.scaleY = 0;

    /**
     * data selector 설정
     */
    this.xAxisSelector = data?.xAxisSelector || 'lineX';

    this.yAxisSelector = data?.yAxisSelector || 'lineY';
  }

  private calcRelation() {
    const { canvas, fontHeight, tickSize, unitsPerTickX, unitsPerTickY, padding, xAxisSelector, yAxisSelector } = this;

    // y축 최대/최소값 저장
    const dataLen = this.data.length;
    if (dataLen > 0 && this.data[0][xAxisSelector] !== undefined) {
      this.data.sort((a: any, b: any) => a[yAxisSelector] - b[yAxisSelector]);
      this.minYAxis = this.data[0][yAxisSelector];
      this.maxYAxis = this.data[dataLen - 1][yAxisSelector];
    } else {
      this.minYAxis = 0;
      this.maxYAxis = dataLen - 1;
    }

    // x축 최대/최소값 저장
    if (dataLen > 0 && this.data[0][xAxisSelector] !== undefined) {
      this.data.sort((a: any, b: any) => a[xAxisSelector] - b[xAxisSelector]);
      this.minXAxis = this.data[0][xAxisSelector];
      this.maxXAxis = this.data[dataLen - 1][xAxisSelector];
    } else {
      this.minXAxis = 0;
      this.maxXAxis = dataLen - 1;
    }

    this.rangeX = this.maxXAxis - this.minYAxis;
    this.rangeY = this.maxYAxis - this.minYAxis;

    this.numXTicks = Math.round(this.rangeX / unitsPerTickX);
    this.numYTicks = Math.round(this.rangeY / unitsPerTickY);

    this.x = this.getLongestValueWidth() + padding * 2;
    this.y = padding * 2;
    this.width = canvas.width - this.x - padding * 2 - tickSize;
    this.height = canvas.height - this.y - padding - fontHeight - tickSize;
    this.scaleX = this.width / this.rangeX;
    this.scaleY = this.height / this.rangeY;
  }

  private getLongestValueWidth(): number {
    if (this.ctx === null) return 0;
    const { ctx, font, numYTicks, maxYAxis, unitsPerTickY } = this;
    ctx.font = font;
    let longestValueWidth: number = 0;
    for (let n = 0; n < numYTicks; n++) {
      const value = String(maxYAxis - n * unitsPerTickY);
      longestValueWidth = Math.max(longestValueWidth, ctx.measureText(value).width);
    }
    return longestValueWidth;
  }

  private drawXAxis() {
    const { ctx, x, y, width, height, axisColor } = this;
    if (ctx === null) return;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x, y + height);
    ctx.lineTo(x + width, y + height);
    ctx.strokeStyle = axisColor;
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();
  }

  private drawXTick() {
    if (this.ctx === null) return;
    const { ctx, numXTicks, tickSize, x, y, width, height } = this;
    ctx.save();
    for (let i = 0; i < numXTicks; i++) {
      const tmpX = ((i + 1) * width) / numXTicks + x;
      const tmpY = y + height;
      ctx.beginPath();
      ctx.moveTo(tmpX, tmpY);
      ctx.lineTo(tmpX, tmpY + tickSize);
      ctx.stroke();
    }
    ctx.restore();
  }

  private drawXValue() {
    if (this.ctx === null) return;
    const { ctx, width, height, x, y, padding, font, numXTicks, maxXAxis, tickSize } = this;
    ctx.save();

    ctx.font = font;
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < numXTicks; i++) {
      const label = Math.round(((i + 1) * maxXAxis) / numXTicks);
      ctx.save();
      ctx.translate(((i + 1) * width) / numXTicks + x, y + height + padding + tickSize);
      ctx.fillText(String(label), 0, 0);
      ctx.restore();
    }
    ctx.restore();
  }

  private drawYAxis() {
    const { ctx, x, y, axisColor, height } = this;
    if (ctx === null) return;
    ctx.save();

    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = axisColor;
    ctx.lineWidth = 1;
    ctx.moveTo(x, y + height);
    ctx.lineTo(x, y);
    ctx.stroke();

    ctx.restore();
  }

  private drawYTick() {
    if (this.ctx === null) return;
    const { ctx, height, numYTicks, x, y, tickSize } = this;
    ctx.save();
    for (let i = 0; i < numYTicks; i++) {
      const tmpY = (i * height) / numYTicks + y;
      ctx.beginPath();
      ctx.moveTo(this.x, tmpY);
      ctx.lineTo(x - tickSize, tmpY);
      ctx.stroke();
    }
    ctx.restore();
  }

  private drawYValue() {
    const { ctx, x, y, font, padding, numYTicks, maxYAxis, height } = this;
    if (ctx === null) return;

    ctx.save();
    ctx.font = font;
    ctx.fillStyle = 'black';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < numYTicks; i++) {
      const value = Math.round(maxYAxis - (i * maxYAxis) / numYTicks);
      ctx.save();
      ctx.translate(x - padding - this.tickSize / 2, (i * height) / numYTicks + y);
      ctx.fillText(String(value), 0, 0);
      ctx.restore();
    }

    ctx.restore();
  }

  private drawLine() {
    const { ctx, data, x, y, height, scaleX, scaleY, xAxisSelector, yAxisSelector, pointRadius } = this;
    if (ctx === null || !data) return;
    ctx.save();

    // transform context
    ctx.translate(x, y + height);
    ctx.scale(1, -1);

    ctx.lineWidth = 1;
    ctx.strokeStyle = 'blue';
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    const startX = data[0][xAxisSelector] || 0;
    const startY = data[0][yAxisSelector] || 0;
    ctx.moveTo(startX, startY);

    data.forEach((point: any, i: number) => {
      if (point[xAxisSelector] === undefined) ctx.lineTo(i * scaleX, point[yAxisSelector] * scaleY);
      else ctx.lineTo(point[xAxisSelector] * scaleX, point[yAxisSelector] * scaleY);

      ctx.stroke();
      ctx.closePath();

      // 포인트 찍기
      if (pointRadius > 0) {
        ctx.beginPath();
        ctx.arc(point[xAxisSelector] * scaleX, point[yAxisSelector] * scaleY, this.pointRadius, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.closePath();
      }

      ctx.beginPath();
      if (point[xAxisSelector] === undefined) ctx.moveTo(i * scaleX, point[yAxisSelector] * scaleY);
      else ctx.moveTo(point[xAxisSelector] * scaleX, point[yAxisSelector] * scaleY);
    });

    ctx.restore();
  }

  private innerArea(px: number, py: number) {
    const { canvas, unitsPerTickX } = this;
    const x = px - canvas.offsetLeft;
    console.log(x);
  }

  private tooltipMaker(px: number, py: number) {
    if (!this.tooltip) return;
    const { tooltip } = this;
    tooltip.style.display = 'block';
    tooltip.style.left = String(px + px * 0.02);
    tooltip.style.top = String(py + py * 0.02);
    this.innerArea(px, py);

    tooltip.innerHTML = `
      test
    `;
  }

  private tooltipEvent() {
    const { canvas } = this;
    canvas.addEventListener('mousemove', (e: MouseEvent) => {
      const px = e.pageX;
      const py = e.pageY;
      // const x = px - canvas.offsetLeft;
      // const y = py - canvas.offsetTop;
      // console.log(x);
      this.tooltipMaker(px, py);
    });
  }

  // private displayCalc() {
  //   console.log(`rangeX: ${this.rangeX}`);
  //   console.log(`rangeY: ${this.rangeY}`);
  //   console.log(`numXTicks: ${this.numXTicks}`);
  //   console.log(`numYTicks ${this.numYTicks}`);
  //   console.log(`x: ${this.x}`);
  //   console.log(`y: ${this.y}`);
  //   console.log(`width: ${this.width}`);
  //   console.log(`height: ${this.height}`);
  //   console.log(`scaleX: ${this.scaleX}`);
  //   console.log(`scaleY: ${this.scaleY}`);
  // }

  public draw(draw: DrawParam) {
    const {
      drawXAxis = true,
      drawXValue = true,
      drawXTick = true,
      drawYAxis = true,
      drawYValue = true,
      drawYTick = true,
    } = draw;
    if (this.ctx === null) return;

    this.calcRelation();

    if (drawXAxis) this.drawXAxis();
    if (drawXTick) this.drawXTick();
    if (drawXValue) this.drawXValue();

    if (drawYAxis) this.drawYAxis();
    if (drawYTick) this.drawYTick();
    if (drawYValue) this.drawYValue();

    this.drawLine();
    if (this.tooltip) this.tooltipEvent();
  }
}

export default LineChart;
