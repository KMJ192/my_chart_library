import { Properties as CSSProperties } from 'csstype';

interface CanvasLayer {
  type: 'main' | 'animation' | 'static';
  canvasStyle?: CSSProperties;
  id?: string;
}

interface CanvasLayerExt extends CanvasLayer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
}

interface CanvasParam {
  id: string;
  width: number;
  height: number;
  canvasLayer: CanvasLayer[];
  font: string;
}

export { CanvasParam, CanvasLayerExt, CanvasLayer };
