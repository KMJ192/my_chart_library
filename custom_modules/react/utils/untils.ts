import { ReactDOM } from '../types';

const makeNode = (node: HTMLElement, dom?: ReactDOM) => {
  if (!dom || (!dom.tagName && !dom.node)) {
    return;
  }
  const { tagName, event, props, childNode, frontStringNode, backStringNode } =
    dom;
  const element = dom.node || document.createElement(tagName);

  if (props) {
    for (const [key, value] of Object.entries(props)) {
      (element as any)[key] = value;
    }
  }

  if (event) {
    if (Array.isArray(event)) {
      event.forEach((e: { type: string; eventFunc: () => void }) => {
        const { type, eventFunc } = e;
        element.addEventListener(type, eventFunc);
      });
    } else {
      const { type, eventFunc } = event;
      element.addEventListener(type, eventFunc);
    }
  }

  if (frontStringNode !== undefined) {
    node.insertAdjacentText('beforeend', frontStringNode);
  }
  if (element) {
    node.insertAdjacentElement('beforeend', element);
  }
  if (backStringNode !== undefined) {
    node.insertAdjacentText('beforeend', backStringNode);
  }
  if (childNode !== undefined) {
    createDOM(element, childNode);
  }
};

export const createDOM = (
  node: HTMLElement,
  dom?: ReactDOM[] | ReactDOM | string | null,
) => {
  if (dom === undefined || dom === null) {
    return;
  }
  if (typeof dom === 'string') {
    node.innerHTML = dom;
    return;
  }
  if (Array.isArray(dom)) {
    dom.forEach((d: ReactDOM | string) => {
      if (typeof d === 'string') {
        console.error('문자열 노드는 배열로 할당할 수 없음.');
      } else {
        makeNode(node, d);
      }
    });
    return;
  }

  makeNode(node, dom);
};
