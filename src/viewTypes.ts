export interface ViewListParam {
  eleId: string;
  viewList: UiViewTypes[];
}

export interface TopContentsType {
  chartName: string;
  viewPreview: boolean;
}

export interface BodyContentsType {
  chartName: string;
  renderChart: () => HTMLCanvasElement;
  renderCode: () => string;
}

export interface UiViewTypes {
  chartName: string;
  viewPreview: boolean;
  renderChart: () => HTMLCanvasElement;
  renderCode: () => string;
}
