import * as CSS from 'csstype';

interface CanvasLayer {
  type: 'main' | 'animation' | 'static';
  canvasStyle?: CSS.Properties;
  id?: string;
}

interface CanvasLayerExt extends CanvasLayer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
}

interface CanvasChartParam {
  id: string;
  width: number;
  height: number;
  canvasLayer: CanvasLayer[];
}

export { CanvasChartParam, CanvasLayerExt, CanvasLayer };
