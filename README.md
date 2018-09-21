# Comparing C WebAssembly and JavaScript performance

Demo - https://c-js-benchmarks.netlify.com

A collection of basic performance benchmarks that you can run on your own browser in order to compare C WebAssembly and JavaScript performance.

Benchmarking on short, isolated algorithms is not really the best way to compare the performance of two languages, but it is the simplest. If you want to realistically compare real-world use, the best way is always going to be to write the same real-world program in both target languages.

## Takeaways

### 1. WebAssembly is fast

Discounting for the overhead of calling WebAssembly code, C Wasm seems to constistently outperform equivalent JavaScript code.

![graph of c outperforming js](https://tomjwatson.com/images/blog/c-wasm-vs-js/array-reverse.png)

As we can see from this graph, for a simple array reversal, increasing the array size - and therefore computational complexity - allows us to see just how more performant the C Wasm is.

### 2. Calling WebAssembly is slow

The performance of the JS-Wasm boundary is still problematic.

![graph of js outperforming c](https://tomjwatson.com/images/blog/c-wasm-vs-js/fibonacci.png)

The above graph shows that as we increase the number of calls from JS to Wasm (iterations), the worse the performance is when compared with native JS.

### 3. You probably don't need to use WebAssembly

Firstly, for the vast majority of use cases, JavaScript is going to be fast enough. Most applications are going to be much better off focussing on improving the performance of their existing code than looking at using WebAssembly. It is highly likely that the performance bottleneck of most web applications is not JavaScript itself, but instead due to other factors such as network calls and DOM repaints.

Given the significant performance overhead when switching from JavaScript to WebAssembly code, piecemeal replacement of small parts of an application with "optimised WebAssembly" is not a great idea. WebAssembly is best-suited to long-running, computationally intensive tasks, of which a list of great examples can be found [here](https://webassembly.org/docs/use-cases/).

### 4. WebAssembly has an exciting future

Putting these tests together has been the first time I've worked with WebAssembly and I have been seriously impressed with how easy it is. If you had told me 10 years ago that I would be able to run my C code in the browser I would have had a good chuckle.

Emscripten has been a joy to work with: just take a look at the [Makefile](./Makefile) to see how simple the compilation process is. What is lacking at the moment is an easy way to interact with the DOM, or to take advantage of any other browser APIs. I think we will see an explosion of WebAssembly frameworks and libraries over the next few years, with things like a C-based jQuery-esque library being inevitable.

Of course, WebAssembly is simply a compilation target - it is not limited to being written in C. Rust, for example, has been an absolute hotbed of Wasm activity in the last couple of years and has what looks like the most mature ecosystem, with libraries like [wasm-bindgen](https://github.com/rustwasm/wasm-bindgen) helping to facilitate Wasm-JS interaction.

As the performance hurdle of the JS-Wasm boundary is improved, I believe it will become more feasible to write entire web applications in Wasm-compilable languages. Right now the tooling is not quite there, but I am super excited to see how things develop.

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
