import { SeriesInfo } from '@src/canvas/Graph/types';
import { AxisInfo } from './types';

class Axis {
  // Axis를 계산하기 위해 필요한 것
  private axis: AxisInfo | null;

  private series: SeriesInfo | null;

  constructor() {
    this.axis = null;

    this.series = null;
  }

  private calcMax() {
    const { axis, series } = this;
    if (axis === null || series === null) return;

    // if (axis.bottomXAxis.max === 0 && axis.bottomXAxis.labels.length > 0) {
    //   axis.bottomXAxis.max = axis.bottomXAxis.labels.length - 1;
    // }
  }

  public initialize(axis: AxisInfo, series: SeriesInfo) {
    this.axis = axis;

    this.series = series;
  }
}

export default Axis;
