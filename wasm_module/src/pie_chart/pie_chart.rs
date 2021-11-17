use wasm_bindgen::JsCast;
use web_sys::*;
use std::f64::{consts::PI};
use serde::{Serialize, Deserialize};

use super::document::document_object::*;

#[path="./pie_chart_types.rs"] pub mod pie_chart_types;
use pie_chart_types::*;

pub struct PieChart {
  canvas: Option<HtmlCanvasElement>,
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

#[derive(Clone, Serialize, Deserialize)]
pub struct PieChartParam {
  pub ele_id: String,
  pub chart_type: Option<String>,
  pub input_data: Vec<PieChartData>,
  pub chart_size: Option<u32>,
  pub total_value: Option<f64>,
  pub chart_fill_color: Option<String>,
  pub display_value_to_center: Option<DisplayValueType>,
}

impl PieChart {
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
  pub fn init(&mut self, param: PieChartParam) {
    // set canvas
    let ele_id: String = param.ele_id;
    let mut document = DocumentMethod::new();
    document.set_document();
    let canvas = document.document_set_html_canvas(ele_id);

    self.canvas = canvas;

    // set canvas info(size, 2d context)
    let mut width: u32 = 0;
    let mut height: u32 = 0;
    if let Some(chart_size) = param.chart_size {
      width = chart_size;
      height = chart_size;
    };

    if let Some(canvas) = &self.canvas {
      let ctx: CanvasRenderingContext2d = canvas.get_context("2d")
                                            .unwrap()
                                            .unwrap()
                                            .dyn_into::<CanvasRenderingContext2d>()
                                            .unwrap();
      self.ctx = Some(ctx);
      canvas.set_width(width);
      canvas.set_height(height);
    }

    // set input data
    self.input_data = param.input_data;

    // chart_type save
    if let Some(chart_type) = param.chart_type {
      self.chart_type = chart_type;
    } else {
      self.chart_type = String::from("primary");
    }
    
    // chart color 설정
    if let Some(chart_fill_color) = param.chart_fill_color {
      self.chart_fill_color = chart_fill_color;
    } else {
      self.chart_fill_color = String::from("'rgb(230, 230, 230)'");
    }

    // total value 설정
    if let Some(total_value) = param.total_value {
      self.total_value = total_value;
    }

    // display value to center
    if let Some(display_value_to_center) = param.display_value_to_center {
      self.display_value_to_center = Some(display_value_to_center);
    }
  }
}
