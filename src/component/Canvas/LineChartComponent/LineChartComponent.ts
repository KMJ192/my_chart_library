import { useDocument } from '@react/React';
import LineChart from '@src/CanvasChart/AxisTypeChart/LineChart';

import {
  DataParamType,
  AxisParamType,
  RenderOption,
} from '@src/CanvasChart/AxisTypeChart/AxisTypeChartTypes';

interface Props {
  series: DataParamType;
  axis: AxisParamType;
  renderOption: RenderOption;
}

function LineChartComponent({ series, axis, renderOption }: Props) {
  useDocument(() => {
    const node = document.getElementById('layer');
    if (node) {
      const param = {
        node,
        point: 2,
        font: 'normal bold 12px SpoqaM',
        fontHeight: 12,
        renderOption,
      };
      const lineChart = new LineChart(param);
      lineChart.dataInitialize({ series, axis });
      lineChart.render(renderOption);
    }
  });

  return `
    <div id='layer' style='background-color: #FAFAFA; width: 1440px; height: 100%;'></div>
  `;
}

export default LineChartComponent;
