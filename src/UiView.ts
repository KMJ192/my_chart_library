import { primaryPieChart, donutChart } from './PieChart/PieChartView';
import { ViewListParam } from './viewTypes';

import './style/UiView.scss';

const root = document.getElementById('root');
const chartList = [primaryPieChart, donutChart];

function viewList({ renderChart, renderCode, chartName }: ViewListParam) {
  const titleElement = document.createElement('div');
  const title = `<div class='chart-title'>${chartName}</div>`;
  titleElement.innerHTML = title;

  const renderingContainer = document.createElement('div');
  renderingContainer.className = 'chart-view-container';
  renderingContainer.insertAdjacentElement('afterbegin', titleElement);

  const viewBox = document.createElement('div');
  const codeBox = document.createElement('div');
  viewBox.className = 'view-box';
  codeBox.className = 'code-box';

  const canvas = renderChart();
  viewBox.appendChild(canvas);

  const html = `
      <div class='explanation'>code</div>
      <div class='code'>
        ${renderCode()}
      </div>
  `;

  codeBox.innerHTML = html;

  renderingContainer.appendChild(viewBox);
  renderingContainer.appendChild(codeBox);

  root?.appendChild(renderingContainer);
}

function UiView() {
  const header = `<div class='header'>Chart Library</div>`;

  chartList.forEach((ele: ViewListParam) => {
    viewList(ele);
  });

  root?.insertAdjacentHTML('beforebegin', header);
}

export default UiView;
