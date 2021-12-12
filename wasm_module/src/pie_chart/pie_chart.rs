use wasm_bindgen::JsCast;
use web_sys::*;
use std::f64::{consts::PI};
use serde::{Serialize, Deserialize};

use super::document::document_object::*;

#[path="./pie_chart_types.rs"] pub mod pie_chart_types;
use pie_chart_types::*;

// #[derive(Clone, Serialize, Deserialize)]
// pub struct PieChartParam<'a> {
//   canvas: Option<&'a HtmlCanvasElement>,
//   chart_type: String,
//   data: Vec<PieChartData>,
//   chart_fill_color: Option<String>
// }

pub struct PieChart<'a> {
  canvas: Option<&'a HtmlCanvasElement>,
  ctx: Option<CanvasRenderingContext2d>,
  chart_type: String,
  input_data: Vec<PieChartData>,
  expression_data: Vec<PieChartElement>,
  each_data_area: Vec<Vec<PieChartEachArea>>,
  chart_fill_color: String,
  total_value: f64,
  total_sum: f64,
  display_value_to_center: Option<DisplayValueType>,
  chart_size: Option<SizeType>,
  chart_position: Option<PositionType>,
  radius: f64,
  degree: f64,
  circumference: f64,
  chart_hovered: bool
}

impl<'a> PieChart<'a> {
  pub fn new() -> Self {
    PieChart {
      canvas: None,
      ctx: None,
      chart_type: String::from(""),
      input_data: vec![],
      expression_data: vec![],
      each_data_area: vec![],
      chart_fill_color: String::from(""),
      total_value: 0.0,
      total_sum: 0.0,
      display_value_to_center: None,
      chart_size: None,
      chart_position: None,
      radius: 0.0,
      degree: 0.0,
      circumference: PI / 180.0,
      chart_hovered: false,
    }
  }
  // pub fn init(&mut self, param: PieChartParam) {

  // }
}
