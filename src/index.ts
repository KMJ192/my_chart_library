import UiView, { chartList } from './UiView';
import './style/style.css';
import { pieChartMockData } from './MockData';

const param = {
  eleId: 'root',
  viewList: chartList,
};
const uiView = new UiView(param);
uiView.uiViewRender();

const temp = {
  ele_id: 'test',
  chart_type: 'primary',
  input_data: pieChartMockData,
  chart_size: 500,
  total_value: 50,
  chart_fill_color: 'rgb(230, 230, 230)',
  display_value_to_center: {
    visible: true,
    color: 'black',
    style: 'normal bold 20px serif',
  },
};

import('@wasm').then((module: any) => {
  module.pie_chart_module();
});
