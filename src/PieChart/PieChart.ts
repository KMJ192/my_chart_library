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

  private ctx: CanvasRenderingContext2D | null;

  private chartType: string;

  private inputData: PieChartData[];

  private expressionData: PieChartElement[] = [];

  private eachDataArea: EachDataAreaType[][];

  private chartFillColor: string;

  private totalValue?: number;

  private totalSum?: number;

  private canvasSize: {
    width: number;
    height: number;
  };

  // 중앙에 출력하는 value
  private displayValue?: {
    visible?: boolean;
    color?: string;
    style?: string;
  };

  private radius: number = 0;

  private degree: number = 360;

  private circumference: number = Math.PI / 180;

  private chartHovered: boolean = false;

  private chartPosition: {
    x: number;
    y: number;
  };

  constructor(params: PieChartParam) {
    const { canvas, chartType, data, chartFillColor, chartSize, totalValue, displayValue } = params;
    this.canvas = canvas;

    this.ctx = canvas.getContext('2d');

    canvas.width = chartSize || defaultChartValue.CHART_SIZE;

    canvas.height = chartSize || defaultChartValue.CHART_SIZE;

    this.canvas = canvas;

    this.chartType = chartType || pieChartType.PRIMARY;

    this.inputData = data;

    this.chartFillColor = chartFillColor || defaultChartValue.CHART_COLOR;

    this.totalValue = totalValue || 0;

    this.totalSum = 0;

    this.canvasSize = {
      width: canvas.width,
      height: canvas.height,
    };

    this.displayValue = displayValue;

    this.radius = (this.canvasSize.width / 2) * 0.7;

    this.eachDataArea = data ? data.slice().map(() => []) : [];

    this.chartPosition = {
      x: this.canvasSize.width / 2,
      y: this.canvasSize.height / 2,
    };
  }

  // chart 깨짐 방지
  private resolution() {
    const { ctx, canvas } = this;
    const dpr = window.devicePixelRatio;
    canvas.style.width = `${canvas.width}px`;
    canvas.style.height = `${canvas.height}px`;
    canvas.width = (canvas.width || 500) * dpr;
    canvas.height = (canvas.height || 500) * dpr;
    ctx?.scale(dpr, dpr);
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

    let areaDegree: number = 0;
    let startDegree: number = 0;

    // data 비율 할당
    if (this.inputData) {
      this.inputData.forEach((element: PieChartData, idx: number) => {
        const rate = element.value / (this.totalValue || totalSum);
        const angleValue = this.degree * rate;
        this.expressionData.push({
          title: element.title,
          value: element.value,
          fillColor: element.fillColor,
          hover: element.hover,
          angleValue,
        });
        if (idx === 0) {
          startDegree = 0;
          areaDegree = angleValue;
        } else {
          startDegree = areaDegree;
          areaDegree += angleValue;
        }
        this.eachDataArea[idx] = [
          {
            startEndDegree: startDegree,
            hover: element.hover,
            title: element.title,
          },
          {
            startEndDegree: areaDegree,
          },
        ];
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
    this.totalSum = totalSum;
  }

  // Chart를 그리는 함수
  private drawChart() {
    const { ctx } = this;
    if (ctx) {
      this.degree = 0;
      for (let i: number = 0; i < this.expressionData.length; i++) {
        const { angleValue, fillColor } = this.expressionData[i];
        let start: number = 0,
          end: number = 0;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(this.chartPosition.x, this.chartPosition.y);
        ctx.fillStyle = fillColor;
        ctx.strokeStyle = fillColor;

        if (i === 0) {
          start = 0;
          end = this.circumference * angleValue;
          this.degree = angleValue;
        } else {
          start = this.circumference * this.degree;
          end = this.circumference * (this.degree + angleValue);
          this.degree += angleValue;
        }
        // start += 1;
        // end += 1;
        ctx.arc(this.chartPosition.x, this.chartPosition.y, this.radius, start, end, false);

        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.restore();
      }
    }
    this.centerMaker();
  }

  // 각도를 radian으로 바꾸는 함수
  private degreeToRadians(deg: number): number {
    return deg * this.circumference;
  }

  // 각 영역의 중앙에 title을 그리는 함수
  private textDraw(idx?: number) {
    if (this.ctx) {
      for (let i = 0; i < this.eachDataArea.length; i++) {
        const { title, startEndDegree: value, hover } = this.eachDataArea[i][0];
        if (title !== undefined && title.visible === true) {
          const half = (this.eachDataArea[i][1].startEndDegree - value) / 2;
          const deg = value + half;
          const dtr = this.degreeToRadians(deg);
          const xx = Math.cos(dtr) * (this.radius * 0.8) + this.chartPosition.x;
          const yy = Math.sin(dtr) * (this.radius * 0.8) + this.chartPosition.x;

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
  }

  // 영역의 위치를 판단하는 함수
  private isInside(mouseX: number, mouseY: number): PieChartEvent {
    let retVal: PieChartEvent = {
      result1: false,
      result2: false,
      index: -1,
      degree: 0,
    };

    const posX = this.chartPosition.x - mouseX;
    const posY = this.chartPosition.y - mouseY;

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

  // 영역 확인
  private hoverArea(idx: number) {
    const { ctx, canvasSize, expressionData, chartPosition, circumference } = this;
    if (ctx) {
      ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);

      this.degree = 0;
      for (let i: number = 0; i < expressionData.length; i++) {
        const { angleValue, fillColor, hover } = expressionData[i];
        let start: number = 0,
          end: number = 0;

        ctx.save();
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(chartPosition.x, chartPosition.y);

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
          end = circumference * angleValue;
          this.degree = angleValue;
        } else {
          start = circumference * this.degree;
          end = circumference * (this.degree + angleValue);
          this.degree += angleValue;
        }
        ctx.arc(chartPosition.x, chartPosition.y, innRadius, start, end, false);

        ctx.closePath();
        ctx.fill();
        if (idx !== i) ctx.stroke();

        ctx.restore();
      }
      this.centerMaker();
      this.centerTextDraw();
    }
  }

  // donut타입 차트일 경우 실행
  private centerMaker() {
    if (this.chartType !== 'donut') return;
    const { ctx, canvasSize, radius, circumference } = this;
    if (ctx) {
      ctx.save();
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'white';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 1;

      ctx.beginPath();
      ctx.moveTo(canvasSize.width / 2, canvasSize.height / 2);
      ctx.arc(canvasSize.width / 2, canvasSize.height / 2, radius / 3, 0, circumference * 360);

      ctx.fill();
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    }
  }

  // 중앙 텍스트 입력
  private centerTextDraw() {
    const { ctx, displayValue, chartPosition, totalSum } = this;
    if (ctx && displayValue && displayValue.visible === true) {
      ctx.save();

      ctx.textAlign = 'center';
      ctx.font = displayValue.style || defaultChartValue.FONT_STYLE;
      ctx.fillStyle = displayValue.color || defaultChartValue.FONT_COLOR;

      ctx.fillText(String(totalSum), chartPosition.x, chartPosition.y * 1.09);
      ctx.fillText('Total', chartPosition.x, chartPosition.y * 1.005);
      ctx.restore();
    }
  }

  public draw() {
    this.resolution();
    this.calcData();
    this.drawChart();
    this.textDraw();
    this.centerTextDraw();
  }

  // hover event 함수
  public hoverEvent(dest: boolean) {
    const hover = (e: MouseEvent) => {
      const mouseX: number = e.pageX - this.canvas.offsetLeft;
      const mouseY: number = e.pageY - this.canvas.offsetTop;
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
