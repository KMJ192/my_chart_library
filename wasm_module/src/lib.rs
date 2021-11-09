use wasm_bindgen::prelude::*;
use wasm_bindgen::JsValue;

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}

pub mod pie_chart;
use pie_chart::*;

#[wasm_bindgen]
pub fn pie_chart_module(param: &JsValue){
    web_sys::console::log_1(&param.into());
}