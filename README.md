# Rust Napi Sandbox

If you want to combine the **Web Fundamentals & Modern UX** of Remix together with the **Reliability, Performance & Efficiency** of Rust, you can use functions built with Rust on your server. Useful for intensive computations such as on the fly machine learning tasks, fibonacci etc.

One of the best ways to do that is to use Node's FFI interface through napi-rs, which generates compiled native node addons from Rust code. This has been shown to be faster than the compiling it to WASM and including it that way. 

This repo contains changes to the Remix compiler to add support for native .node files, which get included in your server bundle. This could probably can't run on the client, so it's to be used in loaders/actions only.

Currently the .node files are generated, but not correctly imported into Remix somehow.
## Example

This example uses Rust compiled to WASM.

If you don't have Rust installed on your computer the first thing to do is to get this set up

Installing Rust:

```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Then we need to install napi-rs globally with
```sh
yarn global add @napi-rs/cli
# or
npm install -g @napi-rs/cli
# or
pnpm add -g @napi-rs/cli
```
Save the index.js file in the napi-rust-functions.
Delete the napi-rust-functions target and create a new one. Give it a name of napi-rust-functions and select the target for your CPU. The rest of the options don't matter
unless you want to publish your package on npm

```sh
napi new
```
Build the JS wrapper and index.js file
```sh
cd napi-rust-functions
npm run build
```
You'll need to remove the platform detection code in index.js. The saved index.js file is a good example, but you'll need to remove the platform detection code, and copy the filename for your platform's .node file.

In this example, the Rust library is already built with the associated code. But if you wanted to set up your own library you could do so by running the following command:

Installing Node packages

```sh
npm i
```
This project includes patches to @remix-run/dev to support the .node add on. These should be automatically applied during the npm install step, but may become unecessary in the future.

The napi-rust-functions package is already addded to package.json, but if you choose a different name you may need to run the below command.
```sh
npm install ./<library-name>/pkg
```

This will add the dependency to your `package.json` file.

```json
    ...
    "@remix-run/serve": "1.3.3",
    "<library-name>": "file:<library-name>/pkg"
    ...
```

## Notes:

_To prevent remix from including the napi-rust-functions library in the client build we can re-export the functions using a `.server.ts` file, e.g. [rust.server.ts](app/rust.server.ts)_

## Related Links

[Rust](https://rust-lang.org/)

[Napi-rs](https://napi.rs/)

