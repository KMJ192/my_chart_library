use std::f64;
use serde::{Serialize, Deserialize};

#[path="./pie_chart_types.rs"] pub mod pie_chart_types;

pub struct PieChart {
  canvas: web_sys::HtmlCanvasElement,
  ctx: web_sys::CanvasRenderingContext2d,
  data: Vec<pie_chart_types::PieChartData>,
  chart_type: String,
  input_data: Vec<pie_chart_types::PieChartData>
}