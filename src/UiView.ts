import { primaryPieChart, donutChart } from './PieChart/PieChartView';
import { ViewListParam, UiViewTypes, ToggleType } from './viewTypes';

import './style/UiView.scss';
import { primaryLineChart } from './LineChart/LineChartView';

export const root = document.getElementById('root');
export const chartList: UiViewTypes[] = [
  primaryLineChart,
  donutChart,
  primaryPieChart,
];

export class UiView {
  private root: HTMLElement | null;

  private viewList: UiViewTypes[];

  private topElement: HTMLDivElement | null;

  private toggleTabName: ToggleType;

  private classNames: {
    container: string;
    title: string;
    topContensts: string;
    header: string;
    tabs: string;
    tabButton: string;
    viewBox: string;
    codeBox: string;
    active: string;
    hide: string;
  };

  constructor(param: ViewListParam) {
    const { viewList, eleId } = param;

    this.viewList = viewList;

    this.root = document.getElementById(eleId);

    this.topElement = null;

    this.toggleTabName = {
      preview: 'Preview',
      code: 'Code',
    };

    this.classNames = {
      container: 'chart-view-container',
      title: 'chart-title',
      topContensts: 'chart-top-content',
      header: 'header',
      tabs: 'tabs',
      tabButton: 'tab-button',
      viewBox: 'view-box',
      codeBox: 'code-box',
      active: 'active',
      hide: 'hide',
    };
  }

  private topContentRender(chartName: string) {
    const { classNames } = this;

    const topElement = document.createElement('div');
    topElement.className = 'chart-top-content';

    const titleElement = `
      <div class='${classNames.title}'>
        ${chartName}
      </div>
      <div class='${classNames.tabs}'>
        <div class='${classNames.tabButton} view ${classNames.active}'>${this.toggleTabName.preview}</div>
        <div class='${classNames.tabButton} code ${classNames.hide}'>${this.toggleTabName.code}</div>
      </div>
    `;
    topElement.insertAdjacentHTML('afterbegin', titleElement);

    return topElement;
  }

  private bodyContentRender({
    renderChart,
    renderCode,
    chartName,
    viewPreview,
  }: UiViewTypes) {
    const { classNames } = this;
    this.topElement = this.topContentRender(chartName);

    const renderingContainer = document.createElement('div');
    renderingContainer.className = classNames.container;
    renderingContainer.insertAdjacentElement('afterbegin', this.topElement);

    const viewBox = document.createElement('div');
    const codeBox = document.createElement('div');

    viewBox.classList.add(classNames.viewBox);
    viewBox.classList.add(classNames.active);
    codeBox.classList.add(classNames.codeBox);
    codeBox.classList.add(classNames.hide);

    if (viewPreview === this.toggleTabName.preview) {
      viewBox.classList.add(classNames.active);
      codeBox.classList.remove(classNames.hide);
    } else if (viewPreview === this.toggleTabName.code) {
      viewBox.classList.add(classNames.hide);
      codeBox.classList.remove(classNames.active);
    }

    const canvas = renderChart();
    viewBox.appendChild(canvas);

    codeBox.innerHTML = renderCode();

    renderingContainer.appendChild(viewBox);
    renderingContainer.appendChild(codeBox);

    this.root?.insertAdjacentElement('afterbegin', renderingContainer);
  }

  uiViewRender() {
    const { classNames } = this;
    const header = `<div class='${classNames.header}'>Chart Library</div>`;

    const tabClick = (e: MouseEvent) => {
      const { toggleTabName, classNames } = this;
      const element = e.target as Element;
      const node = e.target as Node;
      const value = e.target as HTMLElement;

      const preview = value.innerText === toggleTabName.preview;
      const code = value.innerText === toggleTabName.code;

      element.nextSibling;

      if (preview === true) {
        // preview tab active
        element.classList.add(classNames.active);
        element.classList.remove(classNames.hide);

        element.nextElementSibling?.classList.add(classNames.hide);
        element.nextElementSibling?.classList.remove(classNames.active);
      } else if (code === true) {
        // code tab active
        element.classList.add(classNames.active);
        element.classList.remove(classNames.hide);

        element.previousElementSibling?.classList.add(classNames.hide);
        element.previousElementSibling?.classList.remove(classNames.active);
      }

      let container: HTMLElement | null = null;
      const findContainer = (node: Node) => {
        const ele = node as Element;
        if (ele.id === this.root?.id) return;
        if (node.parentElement) {
          for (let i = 0; i < ele.classList.length; i++) {
            if (ele.classList[i] === classNames.container) {
              container = ele as HTMLElement;
              return;
            }
          }
          // classname이 classNames.container일때 까지 recursion call
          findContainer(node.parentElement);
        }
      };

      findContainer(node);

      if (container !== null && container !== this.root?.id) {
        const childNodes = (container as Element).childNodes;
        childNodes.forEach((element: Node) => {
          const ele = element as Element;
          const classList = ele.classList;
          for (let i = 0; i < classList.length; i++) {
            if (preview) {
              // chart active
              if (classList[i] === classNames.viewBox) {
                ele.classList.add(classNames.active);
                ele.classList.remove(classNames.hide);
              }
              if (classList[i] === classNames.codeBox) {
                ele.classList.add(classNames.hide);
                ele.classList.remove(classNames.active);
              }
            } else if (code) {
              // code active
              for (let i = 0; i < classList.length; i++) {
                if (classList[i] === classNames.codeBox) {
                  ele.classList.add(classNames.active);
                  ele.classList.remove(classNames.hide);
                }
                if (classList[i] === classNames.viewBox) {
                  ele.classList.add(classNames.hide);
                  ele.classList.remove(classNames.active);
                }
              }
            }
          }
        });
      }
    };

    this.viewList.forEach((element: UiViewTypes) => {
      const bodyContent: UiViewTypes = {
        chartName: element.chartName,
        renderChart: element.renderChart,
        renderCode: element.renderCode,
        viewPreview: element.viewPreview,
      };

      this.topContentRender(element.chartName);

      this.bodyContentRender(bodyContent);

      // preview(차트) | code(코드) 선택 이벤트
      const tabs: HTMLCollectionOf<Element> = document.getElementsByClassName(
        classNames.tabButton,
      );
      for (let i = 0; i < tabs.length; i++) {
        (tabs[i] as HTMLDivElement).addEventListener('click', tabClick);
      }
    });

    this.root?.insertAdjacentHTML('beforebegin', header);
  }
}

export default UiView;
