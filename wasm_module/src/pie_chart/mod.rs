use serde::{Serialize, Deserialize};

#[derive(Clone, Serialize, Deserialize)]
pub struct PieChartData {
  title: String,
  value: i32,
  color: String,
}

pub struct PieChart{
  canvas: web_sys::HtmlCanvasElement,
  ctx: web_sys::CanvasRenderingContext2d,
  data: PieChartData,
  chart_color: String,
  chart_bolder: String,
  visible_center_text: bool,
  center_text: String,
  data_label: String,
  total_value: u32,
}

impl PieChart {
  fn new(
    canvas: web_sys::HtmlCanvasElement,
    ctx: web_sys::CanvasRenderingContext2d,
    data: PieChartData,
    chart_color: String, 
    chart_bolder: String, 
    visible_center_text: bool,
    center_text: String,
    data_label: String,
    total_value: u32
  ) -> Self {
    PieChart {
      canvas,
      ctx,
      data,
      chart_color,
      chart_bolder,
      visible_center_text,
      center_text,
      data_label,
      total_value
    }
  }
}