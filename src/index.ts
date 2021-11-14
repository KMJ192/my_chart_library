import UiView, { chartList } from './UiView';
import './style/style.css';

const param = {
  eleId: 'root',
  viewList: chartList,
};
const uiView = new UiView(param);
uiView.uiViewRender();

const temp = {
  ele_id: 'test',
};

import('@wasm').then((module: any) => {
  module.pie_chart_module(temp);
});
