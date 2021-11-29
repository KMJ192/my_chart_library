declare module '*.scss' {
  const content: { [className: string]: string };
  export = content;
}

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '@wasm';

// declare global {
//   interface LineChart {
//     getLongestValueWidth: () => void;
//   }
// }
