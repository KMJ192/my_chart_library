pub struct HoverType {
  chart_color: String,
  font_color: Option<String>,
  font_style: Option<String>,
}

pub struct PieChartData {
  title: Option<String>,
  value: f64,
  fill_color: String,
  hover: Option<HoverType>,
}

pub struct PieChartParam<'a, 'b> {
  canvas: &'a web_sys::HtmlCanvasElement,
  ctx: &'b web_sys::CanvasRenderingContext2d,
  data: PieChartData,
  chart_fill_color: Option<String>,
  chart_size: Option<u32>,
  total_value: Option<u32>
}

// use std::f64;
// use serde::{Serialize, Deserialize};

// #[derive(Clone, Serialize, Deserialize)]
// pub struct PieChartData<'title, 'color> {
//   title: Option<String>,
//   value: i32,
//   color: &'color ::wasm_bindgen::JsValue,
// }

// pub struct PieChartElement<'color> {
//   title: Option<String>,
//   value: i32,
//   color: &'color ::wasm_bindgen::JsValue,
//   angle_value: f64,
// }

// pub struct ChartSize {
//   width: f64,
//   height: f64,
// }

// pub struct PieChart<'a, 'b, 'c> {
//   canvas: &'a web_sys::HtmlCanvasElement,
//   ctx: &'b web_sys::CanvasRenderingContext2d,
//   data: Vec<PieChartData<'c>>,
//   chart_color: Option<String>,
//   chart_bolder: String,
//   chart_size: ChartSize,
//   visible_center_text: bool,
//   center_text: String,
//   data_label: String,
//   total_value: Option<i32>,
//   input_data: Vec<PieChartData<'c>>,
//   expression_data: Vec<PieChartElement>,
//   degree: f64,
//   radius: f64,
//   circumference: f64,
// }

// impl<'a, 'b> PieChart<'a, 'b> {
//   fn new(
//     canvas: &'a web_sys::HtmlCanvasElement,
//     ctx: &'b web_sys::CanvasRenderingContext2d,
//     data: Vec<PieChartData>,
//     chart_color: Option<String>,
//     chart_bolder: String, 
//     visible_center_text: bool,
//     center_text: String,
//     data_label: String,
//     total_value: Option<i32>
//   ) -> Self {
//     PieChart {
//       canvas,
//       ctx,
//       data,
//       chart_color,
//       chart_bolder,
//       chart_size: ChartSize {
//         width: canvas.offset_width() as f64,
//         height: canvas.offset_height() as f64,
//       },
//       visible_center_text,
//       center_text,
//       data_label,
//       total_value,
//       input_data: vec![],
//       expression_data: vec![],
//       degree: 360.0,
//       radius: 0.0,
//       circumference: f64::consts::PI * 2.0,
//     }
//   }

//   fn calc_data(&mut self) {
//     let mut total_sum: i32 = 0;
//     let mut moduler: i32 = 0;
//     if self.input_data.len() > 0 {
//       for i in 0..self.input_data.len() {
//         total_sum += self.input_data[i].value;
//       }
//     }
    
//     if let Some(tv) = self.total_value {
//       moduler = tv - total_sum;
//     }

//     if self.input_data.len() > 0 {
//       for i in 0..self.input_data.len() {
//         let _element = &self.input_data[i];
//         let mut rate: f64 = 0.0;

//         if let Some(tv) = self.total_value {
//           rate = _element.value as f64 / tv as f64;
//         } else {
//           rate = _element.value as f64 / total_sum as f64;
//         }

//         self.expression_data.push(PieChartElement {
//           title: 
//             if let Some(title) = &_element.title { Some(title.clone()) }
//             else { None },
//           value: _element.value,
//           color: _element.color.clone(),
//           angle_value: self.degree * rate,
//         });
//       }
//     }

//     if let Some(tv) = self.total_value {
//       if moduler > 0 {
//         let rate = moduler as f64 / tv as f64;
//         self.expression_data.push(PieChartElement {
//           title: None,
//           value: moduler,
//           color: 
//             if let Some(cc) = &self.chart_color { cc.clone() }
//             else { String::from("rgb(230, 230, 230)") },
//           angle_value: self.degree * rate
//         });
//       }
//     }
//   }

//   fn drawChart(&mut self) {
//     self.degree = 0.0;
//     for i in 0..self.expression_data.len() {
//       let _element = &self.expression_data[i];
//       self.ctx.save();

//       self.ctx.begin_path();
//       self.ctx.move_to(self.chart_size.width / 2.0, self.chart_size.height / 2.0);
//       self.ctx.set_fill_style(&_element.color.into());
//     }
//   }
// }