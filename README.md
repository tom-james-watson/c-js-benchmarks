# Comparing C Wasm and JS performance on the web

Demo - https://c-js-benchmarks.netlify.com

## Development

Install dependencies:

```
npm i
```

### Rebuilding JS

```
webpack src/index.js --watch --mode development
```

### Bundling JS for deployment

```
webpack src/index.js
```

### Rebuilding C Wasm

Ensure that `EMSDK` in `init_emcc.sh` is pointing to your emcc install.

Source emscripten:

```
source ./init_emcc.sh
```

Then to rebuild, simply:

```
make
```
