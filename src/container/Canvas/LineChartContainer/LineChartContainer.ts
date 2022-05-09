import { AxisType, RenderOption, SeriesInfo } from '@src/canvas/Graph/types';
import LineChartComponent from '@src/component/Canvas/LineChartComponent';

function LineChartContainer() {
  const series: SeriesInfo = {
    leftAxisInfo: [
      {
        name: 'left1',
        color: 'red',
        lineWidth: 1,
        vertex: [9, 3, 3, 4, 5, 9, 3, 3, 4, 5, 9, 3, 3, 4, 5],
      },
      {
        name: 'left2',
        color: 'blue',
        lineWidth: 1,
        vertex: [10, 4, 7, 8, 7, 10, 4, 7, 8, 7, 10, 4, 7, 8, 7],
      },
    ],
    rightAxisInfo: [
      {
        name: 'right1',
        vertex: [42, 32, 41, 32, 47, 42, 32, 41, 32, 47, 42, 32, 41, 32, 47],
        lineWidth: 1,
        color: '#8D3F47',
      },
      {
        name: 'right2',
        vertex: [32, 25, 23, 29, 10, 32, 25, 23, 29, 10, 32, 25, 23, 29, 10],
        lineWidth: 1,
        color: '#FD3FA7',
      },
    ],
  };

  const axis: AxisType = {
    bottomXAxis: {
      unitsPerTick: 3,
      name: 'X axis',
      tickSize: 7,
      lineWidth: 1,
      data: [
        '2022-02-07 09:00:00',
        '2022-02-07 13:00:00',
        '2022-02-07 17:00:00',
        '2022-02-07 21:00:00',
        '2022-02-08 01:00:00',
        '2022-02-07 09:00:00',
        '2022-02-07 13:00:00',
        '2022-02-07 17:00:00',
        '2022-02-07 21:00:00',
        '2022-02-08 01:00:00',
        '2022-02-07 09:00:00',
        '2022-02-07 13:00:00',
        '2022-02-07 17:00:00',
        '2022-02-07 21:00:00',
        '2022-02-08 01:00:00',
      ],
    },
    leftYAxis: {
      name: 'left axis',
      unitsPerTick: 1,
      tickSize: 7,
      lineWidth: 1,
    },
    rightYAxis: {
      name: 'right axis',
      unitsPerTick: 10,
      tickSize: 7,
      lineWidth: 1,
    },
  };

  const renderOption: RenderOption = {
    bottomAxis: true,
    bottomTick: true,
    bottomText: true,
    leftAxis: true,
    leftTick: true,
    leftText: true,
    rightAxis: true,
    rightTick: true,
    rightText: true,
    tooltip: true,
    legend: true,
    guideLine: true,
  };

  return LineChartComponent({ series, axis, renderOption });
}

export default LineChartContainer;
