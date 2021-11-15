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

  pub fn document_get_element_by_id(&self, id: String) -> Option<HtmlElement> {
    if let Some(document) = &self.document {
      let node: HtmlElement = document.get_element_by_id(&id)
                  .unwrap()
                  .dyn_into::<HtmlElement>()
                  .unwrap();
      return Some(node);
    }
    None
  }

  pub fn document_set_html_canvas(&self, id: String) -> Option<HtmlCanvasElement>{
    let node: Option<HtmlElement> = self.document_get_element_by_id(id);
    if let Some(node) = node {
      let canvas = node.dyn_into::<HtmlCanvasElement>().map_err(|_|()).unwrap();
      return Some(canvas);
    }
    None
  }
}