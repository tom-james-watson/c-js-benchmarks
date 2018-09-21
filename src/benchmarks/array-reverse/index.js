import jsArrayReverse from './array-reverse'

export default class ArrayReverse {

  static get args() {
    return {
      size: {
        default: 500000,
        min: 1,
        max: 5000000
      },
      iterations: {
        default: 50,
        min: 1,
        max: 10000000
      }
    }
  }

  static get links() { return {
    c: 'https://github.com/tom-james-watson/c-js-benchmarks/blob/master/src/benchmarks/array-reverse/array-reverse.c',
    js: 'https://github.com/tom-james-watson/c-js-benchmarks/blob/master/src/benchmarks/array-reverse/array-reverse.js'
  }}

  constructor(args) {
    this.iterations = args.iterations
    this.size = args.size
    this.values = Uint8Array.from(
      {length: this.size},
      () => Math.floor(Math.random() * 255)
    )
  }

  c() {
    const buffer = Module._malloc(this.size)
    Module.HEAPU8.set(this.values, buffer)

    let result

    for (let i = 0; i < this.iterations; i++) {
      const targetBuffer = Module._malloc(this.size)

      Module.ccall(
        'array_reverse',
        'number',
        ['number', 'number', 'number'],
        [buffer, this.size, targetBuffer]
      )

      result = Module.HEAPU8.subarray(targetBuffer, targetBuffer + this.size)

      Module._free(targetBuffer)
    }

    Module._free(buffer)

    return result
  }

  js() {
    let result

    for (let i = 0; i < this.iterations; i++) {
      const target = Uint8Array.from({length: this.size})
      jsArrayReverse(this.values, this.size, target)
      result = target
    }

    return result
  }

  compare(cResult, jsResult) {
    if (cResult.length !== jsResult.length) {
      return false
    }

    for (let i = 0; i < cResult.length; i++) {
      if (cResult[i] !== jsResult[i]) {
        return false
      }
    }

    return true
  }

}
