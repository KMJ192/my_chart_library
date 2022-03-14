use web_sys::*;
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsValue;
use serde::{Serialize, Deserialize};

pub mod document;
pub mod canvas_chart;

#[wasm_bindgen]
pub fn wasm_module() {
  web_sys::console::log_1(&"1".into());
}