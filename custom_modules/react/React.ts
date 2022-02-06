import debounceFrame from './debounceFrame';
import { React, ReactClosureOptions, ReactDOM } from './types';
import { createDOM } from './utils/untils';

const React: React = (function () {
  const _this: ReactClosureOptions = {
    stateKey: 0,
    states: [],
    root: null,
    component: null,
    unmount: undefined,
    injected: {
      event: () => {},
      unmount: undefined,
    },
  };

  const reactRenderer = debounceFrame(() => {
    const { root, component } = _this;
    if (!root || !component) return;
    const vDOM: ReactDOM[] | ReactDOM | null = component();

    root.innerHTML = '';
    createDOM(root as HTMLElement, vDOM);
    _this.stateKey = 0;
    _this.injected.unmount = _this.injected.event();
  });

  function useState<T>(initState: T): [T, (newState: T) => void] {
    const { states, stateKey: key } = _this;
    if (states.length === key) {
      states.push(initState);
    }
    const state = states[key];
    const setState = (newState: T) => {
      if (newState === state) return;
      if (JSON.stringify(newState) === JSON.stringify(state)) return;
      state[key] = newState;
      reactRenderer();
    };
    _this.stateKey += 1;
    return [state, setState];
  }

  function useEffect(effect: () => any, depsArray?: Array<any>) {
    const { states, stateKey: key } = _this;
    const hasNoDeps = !depsArray;
    const deps = states[key];
    const hasChangedDeps = deps
      ? !depsArray?.every(
          (element: AnalyserNode, i: number) => element === deps[i],
        )
      : true;
    if (hasNoDeps || hasChangedDeps) {
      _this.unmount = effect();
      states[key] = depsArray;
    }
    _this.stateKey += 1;
  }

  function useDocument(event: () => any) {
    _this.injected.event = event;
  }

  function render(
    component: (() => ReactDOM[]) | (() => ReactDOM),
    rootElement: Element | null,
  ) {
    _this.component = component;
    _this.root = rootElement;
    reactRenderer();
  }

  function routeRender() {
    _this.states = [];
    if (_this.unmount) {
      _this.unmount();
    }

    if (_this.injected.unmount) {
      _this.injected.unmount();
    }
    reactRenderer();
  }

  return {
    useState,
    useEffect,
    useDocument,
    render,
    routeRender,
  };
})();

export const { useState, useEffect, useDocument } = React;
export { ReactDOM };
export default React;
