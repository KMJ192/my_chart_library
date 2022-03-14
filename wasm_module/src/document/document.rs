use wasm_bindgen::JsCast;
use web_sys::*;

pub struct DocumentMethod {
  window: Option<Window>,
  document: Option<Document>,
}

impl DocumentMethod {
  pub fn new() -> Self {
    DocumentMethod{
      window: None,
      document: None,
    }
  }

  pub fn set_document(&mut self) {
    self.window = Some(window().expect("window does not exist"));
    if let Some(window) = &self.window {
      let win: Document = window.document().expect("expecting a document on window");
      self.document = Some(win);
    }
  }

  pub fn get_element_by_id(&self, id: String) -> Option<HtmlElement> {
    if let Some(document) = &self.document {
      let node: HtmlElement 
        = document.get_element_by_id(&id)
          .unwrap()
          .dyn_into::<HtmlElement>()
          .unwrap();
      return Some(node);
    }
    None
  }

  pub fn get_elements_classname(&self, id: String) -> Option<HtmlCollection>{
    if let Some(document) = &self.document {
      let node_list = document.get_elements_by_class_name(&id);

      return Some(node_list);
    }
    None
  }

  pub fn create_element(&self, ele_type: String) -> Option<HtmlElement> {
    if let Some(document) = &self.document {
      let element 
        = document.create_element(&ele_type).unwrap().dyn_into::<HtmlElement>().unwrap();
      return Some(element);
    }
    None
  }
}