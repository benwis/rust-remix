import { RemixBrowser } from "@remix-run/react";
import { hydrate } from "react-dom";
import init, {greet} from "../browser-rust-functions/pkg/browser-rust-functions"
import wasm from "../browser-rust-functions/pkg/browser-rust-functions_bg.wasm"

init(wasm).then(() => {
    hydrate(<RemixBrowser />, document);
})


