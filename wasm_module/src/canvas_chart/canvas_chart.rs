use web_sys::{HtmlElement};

pub struct CanvasChart {
  perent_node: Option<HtmlElement>,
  parent_node_id: String,
  canvas_container: Option<HtmlElement>,
  tooltip: Option<HtmlElement>,
  tooltip_template: String,
  legend: Option<HtmlElement>,
  events: Vec<Box<dyn Fn()>>,
  width: u32,
  height: u32,
  main_chart_idx: usize,
  animation_chart_idx: usize,
}

impl CanvasChart {

}