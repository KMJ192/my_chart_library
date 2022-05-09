import Canvas from '../Canvas';

import Axis from './Unit/Axis';
import Line from './Unit/Line';
import Tooltip from './Unit/Tooltip';
import Bar from './Unit/Bar';
import Legend from './Unit/Legend';

// types
import { GraphParam } from './types';

class Graph extends Canvas {
  private line: Line;

  private bar: Bar;

  private legend: Legend;

  private tooltip: Tooltip;

  private axis: Axis;

  constructor(param: GraphParam) {
    super({
      id: param.id,
      canvasLayer: [
        {
          type: 'main',
          id: 'data-graph',
        },
        {
          type: 'animation',
          id: 'guide-line',
        },
        {
          type: 'static',
          id: 'static-line',
        },
      ],
      width: param.width || 1800,
      height: param.height || 700,
      font: param.font || '',
    });

    this.line = new Line();

    this.bar = new Bar();

    this.legend = new Legend();

    this.tooltip = new Tooltip();

    this.axis = new Axis();

    this.width = 0;

    this.height = 0;
  }

  private drawMouseOver = () => {};

  set initialize(data: any) {}

  public render = () => {
    this.addEvents([]);

    this.appendCanvasLayer();

    return () => {
      this.removeEvents();
    };
  };
}
export default Graph;
