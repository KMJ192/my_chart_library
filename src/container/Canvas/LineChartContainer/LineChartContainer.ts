import LineChartComponent from '@src/component/Canvas/LineChartComponent';

function LineChartContainer() {
  const series = {
    left: [
      {
        color: 'red',
        name: 'left1',
        lineWidth: 1,
        series: [9, 3, 3, 4, 5, 9, 3, 3, 4, 5, 9, 3, 3, 4, 5],
      },
      {
        color: 'blue',
        name: 'left2',
        lineWidth: 1,
        series: [10, 4, 7, 8, 7, 10, 4, 7, 8, 7, 10, 4, 7, 8, 7],
      },
    ],
    right: [
      {
        series: [42, 32, 41, 32, 47, 42, 32, 41, 32, 47, 42, 32, 41, 32, 47],
        name: 'right1',
        lineWidth: 1,
        color: '#8D3F47',
      },
      {
        name: 'right2',
        series: [32, 25, 23, 29, 10, 32, 25, 23, 29, 10, 32, 25, 23, 29, 10],
        lineWidth: 2,
        color: '#FD3FA7',
      },
    ],
  };
  const axis = {
    bottom: {
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
    left: {
      name: 'left axis',
      unitsPerTick: 1,
      tickSize: 7,
      lineWidth: 1,
    },
    right: {
      name: 'right axis',
      unitsPerTick: 10,
      tickSize: 7,
      lineWidth: 1,
    },
  };
  const renderOption = {
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
