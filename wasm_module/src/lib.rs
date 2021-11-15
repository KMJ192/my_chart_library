use wasm_bindgen::prelude::*;
use wasm_bindgen::JsValue;
use serde::{Serialize, Deserialize};

#[cfg(test)]
mod tests {
  #[test]
  fn it_works() {
    assert_eq!(2 + 2, 4);
  }
}

pub mod pie_chart;
pub mod document;

use pie_chart::types::*;

#[wasm_bindgen]
pub fn pie_chart_module(param: &JsValue){
  // let data: PieChartParam = param.into_serde().unwrap();
  // web_sys::console::log_1(param);
}