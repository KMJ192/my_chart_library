// import UiView, { chartList } from './UiView';
// import './style/style.css';
// // import { pieChartMockData } from './MockData';

// const param = {
//   eleId: 'root',
//   viewList: chartList,
// };
// const uiView = new UiView(param);
// uiView.uiViewRender();

import React from '@react';

import App from './App';

React.render(App, document.getElementById('App'));

window.addEventListener('popstate', () => {
  React.routeRender();
});
