use wasm_bindgen::JsCast;
use web_sys::*;
use std::f64;
use serde::{Serialize, Deserialize};

use super::document::document_object::*;

#[path="./pie_chart_types.rs"] pub mod pie_chart_types;
use pie_chart_types::*;

pub struct PieChart {
  canvas: Option<HtmlCanvasElement>,
  ctx: Option<CanvasRenderingContext2d>,
  chart_type: Option<String>,
  input_data: Vec<PieChartData>,
  expression_data: Vec<PieChartElement>,
  each_data_area: Vec<Vec<PieChartEachArea>>,
  chart_fill_color: String,
  total_value: Option<f64>,
  total_sum: Option<f64>,
  display_value_to_center: Option<DisplayValueType>,
  canvas_size: SizeType,
  chart_position: PositionType,
  radius: f64,
  degree: f64,
  circumference: f64,
  chart_hovered: bool
}

pub struct PieChartParam {
  ele_id: String,
  chart_type: Option<String>,
  data: Vec<PieChartData>,
  chart_fill_color: Option<String>,
  chart_size: Option<f64>,
  total_value: Option<f64>,
  display_value_to_center: Option<DisplayValueType>,
}

impl PieChart {
  pub fn new(&mut self, param: PieChartParam) {
    let ele_id: String = param.ele_id;
    let mut document = DocumentMethod::new();
    document.set_document();
    let canvas = document.document_set_html_canvas(ele_id);
    if let Some(canvas) = canvas {
      let ctx: CanvasRenderingContext2d = canvas.get_context("2d")
                                            .unwrap()
                                            .unwrap()
                                            .dyn_into::<CanvasRenderingContext2d>()
                                            .unwrap();
    }

    // PieChart {
    //   canvas,
    //   ctx,
    // }
  }
}