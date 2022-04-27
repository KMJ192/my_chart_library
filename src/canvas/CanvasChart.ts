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

  protected evnets: Array<any>;

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
     * canvas layer 설정
     */
    this.topLevelNode = document.getElementById(id);

    this.canvasContainer = document.createElement('div');

    this.canvasContainer.style.position = 'relative';

    this.mainChartIdx = 0;

    this.animationChartIdx = 1;

    this.canvasLayer = [];

    canvasLayer.forEach((level: CanvasLayer, idx) => {
      const { type, id, canvasStyle } = level;
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

      this.canvasLayer[idx].ctx = this.canvasLayer[idx].canvas.getContext('2d');
      this.canvasLayer[idx].canvas.style.position = 'absolute';
      this.canvasLayer[idx].canvas.style.width = '100%';

      this.canvasLayer[idx].canvas.width = width * dpr;
      this.canvasLayer[idx].canvas.height = height * dpr;
      this.canvasLayer[idx].ctx?.scale(dpr, dpr);
      this.canvasContainer.appendChild(this.canvasLayer[idx].canvas);

      if (canvasStyle) {
        Object.entries(canvasStyle).forEach(([key, value]) => {
          if (key !== 'position' && key !== 'width')
            (this.canvasLayer[idx].canvas?.style as any)[key] = value;
        });
      }
    });

    this.evnets = [];

    this.tooltip = null;

    this.tooltipHTMLTemplate = '';

    this.legend = null;

    this.width = this.defaultValue.value;

    this.height = this.defaultValue.value;
  }

  /**
   * canvasLayer의 canvasIdx canvas의 rect 수정
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

  // protected ctxClear() {
  //   const { canvasLayer } = this;
  //   canvasLayer.forEach((layer: CanvasLayerExt) => {
  //     const { canvas, ctx } = layer;
  //     ctx?.clearRect(0, 0, canvas.width, canvas.height);
  //   });
  // }

  protected mousePosition = (x: number, y: number) => {
    const { canvas } = this.canvasLayer[this.mainChartIdx];
    const bbox = canvas.getBoundingClientRect();
  };
}

export default Canvas;
