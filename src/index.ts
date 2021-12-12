import UiView, { chartList } from './UiView';
import './style/style.css';
// import { pieChartMockData } from './MockData';

const param = {
  eleId: 'root',
  viewList: chartList,
};
const uiView = new UiView(param);
uiView.uiViewRender();
