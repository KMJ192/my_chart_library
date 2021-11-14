use serde::{Serialize, Deserialize};

#[derive(Clone, Serialize, Deserialize)]
pub struct PieChartData {
  title: Option<String>,
  value: f64,
  fill_color: String,
  hover: Option<HoverType>,
}

#[derive(Clone, Serialize, Deserialize)]
pub struct DisplayValueType {
  visible: Option<bool>,
  color: Option<String>,
  style: Option<String>,
}

#[derive(Clone, Serialize, Deserialize)]
pub struct HoverType {
  chart_color: String,
  font_color: Option<String>,
  font_style: Option<String>,
}

#[derive(Clone, Serialize, Deserialize)]
pub struct PieChartParam {
  ele_id: String,
  chart_type: String,
  data: PieChartData,
  chart_fill_color: Option<String>,
  chart_size: u32,
  total_value: Option<f64>,
  display_value: Option<DisplayValueType>,
}
