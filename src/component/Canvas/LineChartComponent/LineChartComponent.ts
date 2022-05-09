import { useDocument } from '@react/React';
import Graph from '@src/canvas/Graph';
import { GraphParam } from '@src/canvas/Graph/types';

interface Props {
  series: any;
  axis: any;
  renderOption: any;
}

function LineChartComponent({ series, axis, renderOption }: Props) {
  useDocument(() => {
    const param: GraphParam = {
      id: 'layer',
    };

    const data = {};

    const LineGraph = new Graph(param);
    LineGraph.initialize = data;
    LineGraph.render();
  });

  return `
    <div id="layer" style="background-color: #FAFAFA;"></div>
  `;
}

export default LineChartComponent;
