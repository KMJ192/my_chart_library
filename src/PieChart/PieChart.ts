import PieChartParam, { PieChartData, PieChartElement, EachDataAreaType } from './PieChartTypes';

class PieChart {
  private canvas: HTMLCanvasElement;

  private ctx: CanvasRenderingContext2D;

  private inputData: PieChartData[];

  private expressionData: PieChartElement[] = [];

  private eachDataArea: EachDataAreaType[][];

  private chartFillColor: string;

  private pieChartBorder: string;

  private centerText: {
    visible: boolean;
    text?: string;
  };

  private totalValue?: number;

  private canvasSize: {
    width: number;
    height: number;
  };

  private radius: number = 0;

  private degree: number = 360;

  private circumference: number = Math.PI / 180;

  constructor(params: PieChartParam) {
    const { canvas, ctx, data, chartFillColor, pieChartBorder, centerText, totalValue } = params;
    this.canvas = canvas;

    this.ctx = ctx;

    this.inputData = data;

    this.chartFillColor = chartFillColor || 'rgb(230, 230, 230)';

    this.pieChartBorder = pieChartBorder;

    this.centerText = centerText;

    this.totalValue = totalValue || 0;

    this.canvasSize = {
      width: canvas.width,
      height: canvas.height,
    };

    this.eachDataArea = data ? data.slice().map(() => []) : [];
  }

  // Chart를 그릴 영역을 계산하는 함수
  private calcData() {
    // data 총합 계산
    let totalSum = 0;
    let mod: number = 0;
    if (this.inputData) {
      this.inputData.forEach((element: PieChartData) => {
        totalSum += element.value;
      });
    }
    if (this.totalValue) mod = this.totalValue - totalSum;

    // data 비율 할당
    if (this.inputData) {
      this.inputData.forEach((element: PieChartData) => {
        const rate = element.value / (this.totalValue || totalSum);
        this.expressionData.push({
          title: element.title,
          value: element.value,
          color: element.color,
          angleValue: this.degree * rate,
        });
      });
    }

    if (this.totalValue && mod > 0) {
      const rate = mod / this.totalValue;
      this.expressionData.push({
        value: mod,
        color: this.chartFillColor,
        angleValue: this.degree * rate,
      });
    }
  }

  // Chart를 그리는 함수
  private drawChart() {
    this.degree = 0;
    for (let i: number = 0; i < this.expressionData.length; i++) {
      const { title, angleValue, color } = this.expressionData[i];
      this.ctx.save();

      this.ctx.beginPath();
      this.ctx.moveTo(this.canvasSize.width / 2, this.canvasSize.height / 2);
      this.ctx.fillStyle = color;
      this.ctx.strokeStyle = color;

      if (i === 0) {
        this.ctx.arc(
          this.canvasSize.width / 2,
          this.canvasSize.height / 2,
          this.radius,
          0,
          this.circumference * angleValue,
          false,
        );
        this.degree = angleValue;
        this.eachDataArea[i] = [
          {
            startEndDegree: 0,
            title,
          },
          {
            startEndDegree: this.degree,
          },
        ];
      } else {
        this.ctx.arc(
          this.canvasSize.width / 2,
          this.canvasSize.height / 2,
          this.radius,
          this.circumference * this.degree,
          this.circumference * (this.degree + angleValue),
          false,
        );
        this.eachDataArea[i] = [
          {
            startEndDegree: this.degree,
            title,
          },
          {
            startEndDegree: this.degree + angleValue,
          },
        ];
        this.degree += angleValue;
      }

      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.stroke();

      this.ctx.restore();
    }
    // this.centerHole();
  }

  draw() {
    this.calcData();
    this.drawChart();
  }
}
export default PieChart;
