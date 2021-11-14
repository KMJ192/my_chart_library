export interface ViewListParam {
  eleId: string;
  viewList: UiViewTypes[];
}

export interface ToggleType {
  preview: string;
  code: string;
}

export interface UiViewTypes {
  chartName: string;
  viewPreview: string;
  renderChart: () => HTMLCanvasElement;
  renderCode: () => string;
}
