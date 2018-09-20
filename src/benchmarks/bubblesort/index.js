import jsBubblesort from './bubblesort'

export default class Bubblesort {

  static get args() {
    return {
      size: {
        default: 10000,
        min: 1,
        max: 10000
      },
      iterations: {
        default: 1,
        min: 1,
        max: 10000000
      }
    }
  }

  static get links() { return {
    c: 'https://github.com/tom-james-watson/c-js-benchmarks/blob/master/src/benchmarks/bubblesort/bubblesort.c',
    js: 'https://github.com/tom-james-watson/c-js-benchmarks/blob/master/src/benchmarks/bubblesort/bubblesort.js'
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
    let result

    for (let i = 0; i < this.iterations; i++) {
      const newValues = this.values.slice(0)

      const buffer = Module._malloc(this.size)
      Module.HEAPU8.set(newValues, buffer)

      Module.ccall(
        'bubblesort',
        'number',
        ['number', 'number'],
        [buffer, this.size]
      )

      result = Module.HEAPU8.subarray(buffer, buffer + this.size)

      Module._free(buffer)
    }

    return result
  }

  js() {
    let result

    for (let i = 0; i < this.iterations; i++) {
      const newValues = this.values.slice(0)
      result = jsBubblesort(newValues, this.size)
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
