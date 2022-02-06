interface React {
  useState<T>(initState: T): [T, (newVal: T) => void];
  useState<T = undefined>(
    initState?: T,
  ): [T | undefined, (newVal: T | undefined) => void];
  useEffect(effect: () => any, deps?: readonly any[]): void;
  useDocument(event: () => void): void;
}

interface ReactDOM {
  tagName: string;
  props?: {
    [key: string]: string;
  };
  event?:
    | {
        type: string;
        eventFunc: () => void;
      }
    | {
        type: string;
        eventFunc: () => void;
      }[];
  childNode?: ReactDOM | ReactDOM[] | string;
  key?: any;
  frontStringNode?: string;
  backStringNode?: string;
  node?: HTMLElement;
}

interface ReactClosureOptions {
  root: Element | null;
  stateKey: number;
  states: any[];
  component?: (() => ReactDOM[]) | (() => ReactDOM) | null;
  unmount?: () => void;
  injected: {
    event: () => any;
    unmount?: () => void;
  };
}

export { React, ReactClosureOptions, ReactDOM };
