use serde::{Serialize, Deserialize};

#[derive(Clone, Serialize, Deserialize)]
pub struct HoverType {
  chart_color: String,
  font_color: Option<String>,
  font_style: Option<String>,
}

#[derive(Clone, Serialize, Deserialize)]
pub struct TextType {
  text: String,
  visible: Option<bool>,
  color: Option<String>,
  style: Option<String>,
}

pub struct SizeType {
  width: i32,
  height: i32,
}

pub struct PositionType {
  x: i32,
  y: i32,
}

#[derive(Clone, Serialize, Deserialize)]
pub struct PieChartData {
  title: Option<TextType>,
  value: f64,
  fill_color: String,
  hover: Option<HoverType>,
}

// #[derive(Clone, Serialize, Deserialize)]
pub struct PieChartElement {
  title: Option<TextType>,
  value: f64,
  fill_color: String,
  hover: Option<HoverType>,
  angle_value: f64,
}

pub struct PieChartEachArea {
  title: Option<TextType>,
  start_end_degree: f64,
  hover: Option<HoverType>
}

#[derive(Clone, Serialize, Deserialize)]
pub struct DisplayValueType {
  visible: bool,
  color: String,
  style: String,
}