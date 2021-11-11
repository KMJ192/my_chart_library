import { renderPieChart, renderPieChartCode } from './PieChart/PieChartView';
import './style/UiView.scss';

function UiView() {
  const header = `<div class='header'>Chart Library</div>`;

  const root = document.getElementById('root');
  const renderingContainer = document.createElement('div');
  renderingContainer.className = 'chart-view-container';

  const viewBox = document.createElement('div');
  const codeBox = document.createElement('div');
  viewBox.className = 'view-box';
  codeBox.className = 'code-box';

  const canvas = renderPieChart();
  viewBox.appendChild(canvas);

  const html = `
    <div class='code-body'>
      <div class='explanation'>code</div>
      <div class='code'>
        ${renderPieChartCode()}
      </div>
    </div>
  `;

  codeBox.innerHTML = html;

  renderingContainer.appendChild(viewBox);
  renderingContainer.appendChild(codeBox);

  root?.appendChild(renderingContainer);
  root?.insertAdjacentHTML('beforebegin', header);
}

export default UiView;
