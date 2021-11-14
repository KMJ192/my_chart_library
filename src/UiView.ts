import { primaryPieChart, donutChart } from './PieChart/PieChartView';
import { ViewListParam, UiViewTypes, BodyContentsType, TopContentsType } from './viewTypes';

import './style/UiView.scss';

export const root = document.getElementById('root');
export const chartList: UiViewTypes[] = [primaryPieChart, donutChart];

export class UiView {
  private root: HTMLElement | null;

  private viewList: UiViewTypes[];

  private topElement: HTMLDivElement | null;

  constructor(param: ViewListParam) {
    const { viewList, eleId } = param;
    this.viewList = viewList;
    this.root = document.getElementById(eleId);
    this.topElement = null;
  }

  private topContentRender({ chartName, viewPreview }: TopContentsType) {
    const priviewActive = viewPreview ? 'active' : 'hide';
    const codeActive = viewPreview ? 'hide' : 'active';

    const topElement = document.createElement('div');
    topElement.className = 'chart-top-content';

    const titleElement = `
      <div class='chart-title'>
        ${chartName}
      </div>
      <div class='tabs'>
        <div class='tab-button view ${priviewActive}'>Preview</div>
        <div class='tab-button code ${codeActive}'>Code</div>
      </div>
    `;
    topElement.insertAdjacentHTML('afterbegin', titleElement);

    return topElement;
  }

  private bodyContentRender({ renderChart, renderCode, chartName }: BodyContentsType) {
    const topContentsParam: TopContentsType = {
      chartName,
      viewPreview: true,
    };
    this.topElement = this.topContentRender(topContentsParam);

    const renderingContainer = document.createElement('div');
    renderingContainer.className = 'chart-view-container';
    renderingContainer.insertAdjacentElement('afterbegin', this.topElement);

    const viewBox = document.createElement('div');
    const codeBox = document.createElement('div');
    viewBox.className = 'view-box';
    codeBox.className = 'code-box';

    const canvas = renderChart();
    viewBox.appendChild(canvas);

    const html = `
      <div class='code'>
        ${renderCode()}
      </div>
    `;

    codeBox.innerHTML = html;

    renderingContainer.appendChild(viewBox);
    renderingContainer.appendChild(codeBox);

    this.root?.appendChild(renderingContainer);
  }

  uiViewRender() {
    const header = `<div class='header'>Chart Library</div>`;

    this.viewList.forEach((element: UiViewTypes) => {
      const topContent = {
        chartName: element.chartName,
        viewPreview: element.viewPreview,
      };

      const bodyContent: BodyContentsType = {
        chartName: element.chartName,
        renderChart: element.renderChart,
        renderCode: element.renderCode,
      };

      this.topContentRender(topContent);

      this.bodyContentRender(bodyContent);
    });

    this.root?.insertAdjacentHTML('beforebegin', header);
  }
}

export default UiView;
