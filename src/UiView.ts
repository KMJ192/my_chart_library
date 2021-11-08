import PieChart from './PieChart';
import PieChartParam from './PieChart/PieChartTypes';

import { pieChartMockData } from './MockData';

import './style/UiView.scss';

function UiView() {
  const root = document.getElementById('root');
  const renderingContainer = document.createElement('div');
  renderingContainer.className = 'chart-view-container';

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = 500;
  canvas.height = 500;

  if (canvas && ctx) {
    const pieChartParam: PieChartParam = {
      canvas,
      ctx,
      data: pieChartMockData,
      pieChartBorder: 'border',
      centerText: {
        visible: true,
        text: 'centerText',
      },
      totalValue: 6,
    };
    const pieChart = new PieChart(pieChartParam);
    pieChart.draw();
    pieChart.hoverEvent();
  }

  renderingContainer.appendChild(canvas);
  root?.appendChild(renderingContainer);
}

export default UiView;
