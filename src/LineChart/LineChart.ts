import { LineChartParam, DataType } from './LineChartTypes';

class LineChart {
  private canvas: HTMLCanvasElement;

  private ctx: CanvasRenderingContext2D | null;

  private title: string;

  private data: DataType[] | null;

  private tootip: boolean;

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

  constructor(param: LineChartParam) {
    const { canvas, data, width, height, minXAxis, minYAxis, maxXAxis, maxYAxis, unitsPerTickX, unitsPerTickY } = param;

    /**
     * canvas element
     */
    this.canvas = canvas;

    /**
     * canvas 2d context
     */
    this.ctx = this.canvas.getContext('2d');

    /**
     * chart 타이틀
     */
    this.title = data?.title || '';

    /**
     * chart data
     */
    this.data = data?.data.sort((a, b) => a.x - b.x) || [];

    /**
     * visible tooltip
     */
    this.tootip = data?.tooltip || false;

    /**
     * setting canvas width
     */
    this.canvas.width = width || 500;

    /**
     * setting canvas height
     */
    this.canvas.height = height || 300;

    /**
     * x축 최소값 설정
     */
    this.minXAxis = minXAxis || (this.data && this.data[0].x) || 0;

    /**
     * y축 최소값 설정
     */
    this.minYAxis = minYAxis || (this.data && this.data[0].y) || 0;

    /**
     * x축 최대값 설정
     */
    this.maxXAxis = maxXAxis || (this.data && this.data[this.data.length - 1].x) || 0;

    /**
     * y축 최대값 설정
     */
    this.maxYAxis = maxYAxis || (this.data && this.data[this.data.length - 1].y) || 0;

    /**
     * x축 tick당 값 설정
     */
    this.unitsPerTickX = unitsPerTickX || 10;

    /**
     * y축 tick당 값 설정
     */
    this.unitsPerTickY = unitsPerTickY || 10;

    this.padding = 10;

    /**
     * tick 표시 선 길이
     */
    this.tickSize = 10;

    /**
     * 축 색상 설정
     */
    this.axisColor = '#555';

    this.pointRadius = 5;

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
  }

  private calcRelation() {
    const { maxXAxis, maxYAxis, minYAxis, unitsPerTickX, unitsPerTickY, padding } = this;

    this.rangeX = maxXAxis - minYAxis;
    this.rangeY = maxYAxis - minYAxis;

    this.numXTicks = Math.round(this.rangeX / unitsPerTickX);
    this.numYTicks = Math.round(this.rangeY / unitsPerTickY);

    this.x = this.getLongestValueWidth() + padding * 2;
    this.y = padding * 2;
    this.width = this.canvas.width - this.x - padding * 2;
    this.height = this.canvas.height - this.y - padding - this.fontHeight;
    this.scaleX = this.width / this.rangeX;
    this.scaleY = this.height / this.rangeY;
  }

  private getLongestValueWidth(): number {
    if (this.ctx === null) return 0;
    this.ctx.font = this.font;
    let longestValueWidth: number = 0;
    for (let n = 0; n < this.numYTicks; n++) {
      const value = String(this.maxYAxis - n * this.unitsPerTickY);
      longestValueWidth = Math.max(longestValueWidth, this.ctx.measureText(value).width);
    }
    return longestValueWidth;
  }

  private drawXAxis() {
    const { ctx, x, y, width, height, axisColor, numXTicks, tickSize } = this;
    if (ctx === null) return;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x, y + height - 10);
    ctx.lineTo(x + width, y + height - 10);
    ctx.strokeStyle = axisColor;
    ctx.lineWidth = 1;
    ctx.stroke();

    for (let i = 0; i < numXTicks; i++) {
      const tmpX = ((i + 1) * width) / numXTicks + x;
      const tmpY = y + height;
      ctx.beginPath();
      ctx.moveTo(tmpX, tmpY);
      ctx.lineTo(tmpX, tmpY - tickSize);
      ctx.stroke();
    }
    ctx.restore();
  }

  private drawXLabel() {
    const { ctx, width, height, x, y, padding, font, numXTicks, maxXAxis } = this;
    if (ctx === null) return;
    ctx.save();

    ctx.font = font;
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < numXTicks; i++) {
      const label = Math.round(((i + 1) * maxXAxis) / numXTicks);
      ctx.save();
      ctx.translate(((i + 1) * width) / numXTicks + x, y + height + padding);
      ctx.fillText(String(label), 0, 0);
      ctx.restore();
    }
    ctx.restore();
  }

  private displayCalc() {
    console.log(`rangeX: ${this.rangeX}`);
    console.log(`rangeY: ${this.rangeY}`);
    console.log(`numXTicks: ${this.numXTicks}`);
    console.log(`numYTicks ${this.numYTicks}`);
    console.log(`x: ${this.x}`);
    console.log(`y: ${this.y}`);
    console.log(`width: ${this.width}`);
    console.log(`height: ${this.height}`);
    console.log(`scaleX: ${this.scaleX}`);
    console.log(`scaleY: ${this.scaleY}`);
  }

  public draw() {
    this.calcRelation();
    // this.displayCalc();
    this.drawXAxis();
    this.drawXLabel();
  }
}

export default LineChart;
