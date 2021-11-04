// import('../wasm_module/pkg').then((module) => module.console_test('test'));
function test() {
  const temp = document.getElementById('root');
  console.log(temp);
  import('../wasm_module/pkg').then((module) => module.console_test('test'));
}
test();
