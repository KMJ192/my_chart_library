import PieChartParam, {
  PieChartData,
  PieChartElement,
  EachDataAreaType,
  defaultChartValue,
  PieChartEvent,
  pieChartType,
} from './PieChartTypes';

class PieChart {
  private canvas: HTMLCanvasElement;

  private ctx: CanvasRenderingContext2D;

  private chartType: string;

  private inputData: PieChartData[];

  private expressionData: PieChartElement[] = [];

  private eachDataArea: EachDataAreaType[][];

  private chartFillColor: string;

  private totalValue?: number;

  private canvasSize: {
    width: number;
    height: number;
  };

  private radius: number = 0;

  private degree: number = 360;

  private circumference: number = Math.PI / 180;

  private chartHovered: boolean = false;

  constructor(params: PieChartParam) {
    const { canvas, ctx, chartType, data, chartFillColor, chartSize, totalValue } = params;

    // chart 깨짐 방지
    const dpr = window.devicePixelRatio;
    canvas.style.width = `${chartSize}px`;
    canvas.style.height = `${chartSize}px`;
    canvas.width = (chartSize || 500) * dpr;
    canvas.height = (chartSize || 500) * dpr;
    ctx.scale(dpr, dpr);

    this.canvas = canvas;

    this.ctx = ctx;

    this.chartType = chartType || pieChartType.PRIMARY;

    this.inputData = data;

    this.chartFillColor = chartFillColor || defaultChartValue.CHART_COLOR;

    this.totalValue = totalValue || 0;

    this.canvasSize = {
      width: canvas.width,
      height: canvas.height,
    };

    this.radius = (this.canvasSize.width / 2) * 0.7;

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
          fillColor: element.fillColor,
          hover: element.hover,
          angleValue: this.degree * rate,
        });
      });
    }

    if (this.totalValue && mod > 0) {
      const rate = mod / this.totalValue;
      this.expressionData.push({
        value: mod,
        fillColor: this.chartFillColor,
        hover: {
          chartColor: defaultChartValue.HOVER_CHART_COLOR,
        },
        angleValue: this.degree * rate,
      });
    }
  }

  // Chart를 그리는 함수
  private drawChart() {
    this.degree = 0;
    for (let i: number = 0; i < this.expressionData.length; i++) {
      const { title, angleValue, fillColor, hover } = this.expressionData[i];

      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.moveTo(this.canvasSize.width / 2, this.canvasSize.height / 2);
      this.ctx.fillStyle = fillColor;
      this.ctx.strokeStyle = fillColor;

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
            hover,
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
            hover,
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
  }

  private degreeToRadians(deg: number): number {
    return deg * this.circumference;
  }

  private textDraw(idx?: number) {
    for (let i = 0; i < this.eachDataArea.length; i++) {
      const { title, startEndDegree: value, hover } = this.eachDataArea[i][0];
      if (title !== undefined && title.visible === true) {
        const half = (this.eachDataArea[i][1].startEndDegree - value) / 2;
        const deg = value + half;
        const dtr = this.degreeToRadians(deg);
        const xx = Math.cos(dtr) * (this.radius * 0.8) + this.canvasSize.width / 2;
        const yy = Math.sin(dtr) * (this.radius * 0.8) + this.canvasSize.width / 2;

        const minus = this.ctx.measureText(title.text).width / 2;
        this.ctx.save();

        if (idx === undefined) {
          this.ctx.fillStyle = title.color || defaultChartValue.FONT_COLOR;
          this.ctx.font = title.style || defaultChartValue.FONT_STYLE;
        } else if (idx === i) {
          this.ctx.fillStyle = hover?.fontColor || '';
          this.ctx.font = hover?.fontStyle || '';
        } else {
          this.ctx.fillStyle = title.color || defaultChartValue.FONT_COLOR;
          this.ctx.font = title.style || defaultChartValue.FONT_STYLE;
        }
        this.ctx.fillText(title.text, xx - minus, yy);
        this.ctx.restore();
      }
    }
  }

  private isInside(mouseX: number, mouseY: number): PieChartEvent {
    let retVal: PieChartEvent = {
      result1: false,
      result2: false,
      index: -1,
      degree: 0,
    };

    const posX = this.canvasSize.width / 2 - mouseX;
    const posY = this.canvasSize.height / 2 - mouseY;

    let rad = Math.atan2(posY, posX);
    rad = (rad * 180) / Math.PI;
    rad += 180;

    const circleLen = this.radius;
    const len = Math.sqrt(Math.abs(posX * posX) + Math.abs(posY * posY));
    if (len <= circleLen) {
      retVal = {
        ...retVal,
        result1: true,
      };

      this.eachDataArea.forEach((area: EachDataAreaType[], idx: number) => {
        if (rad >= area[0].startEndDegree && rad <= area[1].startEndDegree) {
          retVal = {
            ...retVal,
            result2: true,
            index: idx,
          };
        }
      });
    }

    retVal = {
      ...retVal,
      degree: rad,
    };

    return retVal;
  }

  private hoverArea(idx: number) {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);

    this.degree = 0;
    for (let i: number = 0; i < this.expressionData.length; i++) {
      const { angleValue, fillColor, hover } = this.expressionData[i];
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(this.canvasSize.width / 2, this.canvasSize.height / 2);

      let innRadius = this.radius;
      if (idx === i) {
        ctx.lineWidth = 2;
        ctx.fillStyle = hover?.chartColor || fillColor;
        innRadius = this.radius * 1.15;
      } else {
        ctx.fillStyle = fillColor;
        ctx.strokeStyle = fillColor;
      }
      if (i === 0) {
        ctx.arc(
          this.canvasSize.width / 2,
          this.canvasSize.height / 2,
          innRadius,
          0,
          this.circumference * angleValue,
          false,
        );
        this.degree = angleValue;
      } else {
        ctx.arc(
          this.canvasSize.width / 2,
          this.canvasSize.height / 2,
          innRadius,
          this.circumference * this.degree,
          this.circumference * (this.degree + angleValue),
          false,
        );
        this.degree += angleValue;
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  }

  public draw() {
    this.calcData();
    this.drawChart();
    this.textDraw();
  }

  public hoverEvent(dest: boolean) {
    const hover = (e: MouseEvent) => {
      const mouseX: number = e.clientX - this.canvas.offsetLeft;
      const mouseY: number = e.clientY - this.canvas.offsetTop;
      const inn: PieChartEvent = this.isInside(mouseX, mouseY);

      if (inn.index > -1) {
        this.chartHovered = true;
        this.hoverArea(inn.index);
        this.textDraw(inn.index);
      } else {
        if (this.chartHovered) {
          this.hoverArea(-1);
          this.textDraw(-1);
        }
        this.chartHovered = false;
      }
    };

    if (dest === false) this.canvas.addEventListener('mousemove', hover);
    else this.canvas.removeEventListener('mousemove', hover);
  }
}

export default PieChart;
