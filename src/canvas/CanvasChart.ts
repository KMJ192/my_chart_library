import {
  CanvasChartParam,
  CanvasLayer,
  CanvasLayerExt,
} from './CanvasChartType';

class Canvas {
  protected topLevelNode: HTMLElement | null;

  protected canvasContainer: HTMLDivElement;

  protected canvasLayer: CanvasLayerExt[];

  protected mainChartIdx: number;

  protected animationChartIdx: number;

  protected evnets: Array<() => void | null>;

  protected tooltip: HTMLElement | null;

  protected tooltipHTMLTemplate: string;

  protected legend: HTMLElement | null;

  protected width: number;

  protected height: number;

  protected defaultValue: { [key: string]: any };

  constructor(param: CanvasChartParam) {
    const { id, width, height, canvasLayer } = param;
    this.defaultValue = {
      value: 0,
      padding: 7,
      lineWidth: 1,
      place: 20,
      color: '#000',
      unitsPerTick: 1,
      font: 'normal 12px sans-serif',
      fontHeight: 12,
      background: '#FFF',
      pointRadius: 3,
    };

    const dpr = window.devicePixelRatio;

    /**
     * Setting canvas layer
     */
    this.topLevelNode = document.getElementById(id);

    this.canvasContainer = document.createElement('div');

    this.canvasContainer.style.position = 'relative';

    this.mainChartIdx = 0;

    this.animationChartIdx = 1;

    this.canvasLayer = [];

    canvasLayer.forEach((layer: CanvasLayer, idx: number) => {
      const { type, id, canvasStyle } = layer;
      this.canvasLayer[idx] = {
        type,
        id,
        canvasStyle,
        canvas: document.createElement('canvas') as HTMLCanvasElement,
        ctx: null,
      };
      if (type === 'main') {
        this.mainChartIdx = idx;
      } else if (type === 'animation') {
        this.animationChartIdx = idx;
      }

      this.canvasLayer[idx].canvas.width = width * dpr;
      this.canvasLayer[idx].canvas.height = height * dpr;

      /**
       * Setting canvas style
       */
      if (canvasStyle) {
        Object.entries(canvasStyle).forEach(([key, value]) => {
          (this.canvasLayer[idx].canvas?.style as any)[key] = value;
        });
      }
      this.canvasLayer[idx].canvas.style.position = 'absolute';
      this.canvasLayer[idx].canvas.style.width = '100%';

      this.canvasLayer[idx].ctx = this.canvasLayer[idx].canvas.getContext('2d');
      this.canvasLayer[idx].ctx?.scale(dpr, dpr);

      /**
       * Created canvas append to canvas container node
       */
      this.canvasContainer.appendChild(this.canvasLayer[idx].canvas);
    });

    this.evnets = [];

    this.tooltip = null;

    this.tooltipHTMLTemplate = '';

    this.legend = null;

    this.width = this.defaultValue.value;

    this.height = this.defaultValue.value;
  }

  /**
   * fillRect the canvasLayer[canvasIdx]
   * @param canvasIdx
   */
  protected ctxFillRect = (canvasIdx: number) => {
    if (this.canvasLayer.length - 1 < canvasIdx) return;
    const { canvasLayer, defaultValue } = this;
    const { canvas, ctx, canvasStyle } = canvasLayer[canvasIdx];
    if (ctx === null) return;

    ctx.save();

    ctx.fillStyle = canvasStyle?.background || defaultValue.background;

    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.restore();
  };

  /**
   * Correction canvas
   */
  protected correctionCnavas = () => {
    const dpr = window.devicePixelRatio;

    this.canvasLayer.forEach((layer: CanvasLayerExt) => {
      const { canvas } = layer;
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    });
  };

  /**
   * Coordinates of mouse
   * @param x - mouseover event.clientX
   * @param y - mouseover event.clientY
   * @returns - 계산된 마우스 좌표
   */
  protected mousePosition = (x: number, y: number) => {
    const { canvas } = this.canvasLayer[this.mainChartIdx];
    const bbox = canvas.getBoundingClientRect();

    return {
      x: (x - bbox.left) * (canvas.width / bbox.width),
      y: (y - bbox.top) * (canvas.height / bbox.height),
    };
  };

  /**
   * canvas observer
   * @param run - Run function when observed canvas
   * @param stop - Run function when escaped canvas
   */
  protected canvasObserver<T, R>(run?: () => T, stop?: () => R) {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          const { isIntersecting } = entry;
          if (isIntersecting) {
            if (typeof run === 'function') run();
          } else {
            if (typeof stop === 'function') stop();
          }
        });
      },
    );
  }

  /**
   * Add events
   * @param eventArray
   */
  protected addEvents(eventArray: Array<() => void | null>) {
    this.evnets = eventArray;
  }

  /**
   * Remove events
   */
  protected removeEvents() {
    this.evnets.forEach((eventFunction: () => void | null) => {
      if (typeof eventFunction === 'function') eventFunction();
    });
  }

  /**
   * Append Chart
   */
  protected appendCanvasLayer() {
    if (this.topLevelNode) {
      this.topLevelNode.innerHTML = '';
      this.topLevelNode.appendChild(this.canvasContainer);
    }
  }
}

export default Canvas;
