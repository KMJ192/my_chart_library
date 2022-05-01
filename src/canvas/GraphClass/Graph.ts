import Canvas from '../Canvas';

import Axis from './Unit/Axis';
import Line from './Unit/Line';
import Tooltip from './Unit/Tooltip';
import Bar from './Unit/Bar';

// types
import { GraphParam } from './types';
import Legend from './Unit/Legend';

class Graph extends Canvas {
  private line: Line;

  private bar: Bar;

  private legend: Legend;

  private tooltip: Tooltip;

  private axis: Axis;

  constructor(param: GraphParam) {
    super({
      id: param.id,
      width: param.width,
      height: param.height,
      canvasLayer: param.canvasLayer,
      font: param.font,
    });

    this.line = new Line();

    this.bar = new Bar();

    this.legend = new Legend();

    this.tooltip = new Tooltip();

    this.axis = new Axis();
  }

  private drawMouseOver = () => {};

  set initialize(data: any) {}

  public render = () => {
    this.addEvents([]);

    return () => {
      this.removeEvents();
    };
  };
}
export default Graph;
