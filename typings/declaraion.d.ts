declare module '@src';
declare module '@react';
declare module '@router';
declare module '@api';
declare module '@redux';
declare module '@wasm';

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

type ObjectType<K = any, V = any> = { [key: K]: V };
