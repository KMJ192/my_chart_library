use web_sys::*;
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

use pie_chart::{render_chart::*, types::*};

#[derive(Clone, Serialize, Deserialize)]
struct PieChartParam {
  id: String,
  chart_size: i32,
  chart_type: String,
  data: PieChartData,
  total_value: i32
}

#[wasm_bindgen]
pub fn pie_chart_module(param: &JsValue) {
  // console::log_1(&param.into());
  let p: PieChartParam = param.into_serde().unwrap();
  
  // println!("{:?}", p);

  // let test: PieChartParam = PieChartParam {
  //   ele_id: "",
  //   chart_type: None,
  //   chart_size: None,
  //   total_value: None,
  //   chart_fill_color: None,
  //   display_value_to_center: None,
  // };
}