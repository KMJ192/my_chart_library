import { ObjectType } from '@src/types';

interface CanvasLayer {
  type: 'static' | 'animation';
  id: string;
  canvasStyle: ObjectType;
}

interface Vector {
  x: number;
  y: number;
}

interface CanvasLayerType extends CanvasLayer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
}

interface CanvasChartParam {
  node: HTMLElement;
  width: number;
  height: number;
  canvasLayer: CanvasLayer[];
}

export { CanvasChartParam, CanvasLayerType, CanvasLayer, Vector };
