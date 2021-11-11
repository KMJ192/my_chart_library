import PieChart from './PieChart';
import PieChartParam, { defaultChartValue } from './PieChart/PieChartTypes';

import { renderPieChart } from './PieChart/PieChartView';

import { pieChartMockData } from './MockData';

import './style/UiView.scss';

function UiView() {
  const root = document.getElementById('root');
  const renderingContainer = document.createElement('div');
  renderingContainer.className = 'chart-view-container';

  const viewBox = document.createElement('div');
  const codeBox = document.createElement('div');
  viewBox.className = 'view-box';
  codeBox.className = 'code-box';

  root?.appendChild(renderingContainer);
}

export default UiView;
