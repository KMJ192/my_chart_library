import { useDocument } from '@react';
import { useRedirection } from '@router';

import classNames from 'classnames/bind';
import style from './MainPage.module.scss';
const cx = classNames.bind(style);

function MainPage() {
  const moveToCanvasChart = () => {
    useRedirection('/line-chart');
  };
  useDocument(() => {
    const canvasBtn = document.getElementsByClassName(cx('canvas'));
    if (canvasBtn[0]) canvasBtn[0].addEventListener('click', moveToCanvasChart);
    return () => {
      if (canvasBtn[0])
        canvasBtn[0].removeEventListener('click', moveToCanvasChart);
    };
  });

  return `
    <button class=${cx('canvas')}>canvas</button>
  `;
}

export default MainPage;
