import * as GlobalType from '@src/types';
import * as Types from './CanvasChartTypes';

class CanvasChart {
  /**
   * HTML5 Canvas 설정
   */
  protected canvasContainer: HTMLElement | null;

  protected canvasLayer: Types.CanvasLayerType[];

  protected tooltip: HTMLElement | null;

  protected tooltipTemplate: string | null;

  protected legend: HTMLElement | null;

  protected defaultValue: GlobalType.ObjectType;

  protected events: Array<any>;

  protected width: number;

  protected height: number;

  protected mainChartIdx: number;

  constructor({ node, width, height, canvasLayer }: Types.CanvasChartParam) {
    this.defaultValue = {
      value: 0,
      padding: 7,
      lineWidth: 1,
      place: 20,
      color: '#000',
      unitsPerTick: 1,
      font: 'normal 12px sans-serif',
      fontHeight: 12,
      tooltipId: 'chart-tooltip',
      staticCanvasId: 'line-chart',
      eventCanvasId: 'event-canvas',
      legendId: 'chart-legend',
      background: '#FFF',
      pointRadius: 3,
    };

    this.mainChartIdx = 0;

    /**
     * canvas 레이어 설정
     */
    this.canvasContainer = document.createElement('div');

    this.canvasContainer.style.display = 'relative';

    this.canvasLayer = [];
    canvasLayer.forEach((level: Types.CanvasLayer, idx: number) => {
      const { type, id, canvasStyle } = level;
      if (type === 'main') {
        this.mainChartIdx = idx;
      }
      this.canvasLayer[idx] = {
        type,
        id,
        canvasStyle,
        canvas: document.createElement('canvas') as HTMLCanvasElement,
        ctx: null,
      };
      Object.entries(canvasStyle).forEach(([key, value]) => {
        (this.canvasLayer[idx].canvas?.style as any)[key] = value;
      });
      this.canvasLayer[idx].ctx = this.canvasLayer[idx].canvas.getContext('2d');
      this.canvasLayer[idx].canvas.style.display = 'absolute';
      this.canvasLayer[idx].canvas.style.width = '100%';
      this.canvasContainer?.appendChild(this.canvasLayer[idx].canvas);
    });

    this.width = width;

    this.height = height;

    this.events = [];

    this.tooltip = null;

    this.tooltipTemplate = null;

    this.legend = null;

    node.appendChild(this.canvasContainer);
  }

  /**
   * 안티엘리어싱 보정
   */
  protected antiAliasingCorrection() {
    const dpr = window.devicePixelRatio;
    const { width, height } = this;
    this.canvasLayer.forEach((layer: Types.CanvasLayerType) => {
      const { canvas, ctx } = layer;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx?.scale(dpr, dpr);
    });
  }

  /**
   * canvasLayer[canvasIdx]의 배경 수정
   */
  protected ctxFillRect(canvasIdx: number) {
    if (this.canvasLayer.length - 1 < canvasIdx) return;
    const { canvasLayer, defaultValue } = this;
    const { canvas, ctx, canvasStyle } = canvasLayer[canvasIdx];
    if (ctx === null) return;
    ctx.save();

    ctx.fillStyle = canvasStyle.background || defaultValue.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.restore();
  }

  /**
   * mouse 커서의 좌표 계산
   * @param x - mouseover이벤트의 e.clientX
   * @param y - mouseover이벤트의 e.clientY
   * @returns - 마우스 좌표
   */
  protected mousePosition(canvas: HTMLCanvasElement, x: number, y: number) {
    const bbox = canvas.getBoundingClientRect();
    return {
      x: Math.floor(x - (bbox.left * canvas.width) / bbox.width),
      y: Math.floor(y - (bbox.top * canvas.height) / bbox.height),
    };
  }

  /**
   * Canvas 크기보정
   */
  protected correctionCanavas() {
    const dpr = window.devicePixelRatio;

    this.canvasLayer.forEach((layer: Types.CanvasLayerType) => {
      const { canvas } = layer;
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    });
  }

  /**
   * canvas observer 메서드
   * @param run canvas노드를 감지했을때 실행할 메서드
   * @param stop canvas노드가 사라졌을때 실행할 메서드
   */
  protected canvasObserver(run?: () => void, stop?: () => void) {
    if (this.canvasContainer === null) return;
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          const { isIntersecting } = entry;
          if (isIntersecting) {
            if (run) run();
          } else {
            if (stop) stop();
          }
        });
      },
    );
    observer.observe(this.canvasContainer);
  }
}

export default CanvasChart;
