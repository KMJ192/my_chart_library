import { useDocument } from '@react/React';

// interface Props {
//   series: DataParamType;
//   axis: AxisParamType;
//   renderOption: RenderOption;
// }

interface Props {
  series: any;
  axis: any;
  renderOption: any;
}

function LineChartComponent({ series, axis, renderOption }: Props) {
  useDocument(() => {});

  return `
    <div id='layer' style='background-color: #FAFAFA;'></div>
    <div>test</div>
  `;
}

export default LineChartComponent;
