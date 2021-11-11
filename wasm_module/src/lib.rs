use wasm_bindgen::prelude::*;
use wasm_bindgen::JsValue;
use serde::{Serialize, Deserialize};

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}

pub mod pie_chart;
use pie_chart::*;

#[derive(Debug, Clone, Serialize, Deserialize)]
struct DataTitle {
    text: String,
    visible: Option<bool>,
    color: Option<String>,
    style: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct Param {
    ele_id: String,
    chart_type: Option<String>,
    chart_size: u32,
    data: Vec<DataTitle>,
    total_value: Option<u32>
}

#[wasm_bindgen]
pub fn pie_chart_module(param: &JsValue){
    let data: Param = param.into_serde().unwrap();
    println!("{:?}", data);
    // web_sys::console::log_1(&data);
}