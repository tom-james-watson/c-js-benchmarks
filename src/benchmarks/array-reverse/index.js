import jsArrayReverse from './array-reverse'

export default class ArrayReverse {

  static get MAX_VALUE() { return 255; }

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

  constructor(args) {
    this.iterations = args.iterations
    this.size = args.size
    this.values = Uint8Array.from(
      {length: this.size},
      () => Math.floor(Math.random() * ArrayReverse.MAX_VALUE)
    )
  }

  c() {
    const buffer = Module._malloc(this.size)
    Module.HEAPU8.set(this.values, buffer)

    let result

    for (let i = 0; i < this.iterations; i++) {
      const resultBuffer = Module._malloc(this.size)

      Module.ccall(
        'array_reverse',
        'number',
        ['number', 'number'],
        [buffer, this.size, resultBuffer]
      )

      result = Module.HEAPU8.subarray(resultBuffer, resultBuffer + this.size)

      Module._free(resultBuffer)
    }

    Module._free(buffer)

    return result
  }

  js() {
    let result

    for (let i = 0; i < this.iterations; i++) {
      result = jsArrayReverse(this.values, this.size)
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
