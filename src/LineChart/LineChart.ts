import { LineChartParam } from './LineChartTypes';

class LineChart {
  private canvas: HTMLCanvasElement;

  private ctx: CanvasRenderingContext2D | null;

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
    const { canvas, chartSize, minXAxis, minYAxis, maxXAxis, maxYAxis, unitsPerTickX, unitsPerTickY } = param;

    this.canvas = canvas;

    this.ctx = this.canvas.getContext('2d');

    this.canvas.width = chartSize?.chartWidth || 100;

    this.canvas.height = chartSize?.chartHeigth || 50;

    this.minXAxis = minXAxis;

    this.minYAxis = minYAxis;

    this.maxXAxis = maxXAxis;

    this.maxYAxis = maxYAxis;

    this.unitsPerTickX = unitsPerTickX;

    this.unitsPerTickY = unitsPerTickY;

    this.padding = 10;

    this.tickSize = 10;

    this.axisColor = '#555';

    this.pointRadius = 5;

    this.font = '12pt Calibri';

    this.fontHeight = 12;

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
    const { ctx, x, y, width, height, axisColor, numXTicks } = this;
    if (ctx === null) return;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x, y + height - 10);
    ctx.lineTo(x + width, y + height - 10);
    ctx.strokeStyle = axisColor;
    ctx.lineWidth = 1;
    ctx.stroke();
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
    if (this.ctx === null) return;
    this.calcRelation();
    // this.displayCalc();
    this.drawXAxis();
  }
}

export default LineChart;
