# Comparing C WebAssembly and JavaScript performance

Demo - https://c-js-benchmarks.netlify.com

A collection of basic performance benchmarks that you can run on your own browser in order to compare C WebAssembly and JavaScript performance.

Benchmarking on short, isolated algorithms is not really the best way to compare the performance of two languages, but it is the simplest. If you want to realistically compare real-world use, the best way is always going to be to write the same real-world program in both target languages.

## Takeaways

### 1. C is fast

Discounting for the overhead of calling WebAssembly code, C Wasm seems to constistently outperform equivalent JavaScript code.

![graph of c outperforming js](https://tomjwatson.com/images/blog/c-wasm-vs-js/array-reverse.png)

As we can see from this graph, for a simple array reversal, increasing the array size - and therefore computational complexity - allows us to see just how more performant the C Wasm is.

### 2. Calling WebAssembly is slow

The performance of the JS-Wasm boundary is still problematic.

![graph of js outperforming c](https://tomjwatson.com/images/blog/c-wasm-vs-js/fibonacci.png)

The above graph shows that as we increase the number of calls from JS to Wasm (iterations), the worse the performance is when compared with native JS.

### 3. You probably don't need to use WebAssembly

Firstly, for the vast majority of use cases, JavaScript is going to be fast enough. Most applications are going to be much better off focussing on improving the performance of their existing code than looking at using WebAssembly. It is highly likely that the performance bottle of a web application is not JavaScript itself, but instead due to other factors such as network calls and DOM repaints.

Given the significant overhead when switching from JavaScript to WebAssembly code, piecemeal replacement of small parts of an application with "optimised WebAssembly" is not a great idea. WebAssembly is best-suited to long-running, computationally intensive tasks, of which a list of great examples can be found [here](https://webassembly.org/docs/use-cases/).

## Development

Install dependencies:

```
npm i
```

### Rebuilding JS

```
npm run watch
```

### Bundling JS for deployment

```
npm run build
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
