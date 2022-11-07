// #![deny(clippy::all)]
use web_sys::{Request, Response};

#[macro_use]
extern crate napi_derive;

#[napi]
fn sum(a: i32, b: i32) -> i32 {
  a + b
}

// #[napi]
// fn simple_rust_loader(req: Request) -> Response {
//   Response::new().unwrap()
// }
