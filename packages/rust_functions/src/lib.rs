use wasm_bindgen::prelude::*;
use web_sys::{Request, Response};

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn add(a: u32, b: u32) -> u32 {
    a + b
}

#[wasm_bindgen]
pub fn greet() {
    alert("Welcome to the Remix<->Rust Starter Site!\nThis alert comes from browser-side WASM!");
}

#[wasm_bindgen]
pub fn rust_wasm_loader(req: Request) -> Response {
    Response::new_with_opt_str(Some("Hello From a Loader")).unwrap()
}

#[wasm_bindgen]
pub fn rust_wasm_action(req: Request) -> Response {
    Response::new_with_opt_str(Some("Hello From an Action!")).unwrap()
}
